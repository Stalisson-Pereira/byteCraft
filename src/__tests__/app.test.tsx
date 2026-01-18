import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

describe("ByteCraft app", () => {
  it("renderiza a Home com a marca", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.getAllByText("ByteCraft").length).toBeGreaterThan(0);
    expect(document.getElementById("beneficios")).toBeTruthy();
    expect(document.getElementById("como-funciona")).toBeTruthy();
    expect(document.getElementById("prova-social")).toBeTruthy();
    expect(document.getElementById("contato-cta")).toBeTruthy();
  });

  it("renderiza a página de Contato", () => {
    window.history.pushState({}, "", "/contato");
    render(<App />);

    expect(screen.getByRole("heading", { name: /vamos conversar/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it("renderiza 404 para rotas desconhecidas", () => {
    window.history.pushState({}, "", "/nao-existe");
    render(<App />);

    expect(screen.getByRole("heading", { name: /página não encontrada/i })).toBeInTheDocument();
  });
});

