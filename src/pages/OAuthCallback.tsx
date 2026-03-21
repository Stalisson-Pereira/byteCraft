// src/pages/OAuthCallback.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { finishGoogleLoginFromCallbackUrl } from "@/lib/googleAuth";

type Status = "working" | "ok" | "error";

export default function OAuthCallback() {
  const clientId = useMemo(
    () => import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",
    []
  );
  const baseUrl = useMemo(
    () => import.meta.env.BASE_URL ?? "/",
    []
  );

  const [status, setStatus] = useState<Status>("working");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!clientId) throw new Error("missing_client_id");

        await finishGoogleLoginFromCallbackUrl(
          window.location.href,
          clientId
        );

        if (cancelled) return;
        setStatus("ok");

        // Notifica a janela que abriu este popup (se existir)
        try {
          window.opener?.postMessage(
            { type: "rennovatech:google_login" },
            window.location.origin
          );
        } catch {
          // ignora
        }

        // Tenta fechar a aba
        window.close();

        // Fallback: redireciona para home após curto delay
        setTimeout(() => {
          if (!cancelled) {
            const redirectUrl = new URL(baseUrl, window.location.origin);
            window.location.assign(redirectUrl.toString());
          }
        }, 600);
      } catch (error) {
        console.error("Erro no callback do Google OAuth:", error);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [baseUrl, clientId]);

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-[#0B1020] dark:text-slate-100">
      <SiteHeader />

      <main className="py-20">
        <Container>
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-900/10 bg-white p-10 text-center shadow-sm shadow-slate-900/10 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none">
            {status === "working" && (
              <>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Concluindo login...
                </h1>
                
                  Você pode fechar esta aba quando terminar.
                


              </>
            )}

            {status === "ok" && (
              <>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Login concluído
                </h1>
                
                  Se esta aba não fechar automaticamente, você será redirecionado para a página principal.
                


              </>
            )}

            {status === "error" && (
              <>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Não foi possível concluir o login
                </h1>
                
                  Tente novamente e confirme o Client ID e o Redirect URI no Google Cloud Console.
                


              </>
            )}

            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
              >
                Voltar para o site
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />