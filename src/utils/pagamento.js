import { calcularSubtotal } from "./carrinho";

export const FRETE = 25;
export const FRETE_GRATIS_A_PARTIR_DE = 300;
export const DESCONTO_PIX = 0.05;
export const PARCELA_MINIMA = 50;
export const MAX_PARCELAS = 10;

export const CUPONS = {
  AERO10: { tipo: "percentual", valor: 0.1 },
  FRETEGRATIS: { tipo: "frete" },
};

export function arredondar(valor) {
  return Math.round(valor * 100) / 100;
}

export function buscarCupom(codigo = "") {
  return CUPONS[codigo.trim().toUpperCase()] || null;
}

export function calcularFrete(subtotal, cupom) {
  if (subtotal === 0 || subtotal >= FRETE_GRATIS_A_PARTIR_DE) return 0;
  if (cupom?.tipo === "frete") return 0;
  return FRETE;
}

export function calcularDescontoCupom(subtotal, cupom) {
  return cupom?.tipo === "percentual" ? arredondar(subtotal * cupom.valor) : 0;
}

export function calcularResumo(itens, codigoCupom, pagamento = "cartao") {
  const subtotal = calcularSubtotal(itens);
  const cupom = buscarCupom(codigoCupom);
  const desconto = calcularDescontoCupom(subtotal, cupom);
  const frete = calcularFrete(subtotal, cupom);
  const parcial = arredondar(subtotal - desconto + frete);
  const descontoPix = pagamento === "pix" ? arredondar(parcial * DESCONTO_PIX) : 0;

  return { subtotal, desconto, frete, descontoPix, total: arredondar(parcial - descontoPix) };
}

export function opcoesDeParcelas(total) {
  const maximo = Math.max(1, Math.min(MAX_PARCELAS, Math.floor(total / PARCELA_MINIMA)));
  return Array.from({ length: maximo }, (_, i) => ({ vezes: i + 1, valor: arredondar(total / (i + 1)) }));
}
