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

## Correções de mobile já aplicadas nesta versão

1. **Overflow horizontal no Hero e no Sumário** — esses dois blocos usavam
   `flex-wrap:nowrap`, então em telas estreitas o conteúdo era espremido/cortado.
   Agora, abaixo de 760px de largura, eles empilham em coluna.
2. **Bolinhas de navegação de 10px** — aumentadas para 22px em telas
   estreitas (ainda compactas o bastante para caber as 11 na tela, mas bem
   mais fáceis de tocar).
3. **Efeito "tilt" travando no toque** — agora só é ativado em dispositivos
   com mouse/trackpad reais (`hover: hover` + `pointer: fine`). Em celular o
   efeito simplesmente não é acionado, então nenhum card fica torto depois
   de tocar.

## Publicando a atualização

Como o repositório já existe e está conectado ao Vercel, basta commitar e
dar push — o deploy é automático a cada push na branch `main`:

```bash
git add .
git commit -m "Corrige interação mobile (overflow, touch targets, tilt)"
git push
```

Em ~30 segundos a nova versão sobe sozinha na mesma URL do Vercel, sem
precisar reconfigurar nada.
