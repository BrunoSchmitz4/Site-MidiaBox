export function apenasDigitos(valor = "") {
  return valor.replace(/\D/g, "");
}

export function nomeValido(valor = "") {
  return valor.trim().split(/\s+/).filter((parte) => parte.length >= 2).length >= 2;
}

export function emailValido(valor = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

export function cepValido(valor = "") {
  return apenasDigitos(valor).length === 8;
}

export function validarCheckout({ nome, email, cep, endereco = "" }) {
  const erros = {};
  if (!nomeValido(nome)) erros.nome = "Informe nome e sobrenome";
  if (!emailValido(email)) erros.email = "Informe um e-mail válido";
  if (!cepValido(cep)) erros.cep = "O CEP deve ter 8 dígitos";
  if (endereco.trim().length < 5) erros.endereco = "Informe o endereço de entrega";
  return erros;
}
