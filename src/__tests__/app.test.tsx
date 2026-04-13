import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

describe("RennovaTech app", () => {
  it("renderiza a Home com a marca", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.getAllByText("RennovaTech").length).toBeGreaterThan(0);
    expect(screen.getByText(/controle seus projetos, automacoes e deploys/i)).toBeInTheDocument();
    expect(screen.getByText(/projetos ativos/i)).toBeInTheDocument();
    expect(screen.getByText(/automations em execução/i)).toBeInTheDocument();
  });

  it("renderiza a página de Contato", () => {
    window.history.pushState({}, "", "/contato");
    render(<App />);

    expect(screen.getByRole("heading", { name: /coloque seu time para operar com a rennovatech/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contexto/i)).toBeInTheDocument();
  });

  it("renderiza 404 para rotas desconhecidas", () => {
    window.history.pushState({}, "", "/nao-existe");
    render(<App />);

    expect(screen.getByRole("heading", { name: /página não encontrada/i })).toBeInTheDocument();
  });
});

