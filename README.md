# Gideon Deck

Deck estático (HTML autocontido) pronto para deploy.

## 1. Subir para o GitHub

Dentro desta pasta, rode:

```bash
git init
git config user.email "paulohenrique.cardoso2651@gmail.com"
git config user.name "Paulo Henrique Cardoso"

git add .
git commit -m "Primeira versão do Gideon deck"

# Crie o repositório vazio antes em https://github.com/new
# (ex: nome "gideon-deck", sem README/gitignore automáticos)

git branch -M main
git remote add origin https://github.com/SEU_USUARIO/gideon-deck.git
git push -u origin main
```

Troque `SEU_USUARIO` pelo seu usuário do GitHub e `gideon-deck` pelo nome
que você der ao repositório.

Se pedir login, use um Personal Access Token no lugar da senha
(GitHub não aceita mais senha comum via HTTPS):
Settings → Developer settings → Personal access tokens → Generate new token.

## 2. Conectar no Vercel

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Autorize o Vercel a acessar sua conta GitHub (se for a primeira vez)
4. Selecione o repositório `gideon-deck`
5. Framework preset: **Other** (é HTML puro, sem build step)
6. Build command: deixe em branco
7. Output directory: deixe em branco (raiz do projeto)
8. Clique em **Deploy**

Em ~30 segundos você recebe uma URL tipo `gideon-deck.vercel.app`.
Todo novo `git push` na branch `main` gera um novo deploy automaticamente.

## Observação sobre mobile

Testei a interatividade e encontrei 3 pontos que valem correção antes de
divulgar o link em celular:

1. Sem media queries — larguras fixas de até 1500px podem causar overflow
   horizontal em telas pequenas.
2. Bolinhas de navegação de 10x10px — abaixo do tamanho mínimo recomendado
   de toque (44x44px).
3. Efeito de "tilt" nos cards não reseta em touch (só reseta com
   `pointerleave`, que nem sempre dispara ao soltar o dedo).

Posso preparar uma versão corrigida depois do primeiro deploy, se quiser.
