import { wa } from "../lib/gsap";

export const SERVICES = [
  ["Software sob medida", "Sistemas web e plataformas alinhados aos processos da sua operação.", "desenvolvimento-de-software-sob-medida"],
  ["CRM sob medida", "Leads, pipeline, propostas, automações e integrações do seu jeito de vender.", "crm-sob-medida"],
  ["ERP sob medida", "Compras, vendas, estoque e financeiro no mesmo fluxo.", "erp-sob-medida"],
  ["Dashboards e BI", "Os indicadores certos em um só lugar para decidir mais rápido.", "desenvolvimento-de-dashboard"],
  ["Automação de processos", "Tarefas, notificações e fluxos entre CRM, ERP, WhatsApp e APIs.", "automacao-de-processos"],
  ["Integrações", "ERP, CRM, e-commerce, pagamentos, WhatsApp e sistemas legados conectados.", "integracoes"],
  ["Inteligência artificial", "IA e agentes aplicados com integração, governança e revisão humana.", "inteligencia-artificial"],
  ["Criação de sites", "Sites rápidos, responsivos e preparados para SEO e conversão.", "criacao-de-sites"],
  ["Landing pages", "Oferta clara, performance, analytics e CTAs para campanhas.", "landing-pages"],
  ["E-commerce", "Loja conectada a catálogo, ERP, pagamentos e operação.", "ecommerce"],
  ["Infraestrutura de TI", "Redes, servidores e suporte para a base tecnológica da empresa.", "infraestrutura-ti"],
  ["Consultoria de TI", "Diagnóstico de processos e sistemas para priorizar investimentos.", "consultoria-ti"],
];

export default function Services() {
  return (
    <section className="services" id="servicos">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">12 soluções</div>
            <h2 className="h2">Do sistema sob medida à infraestrutura.</h2>
          </div>
          <p className="lead">Começamos pelo problema mais importante e evoluímos em etapas validadas com a sua equipe.</p>
        </div>
        <div className="sgrid">
          {SERVICES.map(([t, d, slug], i) => (
            <a className="scard reveal" key={slug} href={`/${slug}`} data-cta data-cta-location="services">
              <span className="num mono">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="go" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div className="help reveal">
          <div>
            <h3>Não sabe por onde começar?</h3>
            <p>Conte o que trava sua operação hoje. Entendemos o cenário, as ferramentas que você usa e indicamos o caminho mais útil.</p>
          </div>
          <a className="btn btn-primary" href={wa("um projeto e ainda não sei qual solução escolher")} target="_blank" rel="noopener noreferrer" data-quote data-cta-location="services">Pedir uma indicação <span className="arr">↗</span></a>
        </div>
      </div>
    </section>
  );
}
