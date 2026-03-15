import { create } from "zustand";
import type { User } from "firebase/auth";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { upsertUserProfile } from "@/lib/db";

type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "ready";
  error: string | null;
  init: () => () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

function firebaseErrorToMessage(err: unknown): string {
  if (typeof err === "object" && err && "code" in err) {
    const code = String((err as { code?: unknown }).code ?? "");
    if (code === "auth/invalid-credential") return "E-mail ou senha inválidos.";
    if (code === "auth/user-not-found") return "Usuário não encontrado.";
    if (code === "auth/wrong-password") return "Senha incorreta.";
    if (code === "auth/email-already-in-use") return "Este e-mail já está em uso.";
    if (code === "auth/weak-password") return "Senha fraca. Use pelo menos 6 caracteres.";
    if (code === "auth/too-many-requests") return "Muitas tentativas. Tente novamente em instantes.";
    if (code === "auth/popup-closed-by-user") return "Login cancelado.";
    return `Erro de autenticação (${code}).`;
  }
  return "Erro de autenticação.";
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: "idle",
  error: null,
  init: () => {
    if (get().status !== "idle") return () => {};
    set({ status: "loading" });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, status: "ready" });
      if (user) {
        // Fire-and-forget; profile is non-critical for UI.
        void upsertUserProfile(user);
      }
    });
    return unsubscribe;
  },
  loginWithGoogle: async () => {
    set({ error: null });
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      if (cred.user) void upsertUserProfile(cred.user);
    } catch (err) {
      set({ error: firebaseErrorToMessage(err) });
    }
  },
  loginWithEmail: async (email, password) => {
    set({ error: null });
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user) void upsertUserProfile(cred.user);
    } catch (err) {
      set({ error: firebaseErrorToMessage(err) });
    }
  },
  signUpWithEmail: async (email, password) => {
    set({ error: null });
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (cred.user) void upsertUserProfile(cred.user);
    } catch (err) {
      set({ error: firebaseErrorToMessage(err) });
    }
  },
  resetPassword: async (email) => {
    set({ error: null });
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      set({ error: firebaseErrorToMessage(err) });
    }
  },
  logout: async () => {
    set({ error: null });
    try {
      await signOut(auth);
    } catch (err) {
      set({ error: firebaseErrorToMessage(err) });
    }
  },
  clearError: () => set({ error: null }),
}));

