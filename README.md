# Gideon Systems

Site institucional e comercial estático da Gideon Systems. A arquitetura gera páginas de serviço e versões localizadas sem depender de JavaScript para indexação.

## Desenvolvimento

```bash
npm run build
npm test
```

- `home/`: a home em pt-BR (React + GSAP). Cada cena do vídeo da marca é uma seção que se anima ao aparecer. `scripts/build-home.mjs` compila e pré-renderiza a página em `/index.html` (conteúdo completo no HTML, sem depender de JS) com o bundle em `/assets/home`. Para desenvolver: `npm run dev:home` (http://localhost:5174).
- `assets/img/`: prints dos projetos e letras do logo usados pela home.
- `llms.txt` e `llms-full.txt`: resumo e conteúdo completo para assistentes de IA, gerados pelo build a partir de `content/pages.mjs`.
- Contato: WhatsApp e telefone ficam em `scripts/build.mjs` (`whatsappNumber`) e `home/src/lib/gsap.js` (`PHONE`).
- `content/pages.mjs`: conteúdo original em português do Brasil.
- `content/translations/*.json`: traduções estáticas usadas no build.
- `scripts/build.mjs`: gera páginas, canonicals, `hreflang` e sitemap.
- `scripts/test.mjs`: valida metadata, H1, schemas, links internos e sitemap.
- `service.css`: sistema visual responsivo das páginas.
- `analytics.js`: GA4 e eventos de conversão, carregados somente em produção.

O deploy na Vercel usa HTML estático. `vercel.json` remove `.html`, padroniza URLs sem barra final e redireciona o domínio raiz para `https://www.gideonsystems.com.br`.

## SEO e Search Console

- Sitemap: `https://www.gideonsystems.com.br/sitemap.xml`
- Robots: `https://www.gideonsystems.com.br/robots.txt`
- Domínio canônico: `https://www.gideonsystems.com.br`
- Idioma padrão: `pt-BR`

Para verificar o Search Console, adicione o token real como meta tag no `<head>` gerado em `scripts/build.mjs` ou faça a verificação por DNS. Não há token no repositório atualmente.

Após o deploy:

1. confirme o redirecionamento do domínio raiz para `www` nas configurações de domínio da Vercel;
2. cadastre a propriedade no Google Search Console;
3. envie `/sitemap.xml`;
4. valide o GA4 `G-EYX6409C61` em produção;
5. revise as traduções com falantes nativos antes de campanhas internacionais.

## Analytics

Eventos instalados:

- `service_view`
- `case_view` (preparado para cases publicados)
- `cta_click`
- `quote_request`
- `whatsapp_click`
- `contact`
- `form_start`
- `form_submit`
- `generate_lead`

Não existe formulário conectado a um backend neste projeto. Quando um formulário for implementado, chame `window.gideonTrackSuccessfulForm(formId)` somente após o servidor confirmar o envio. Assim, `form_submit` e `generate_lead` não registram falhas como leads.

## Conteúdo pendente

As páginas `/cases` e `/blog` estão em `noindex` até receberem material factual e completo. O case Grupo Maxcompany não foi publicado porque o repositório não contém informações confirmadas sobre problema, solução, tecnologias ou resultados.
