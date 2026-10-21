# MídiaBox

Loja de mídias físicas de jogos feita com Create React App e React Router 7, seguindo a mesma estrutura do Magazine Bruninho. Serve de cobaia para praticar os tipos de teste da disciplina de Implantação e Manutenção de Sistemas.

## Como rodar

```bash
npm install
npx playwright install chromium
npm start
```

A loja abre em http://localhost:3000.

## Testes

| Tipo | Ferramenta | Onde ficam | Comando |
|---|---|---|---|
| Unitário | Jest + Testing Library | `src/utils/*.test.js` e `src/components/**/*.test.jsx` | `npm run test:unit` |
| Integração | Jest + Testing Library | `src/pages/**/*.test.jsx` | `npm run test:integration` |
| Sistema (E2E) | Playwright | `e2e/sistema` | `npm run test:system` |
| Aceitação | Playwright | `e2e/aceitacao` | `npm run test:acceptance` |

`npm run test:all` roda as quatro suítes em sequência e `npm run test:cov` gera a cobertura do Jest. Os testes do Playwright sobem o `npm start` sozinhos (ou reaproveitam o servidor se ele já estiver rodando).

* **Unitário:** regras de `src/utils` e o componente `Card` isolado.
* **Integração:** páginas + `CarrinhoContext` + Header funcionando juntos, montados com `renderComApp` ou `renderAppCompleto` de `src/testes/utilsDeTeste.jsx`.
* **Sistema:** o app inteiro rodando no navegador real, da Home até a página de Pedidos.
* **Aceitação:** histórias de usuário escritas em Dado / Quando / Então.

## Estrutura

```
src/
  index.js            BrowserRouter + CarrinhoProvider + Header + AppRoutes + Footer
  routes.js           AppRoutes
  index.css           variáveis e estilos globais
  setupTests.js
  context/            CarrinhoContext.jsx
  data/               jogos.js
  utils/              carrinho, pagamento, validacao, catalogo, formatarPreco
  components/         Header, Footer, Card, Capa, Vitrine, ResumoPedido
  pages/              Home, Catalogo, Produto, Carrinho, Checkout, Pedidos, NotFound
  testes/             utilsDeTeste.jsx
e2e/
  sistema/
  aceitacao/
```

Cada componente e cada página tem a sua pasta com `index.jsx` e `Nome.module.css`.

## Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/Catalogo` | Catálogo |
| `/Catalogo/:id` | Produto |
| `/Carrinho` | Carrinho |
| `/Checkout` | Checkout |
| `/Pedidos` | Pedidos |
| `*` | NotFound |

## Requisitos Funcionais (RF)

| ID | Descrição |
|---|---|
| RF01 | Exibir na Home os jogos em destaque. |
| RF02 | Listar o catálogo com capa, plataforma, gênero, preço e situação de estoque. |
| RF03 | Buscar jogos pelo nome. |
| RF04 | Filtrar jogos por plataforma. |
| RF05 | Ordenar por relevância, menor preço, maior preço ou nome. |
| RF06 | Exibir a página do produto com os dados do jogo. |
| RF07 | Adicionar o jogo ao carrinho. |
| RF08 | Mostrar no Header a quantidade de itens no carrinho. |
| RF09 | Aumentar, diminuir e remover itens no carrinho. |
| RF10 | Aplicar cupom de desconto no carrinho. |
| RF11 | Exibir o resumo do pedido: subtotal, descontos, frete e total. |
| RF12 | Finalizar a compra informando nome, e-mail, CEP, endereço e forma de pagamento (Pix ou cartão). |
| RF13 | Escolher o número de parcelas quando o pagamento for no cartão. |
| RF14 | Listar os pedidos feitos e destacar o pedido recém confirmado. |
| RF15 | Exibir página de erro para rotas inexistentes. |

## Requisitos Não Funcionais (RNF)

| ID | Descrição |
|---|---|
| RNF01 | SPA em React criada com Create React App e navegação com React Router 7. |
| RNF02 | Carrinho e pedidos salvos no `localStorage`, mantidos ao recarregar a página. |
| RNF03 | Layout responsivo para desktop e celular. |
| RNF04 | Visual minimalista em modo escuro, com estilos globais no `index.css` e CSS Modules só onde precisa. |
| RNF05 | Acessibilidade básica: campos com rótulo, botões com nome acessível e mensagens com `role="status"`. |
| RNF06 | Valores exibidos em Real no formato `R$ 0,00`. |
| RNF07 | Regras de negócio isoladas em funções puras (`src/utils`), fora dos componentes. |

## Regras de Negócio (RN)

| ID | Descrição |
|---|---|
| RN01 | Máximo de 3 unidades por jogo no carrinho, respeitando também o estoque disponível. |
| RN02 | Jogo com estoque 0 aparece como "Esgotado" e não pode ser adicionado ao carrinho. |
| RN03 | Jogo com até 3 unidades em estoque mostra "Últimas N unidades". |
| RN04 | Diminuir a quantidade até zero tira o jogo do carrinho. |
| RN05 | Frete fixo de R$ 25,00, grátis quando o subtotal for a partir de R$ 300,00. |
| RN06 | Cupons válidos: `AERO10` (10% sobre o subtotal) e `FRETEGRATIS` (zera o frete). Um cupom por vez, sem diferenciar maiúsculas. Cupom inexistente mostra "Cupom inválido". |
| RN07 | Pagamento via Pix tem 5% de desconto sobre o total (depois de cupom e frete). |
| RN08 | Cartão parcela em até 10x sem juros, com parcela mínima de R$ 50,00. |
| RN09 | Checkout exige nome e sobrenome, e-mail válido, CEP com 8 dígitos (com ou sem hífen) e endereço com pelo menos 5 caracteres. |
| RN10 | Acessar o Checkout com o carrinho vazio redireciona para o Carrinho. |
| RN11 | Ao confirmar, o pedido é salvo com número e data, o carrinho e o cupom são esvaziados. |
| RN12 | Todos os valores são arredondados para 2 casas decimais. |
