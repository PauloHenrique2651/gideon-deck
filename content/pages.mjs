// Texto editorial em pt-BR. Os demais idiomas são versões estáticas em content/translations.
export const servicePages = [
  {
    slug: 'desenvolvimento-de-software-sob-medida',
    title: 'Desenvolvimento de Software Sob Medida | Gideon Systems',
    description: 'Sistemas web e plataformas empresariais alinhados aos processos da sua operação. Planeje um software sob medida com a Gideon Systems.',
    h1: 'Um sistema sob medida para sua empresa ganhar tempo e controle',
    intro: 'Quando planilhas, mensagens e ferramentas separadas começam a travar a rotina, a Gideon transforma o processo em um sistema claro. Sua equipe trabalha melhor, as informações ficam organizadas e a gestão acompanha o que realmente importa.',
    sections: [
      ['Do processo ao produto', 'Começamos pelo problema de negócio: quem usa o sistema, quais decisões precisa tomar, onde os dados nascem e quais etapas geram retrabalho. Esse mapa orienta a arquitetura, as prioridades e a experiência de uso. O escopo pode incluir módulos administrativos, comerciais, financeiros, portais de clientes e permissões por perfil.'],
      ['Arquitetura e evolução', 'Um sistema sob medida precisa continuar útil quando a operação cresce. Por isso, consideramos qualidade dos dados, segurança, manutenção e integração via API desde o desenho da solução. Entregas incrementais permitem validar os fluxos com a equipe antes de ampliar o produto.'],
      ['Quando faz sentido', 'O desenvolvimento próprio é uma alternativa quando um software pronto exige adaptações excessivas, duplica cadastros ou impede um processo importante. A conversa inicial ajuda a comparar construir, integrar ou melhorar o que já existe, sem assumir que toda necessidade pede um sistema novo.']
    ],
    faq: [
      ['Quanto custa desenvolver um sistema sob medida?', 'O investimento depende dos módulos, integrações, volume de dados e requisitos de segurança. O escopo é definido após entender o processo e as prioridades da empresa.'],
      ['É possível substituir planilhas aos poucos?', 'Sim. Uma implantação por etapas permite migrar dados e validar rotinas críticas antes de substituir o fluxo anterior.'],
      ['O sistema pode se integrar a outras ferramentas?', 'Sim, quando há acesso técnico adequado. Avaliamos APIs, bancos de dados e restrições dos sistemas envolvidos antes de definir a integração.']
    ],
    related: ['crm-sob-medida', 'erp-sob-medida', 'integracoes'],
    cta: 'Desenvolver meu sistema'
  },
  {
    slug: 'crm-sob-medida',
    title: 'Desenvolvimento de CRM Sob Medida | Gideon Systems',
    description: 'CRM personalizado para leads, pipeline, equipe, propostas, automações e integrações. Converse sobre o processo comercial da sua empresa.',
    h1: 'Um CRM que acompanha o jeito da sua empresa vender',
    intro: 'Seu processo comercial não precisa se adaptar a uma ferramenta genérica. A Gideon organiza leads, clientes, propostas e atividades em um CRM criado para sua equipe vender com mais clareza e acompanhar cada oportunidade.',
    sections: [
      ['Visibilidade do primeiro contato ao fechamento', 'Organize leads, clientes, oportunidades e histórico em um só fluxo. O pipeline pode refletir etapas comerciais reais, com responsáveis, tarefas, follow-ups, propostas e metas. Perfis e permissões ajudam cada vendedor e gestor a ver o que precisa, sem perder controle sobre os dados.'],
      ['Indicadores e automações úteis', 'Dashboards podem mostrar conversão por etapa, atividades pendentes, resultados por equipe e evolução de propostas. Automações reduzem esquecimentos: avisos, distribuição de leads e atualização de status podem ser desenhados conforme as regras comerciais, com critérios claros para evitar ruído.'],
      ['Integração e implantação', 'WhatsApp, e-mail, ERP e outras APIs podem fazer parte da arquitetura, conforme a disponibilidade de cada plataforma. Antes da implantação, definimos origem dos dados, limpeza de cadastros, acesso dos usuários e treinamento necessário. Assim, o CRM entra no processo comercial com informação confiável.']
    ],
    faq: [
      ['O que é um CRM sob medida?', 'É um sistema de relacionamento e vendas desenhado para o funil, as regras e os indicadores específicos da empresa.'],
      ['Quanto custa desenvolver um CRM?', 'Depende dos módulos, integrações, migração de dados e número de perfis. A proposta é feita após mapear o processo comercial.'],
      ['É possível integrar com WhatsApp e ERP?', 'Em muitos cenários, sim. A viabilidade depende das APIs, permissões e regras das plataformas utilizadas.'],
      ['Posso migrar dados de outro CRM?', 'A migração pode ser planejada após analisar exportação, qualidade e estrutura dos dados existentes.']
    ],
    related: ['erp-sob-medida', 'desenvolvimento-de-dashboard', 'integracoes', 'automacao-de-processos'],
    cta: 'Solicitar projeto de CRM'
  },
  {
    slug: 'erp-sob-medida',
    title: 'ERP Sob Medida para Empresas | Gideon Systems',
    description: 'ERP personalizado para compras, vendas, estoque, financeiro e gestão integrada. Planeje seus módulos e integrações com a Gideon.',
    h1: 'Compras, estoque, vendas e financeiro no mesmo fluxo',
    intro: 'Quando cada área usa uma ferramenta diferente, a equipe repete trabalho e a informação chega tarde. A Gideon desenvolve um ERP sob medida para reunir a operação, dar visibilidade à gestão e reduzir erros no dia a dia.',
    sections: [
      ['Módulos alinhados à rotina', 'O projeto pode reunir cadastros, pedidos, compras, movimentações de estoque, contas a pagar e receber, aprovações e relatórios. Usuários e permissões seguem as responsabilidades da equipe. As regras são definidas com quem executa o processo, para que o sistema represente a operação de verdade.'],
      ['Dados para decidir', 'Dashboards ajudam a acompanhar vendas, margem, fluxo financeiro, giro de estoque e pontos de atenção. Integrações com e-commerce, CRM, meios de pagamento e APIs externas evitam registros duplicados. A origem dos dados e a frequência de sincronização são decididas no desenho técnico.'],
      ['Implantação responsável', 'Um ERP toca rotinas críticas. Por isso, mapeamos sistemas existentes, dependências fiscais, qualidade dos cadastros e plano de migração. Funcionalidades fiscais, como emissão de documentos, exigem análise específica de regras e provedores aplicáveis; não são presumidas em todo projeto.']
    ],
    faq: [
      ['O que é um ERP sob medida?', 'É um sistema de gestão desenvolvido para reunir processos e regras específicos da empresa, em vez de impor um fluxo padrão.'],
      ['O ERP pode integrar estoque, financeiro e vendas?', 'Sim. Esses módulos podem compartilhar dados, desde que o escopo e as regras operacionais sejam definidos no projeto.'],
      ['O ERP pode emitir notas fiscais?', 'A possibilidade depende de requisitos fiscais, integrações com provedores e legislação aplicável. Isso precisa de análise no escopo.'],
      ['É possível migrar de outro ERP?', 'Sim, após avaliar acesso, formato e qualidade dos dados e planejar a transição com a equipe.']
    ],
    related: ['integracoes', 'desenvolvimento-de-dashboard', 'crm-sob-medida'],
    cta: 'Solicitar projeto de ERP'
  },
  {
    slug: 'desenvolvimento-de-dashboard',
    title: 'Desenvolvimento de Dashboards Empresariais | Gideon Systems',
    description: 'Dashboards personalizados e BI empresarial para vendas, financeiro, estoque e operações. Transforme dados em visão de gestão.',
    h1: 'Decisões mais rápidas com os indicadores certos em um só lugar',
    intro: 'Um bom dashboard mostra o que precisa de atenção e ajuda a decidir. A Gideon reúne dados de vendas, financeiro, estoque e operação em painéis claros, feitos para a rotina dos gestores da sua empresa.',
    sections: [
      ['Começar pelas decisões', 'Definimos com a equipe quais KPIs importam, como cada indicador é calculado e qual período deve ser comparado. Vendas, financeiro, estoque e produtividade podem ter visões diferentes para direção, gestores e operação. Isso reduz interpretações conflitantes sobre o mesmo número.'],
      ['Integração e confiança', 'Os dados podem vir de ERP, CRM, sistemas internos ou serviços externos. Antes de montar os painéis, verificamos qualidade, atualização e consistência das fontes. Quando há necessidade de dados em tempo real, avaliamos custo técnico e relevância para a decisão.'],
      ['Painéis que a equipe usa', 'Filtros, permissões, metas e alertas são definidos em torno do uso diário. O resultado deve ser legível em desktop e dispositivos móveis, com caminhos claros para investigar um desvio sem depender de exportações manuais recorrentes.']
    ],
    faq: [
      ['Qual a diferença entre dashboard e relatório?', 'O dashboard acompanha indicadores de forma visual e frequente; o relatório costuma detalhar um recorte ou período específico. Ambos podem ser necessários.'],
      ['É possível conectar meu ERP ou CRM?', 'Sim, se houver acesso a API, banco de dados ou exportação adequada. A integração é validada antes do desenvolvimento.'],
      ['Os dados precisam ser em tempo real?', 'Nem sempre. A frequência de atualização deve acompanhar a necessidade de decisão e as limitações da fonte.']
    ],
    related: ['erp-sob-medida', 'crm-sob-medida', 'integracoes'],
    cta: 'Planejar meu dashboard'
  },
  {
    slug: 'automacao-de-processos',
    title: 'Automação de Processos Empresariais | Gideon Systems',
    description: 'Automatize tarefas, notificações e fluxos entre CRM, ERP, WhatsApp e APIs. Descubra onde reduzir retrabalho na sua operação.',
    h1: 'Menos tarefas repetitivas. Mais tempo para fazer o negócio crescer.',
    intro: 'Se sua equipe copia dados, envia os mesmos avisos e confere etapas manualmente, existe espaço para automatizar. A Gideon conecta as ferramentas da empresa e cria fluxos que economizam tempo sem perder o controle.',
    sections: [
      ['Mapear antes de automatizar', 'Identificamos gatilhos, responsáveis, exceções e critérios de sucesso. Um fluxo pode atualizar o CRM, registrar um pedido no ERP, enviar uma notificação ou solicitar aprovação. O objetivo é retirar trabalho repetitivo sem ocultar decisões que precisam continuar com pessoas.'],
      ['Ferramentas e integrações', 'APIs, webhooks e plataformas como n8n podem conectar e-mail, WhatsApp, sistemas internos e serviços externos. A escolha depende de volume, segurança, suporte e possibilidade de manutenção. Agentes de IA podem apoiar classificações ou respostas, desde que haja dados, limites e revisão adequados.'],
      ['Operação observável', 'Uma automação confiável registra falhas, permite reprocessamento e deixa claro quem age quando uma integração para. Documentamos o fluxo e validamos cenários comuns e exceções antes de colocá-lo na rotina da equipe.']
    ],
    faq: [
      ['Quais processos podem ser automatizados?', 'Cadastros, notificações, aprovações, atualização de status e sincronização de dados são exemplos. A prioridade depende do volume e do custo do retrabalho.'],
      ['É possível integrar WhatsApp?', 'Sim, quando o uso respeita as opções técnicas e políticas da plataforma escolhida.'],
      ['A automação funciona com sistemas existentes?', 'Muitas vezes, sim. Avaliamos APIs, webhooks, exportações e restrições de acesso antes de definir o fluxo.']
    ],
    related: ['integracoes', 'inteligencia-artificial', 'crm-sob-medida'],
    cta: 'Quero automatizar minha empresa'
  },
  {
    slug: 'integracoes',
    title: 'Integração de Sistemas e APIs | Gideon Systems',
    description: 'Conecte ERP, CRM, e-commerce, pagamentos, WhatsApp e sistemas legados com APIs e webhooks. Converse sobre sua integração.',
    h1: 'Seus sistemas trabalhando juntos, sem informação duplicada',
    intro: 'Uma empresa pode ter boas ferramentas e ainda perder tempo porque elas não conversam. A Gideon conecta ERP, CRM, e-commerce, pagamentos e outros sistemas para reduzir digitação, atrasos e dados desencontrados.',
    sections: [
      ['Conexões com propósito', 'Integramos fluxos entre ERP, CRM, e-commerce, gateways de pagamento, WhatsApp, bancos de dados e serviços de terceiros. Cada conexão começa com uma pergunta: qual dado precisa sair de onde, chegar aonde e em que momento? Isso define o contrato da API e as regras de sincronização.'],
      ['APIs, webhooks e legados', 'REST APIs e webhooks permitem trocas eficientes quando os sistemas oferecem interfaces adequadas. Em sistemas legados, analisamos documentação, formatos de exportação e acesso autorizado. Evitamos assumir que uma integração é simples sem conhecer limites de autenticação, volume e disponibilidade.'],
      ['Confiabilidade na produção', 'Tratamento de erros, tentativas de reenvio, logs e validação de dados fazem parte da solução. Também definimos qual sistema é a fonte de verdade para cada informação, evitando conflitos silenciosos entre cadastros e pedidos.']
    ],
    faq: [
      ['O que é uma integração via API?', 'É a troca controlada de informações entre sistemas por interfaces técnicas documentadas.'],
      ['É possível integrar um sistema antigo?', 'Depende das opções de acesso e exportação disponíveis. Uma avaliação técnica indica o caminho viável.'],
      ['Como evitar dados duplicados?', 'Definimos identificadores, fonte de verdade, regras de atualização e tratamento de falhas para cada fluxo.']
    ],
    related: ['erp-sob-medida', 'automacao-de-processos', 'ecommerce'],
    cta: 'Solicitar análise de integração'
  },
  {
    slug: 'inteligencia-artificial',
    title: 'Inteligência Artificial para Empresas | Gideon Systems',
    description: 'Aplique IA e agentes em processos empresariais com integração, governança e revisão humana. Avalie oportunidades reais para sua operação.',
    h1: 'Inteligência artificial aplicada onde gera valor para sua empresa',
    intro: 'A Gideon identifica tarefas em que a IA pode apoiar sua equipe, acelerar respostas e organizar informações. O projeto começa por uma necessidade real e cresce depois de provar que funciona na rotina do negócio.',
    sections: [
      ['Casos de uso concretos', 'Classificação de solicitações, busca em documentos, apoio a atendimento e análise assistida de dados são pontos de partida possíveis. Cada caso precisa de objetivo, fonte de informação e critério de avaliação. Nem todo processo se beneficia de um agente autônomo.'],
      ['Integração com o trabalho real', 'Uma solução de IA pode consultar bases autorizadas, registrar ações em CRM ou ERP e encaminhar exceções para pessoas. Permissões, privacidade, custos por uso e limites de resposta são tratados como parte do produto.'],
      ['Teste antes de ampliar', 'Propomos validar a qualidade das respostas com exemplos reais, medir erros e ajustar instruções e dados. A implantação pode começar assistida, com revisão humana, antes de automatizar ações mais sensíveis.']
    ],
    faq: [
      ['O que um agente de IA pode fazer na empresa?', 'Pode apoiar tarefas definidas, como consultar informações, classificar entradas ou acionar fluxos, dentro de permissões e limites estabelecidos.'],
      ['A IA pode acessar meu ERP ou CRM?', 'Pode, se houver integração autorizada e regras claras para leitura, escrita e auditoria de dados.'],
      ['Como avaliar se vale a pena?', 'É preciso comparar qualidade, tempo economizado, custo de operação e risco do processo antes de ampliar a solução.']
    ],
    related: ['automacao-de-processos', 'integracoes', 'desenvolvimento-de-software-sob-medida'],
    cta: 'Avaliar um projeto de IA'
  },
  {
    slug: 'criacao-de-sites',
    title: 'Criação de Sites Profissionais | Gideon Systems',
    description: 'Sites institucionais rápidos, responsivos e preparados para SEO e conversão. Desenvolva sua presença digital com a Gideon Systems.',
    h1: 'Um site profissional que transforma visitas em oportunidades',
    intro: 'Seu site precisa explicar rapidamente por que escolher sua empresa e facilitar o contato. A Gideon une conteúdo, design e desempenho para criar uma presença digital forte no celular e no computador.',
    sections: [
      ['Conteúdo e arquitetura', 'Organizamos páginas de serviços, sobre, contato e provas concretas de trabalho conforme a necessidade da empresa. Títulos, navegação e links internos ajudam pessoas e mecanismos de busca a entender a oferta sem depender de uma única homepage.'],
      ['Experiência e desempenho', 'Layout responsivo, imagens otimizadas, acessibilidade básica e carregamento cuidadoso fazem parte do projeto. O visual deve representar a marca, mas não impedir a leitura, a navegação ou a conversão em dispositivos móveis.'],
      ['Medição e evolução', 'Chamadas para ação, formulários quando houver infraestrutura de recebimento e integrações com ferramentas de análise podem medir o interesse real. SEO técnico cria uma base; a visibilidade orgânica cresce com conteúdo, autoridade e manutenção consistentes.']
    ],
    faq: [
      ['Um site profissional precisa de SEO?', 'Sim. Estrutura, indexação, conteúdo e desempenho ajudam o site a ser entendido e encontrado, embora não garantam posições específicas.'],
      ['O site pode integrar CRM ou WhatsApp?', 'Sim, de acordo com as ferramentas usadas pela empresa e as formas de contato escolhidas.'],
      ['É possível criar páginas de campanha depois?', 'Sim. A arquitetura pode prever landing pages e novas páginas de serviço conforme a estratégia evolui.']
    ],
    related: ['landing-pages', 'ecommerce', 'consultoria-ti'],
    cta: 'Solicitar site profissional'
  },
  {
    slug: 'landing-pages',
    title: 'Criação de Landing Pages Profissionais | Gideon Systems',
    description: 'Landing pages com mensagem clara, performance, analytics e CTAs para campanhas e geração de leads. Planeje sua página com a Gideon.',
    h1: 'Landing pages que deixam sua oferta clara e facilitam a conversão',
    intro: 'Uma campanha perde força quando leva o visitante para uma página genérica. A Gideon cria landing pages rápidas, objetivas e alinhadas à sua marca para transformar interesse em contato comercial.',
    sections: [
      ['Mensagem e conversão', 'Definimos público, origem do tráfego e objetivo antes do layout. A página pode priorizar orçamento, contato por WhatsApp ou cadastro, conforme o processo comercial. Texto, hierarquia visual e CTA devem deixar claro o que a pessoa receberá ao avançar.'],
      ['Implementação enxuta', 'Responsividade, carregamento rápido, acessibilidade e integração com analytics ou pixels relevantes são considerados desde o início. Formulários precisam de destino confiável e confirmação de envio; eventos de lead só devem disparar quando o envio realmente funciona.'],
      ['SEO quando faz sentido', 'Páginas de campanhas temporárias nem sempre precisam de indexação. Quando a oferta responde a uma busca recorrente, planejamos conteúdo próprio, URL estável e links internos, evitando competir com páginas de serviço já existentes.']
    ],
    faq: [
      ['Landing page é a mesma coisa que site?', 'Não. A landing page costuma ter uma oferta e uma ação principal; um site apresenta a empresa e suas diferentes soluções.'],
      ['Pode receber tráfego pago e orgânico?', 'Sim, mas a estratégia de conteúdo e indexação deve considerar a intenção de cada origem.'],
      ['Como medir resultados?', 'Eventos de clique, envios confirmados e dados de campanha ajudam a analisar a conversão sem contar ações que falharam.']
    ],
    related: ['criacao-de-sites', 'integracoes', 'desenvolvimento-de-dashboard'],
    cta: 'Criar minha landing page'
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce Personalizado e Integrações | Gideon Systems',
    description: 'E-commerce conectado a catálogo, ERP, pagamentos e operação comercial. Avalie uma experiência de venda alinhada ao seu negócio.',
    h1: 'Um e-commerce conectado à sua operação, do catálogo ao pedido',
    intro: 'Vender online envolve muito mais que o checkout. A Gideon conecta catálogo, estoque, pagamento e atendimento para criar uma experiência de compra alinhada ao jeito da sua empresa operar.',
    sections: [
      ['Jornada de compra', 'A arquitetura considera catálogo, busca, páginas de produto, carrinho e etapas de compra. O desenho muda conforme a venda seja direta, por cotação ou B2B com regras específicas de cliente e preço.'],
      ['Operação integrada', 'Pedidos podem alimentar ERP, atualizar estoque e acionar fluxos financeiros e comerciais, conforme as interfaces disponíveis. Gateways de pagamento e serviços de terceiros exigem análise de taxas, segurança, conciliação e responsabilidades de cada sistema.'],
      ['Evolução orientada por dados', 'Medição de navegação e conversão ajuda a encontrar fricções reais. Desempenho mobile, SEO das páginas relevantes e manutenção de catálogo importam tanto quanto a primeira publicação da loja.']
    ],
    faq: [
      ['É possível integrar o e-commerce ao ERP?', 'Sim, se houver meios técnicos de troca de dados. Mapeamos produtos, estoque, pedidos e regras de atualização antes de implementar.'],
      ['Preciso de uma plataforma própria?', 'Depende das regras de venda e das integrações. Uma plataforma existente pode ser suficiente; o desenvolvimento próprio faz sentido para necessidades específicas.'],
      ['O catálogo pode ter regras B2B?', 'Sim, como visibilidade por cliente, preços específicos ou pedidos por cotação, quando previstos no escopo.']
    ],
    related: ['integracoes', 'erp-sob-medida', 'criacao-de-sites'],
    cta: 'Planejar meu e-commerce'
  },
  {
    slug: 'infraestrutura-ti',
    title: 'Infraestrutura de TI para Empresas | Gideon Systems',
    description: 'Redes, servidores e suporte para a base tecnológica da operação. Converse com a Gideon sobre infraestrutura de TI empresarial.',
    h1: 'Tecnologia confiável para sua empresa continuar trabalhando',
    intro: 'Rede instável, equipamentos sem suporte e falhas de acesso interrompem a rotina. A Gideon cuida da base de TI para que a equipe trabalhe com segurança, estabilidade e menos imprevistos.',
    sections: [
      ['Diagnóstico da base atual', 'Analisamos conectividade, equipamentos, pontos de falha e demandas de acesso. O objetivo é entender onde a infraestrutura limita o trabalho e quais melhorias podem ser priorizadas, sem trocar recursos que ainda atendem bem.'],
      ['Projeto e implantação', 'Redes corporativas, configuração de servidores e organização de ambientes exigem escopo, compatibilidade e planejamento de mudança. Definimos com a empresa as janelas de execução e as verificações necessárias para reduzir interrupções.'],
      ['Continuidade e suporte', 'Documentação, rotinas de atualização, backups e responsabilidades de suporte ajudam a manter a operação. Serviços presenciais dependem da região e da disponibilidade; confirme a cobertura antes de planejar uma visita.']
    ],
    faq: [
      ['O atendimento de infraestrutura é presencial?', 'Algumas atividades podem ser remotas; instalações e manutenção física exigem presença. A cobertura deve ser confirmada para cada localidade.'],
      ['Vocês avaliam a infraestrutura existente?', 'Sim. O diagnóstico identifica necessidades e prioridades antes de propor mudanças.'],
      ['Infraestrutura pode ser planejada junto com software?', 'Sim. Considerar acesso, disponibilidade e crescimento desde o projeto evita decisões isoladas.']
    ],
    related: ['consultoria-ti', 'desenvolvimento-de-software-sob-medida', 'integracoes'],
    cta: 'Conversar sobre infraestrutura'
  },
  {
    slug: 'consultoria-ti',
    title: 'Consultoria de TI para Empresas | Gideon Systems',
    description: 'Diagnóstico de processos, sistemas e infraestrutura para priorizar investimentos em tecnologia. Solicite uma análise do seu cenário.',
    h1: 'Decisões melhores de tecnologia, sem investimento desperdiçado',
    intro: 'Antes de comprar mais uma ferramenta ou começar um sistema, é preciso saber onde está o problema. A Gideon analisa processos, sistemas e infraestrutura para indicar prioridades e um caminho claro de evolução.',
    sections: [
      ['Entender o cenário', 'Conversamos com as áreas envolvidas e examinamos o fluxo de informação, as ferramentas em uso e as dificuldades recorrentes. A análise distingue problemas de processo, integração, produto e infraestrutura, evitando resolver tudo com mais uma plataforma.'],
      ['Priorizar oportunidades', 'Organizamos alternativas por impacto, dependências, esforço e risco. A recomendação pode ser melhorar um sistema existente, integrar ferramentas, automatizar uma rotina ou desenvolver uma solução específica.'],
      ['Transformar diagnóstico em execução', 'O resultado deve servir para uma decisão concreta: escopo inicial, etapas, responsáveis e pontos a validar. A Gideon pode apoiar a implementação quando houver alinhamento, mas a análise já precisa ser útil por si só.']
    ],
    faq: [
      ['Quando contratar consultoria de TI?', 'Quando decisões de tecnologia envolvem várias áreas, sistemas desconectados ou investimentos sem prioridade clara.'],
      ['A consultoria inclui desenvolvimento?', 'O escopo de consultoria e eventual implementação são definidos separadamente conforme a necessidade.'],
      ['Pode atender empresas fora do Rio de Janeiro?', 'Sim. Projetos de software e análise podem ser conduzidos remotamente em todo o Brasil; atividades físicas dependem de cobertura.']
    ],
    related: ['desenvolvimento-de-software-sob-medida', 'infraestrutura-ti', 'automacao-de-processos'],
    cta: 'Solicitar análise do projeto'
  }
];

export const homeNavigator = {
  kicker: 'Encontre o ponto de partida do seu projeto',
  title: 'Escolha o desafio que hoje mais limita sua operação',
  text: 'Veja como uma solução sob medida pode organizar o trabalho da sua equipe e abrir uma conversa objetiva com a Gideon.',
  cta: 'Conhecer esta solução',
  options: [
    {
      slug: 'crm-sob-medida',
      label: 'CRM',
      title: 'Mais clareza para vender e acompanhar cada oportunidade',
      text: 'Organize leads, propostas e próximos passos em um processo que faz sentido para a sua equipe comercial.'
    },
    {
      slug: 'erp-sob-medida',
      label: 'ERP',
      title: 'Uma operação conectada, da venda ao financeiro',
      text: 'Reúna as áreas e informações que hoje dependem de ferramentas separadas e retrabalho manual.'
    },
    {
      slug: 'automacao-de-processos',
      label: 'Automações',
      title: 'Menos tarefas repetitivas, mais tempo para a operação avançar',
      text: 'Conecte sistemas e acione fluxos que reduzem etapas manuais sem perder o controle do processo.'
    }
  ]
};

export const sitePages = [
  {
    slug: '', kind: 'home', title: 'Software Sob Medida para Empresas | Gideon Systems',
    description: 'Software house no Rio de Janeiro com atendimento nacional. Desenvolvemos sistemas, ERP, CRM e automações para reduzir retrabalho e conectar sua operação.',
    h1: 'Software sob medida para sua empresa avançar',
    intro: 'A Gideon Systems desenvolve sistemas, ERP, CRM e automações para reduzir retrabalho, conectar informações e apoiar o crescimento da sua empresa. Software house no Rio de Janeiro com projetos para empresas em todo o Brasil.',
    sections: [
      ['Menos retrabalho', 'Substitua tarefas repetitivas e informações espalhadas por fluxos claros. A solução é desenhada a partir do que sua equipe realmente precisa fazer, sem obrigar a operação a caber em um modelo genérico.'],
      ['Informação conectada', 'Vendas, gestão e operação podem trabalhar com dados consistentes. Integramos sistemas e criamos visões úteis para que as decisões não dependam de copiar planilhas ou esperar relatórios manuais.'],
      ['Evolução junto com o negócio', 'Começamos pelo problema mais importante e organizamos entregas que possam ser validadas. O sistema pode evoluir conforme novas necessidades aparecem, com prioridades definidas junto com sua equipe.']
    ],
    cta: 'Conversar sobre meu projeto'
  },
  {
    slug: 'sobre', kind: 'about', title: 'Sobre a Gideon Systems | Software House no Rio de Janeiro',
    description: 'Conheça a Gideon Systems, software house no Rio de Janeiro com projetos de software e tecnologia para empresas em todo o Brasil.',
    h1: 'Gideon Systems: software e tecnologia orientados ao negócio',
    intro: 'A Gideon Systems é uma software house brasileira. Desenvolvemos sistemas sob medida e soluções digitais para operações que precisam de processos claros, dados conectados e tecnologia preparada para evoluir.',
    sections: [
      ['Como trabalhamos', 'Começamos entendendo o processo e os objetivos. Depois, definimos arquitetura, prioridades e etapas de desenvolvimento. A validação com a equipe reduz decisões baseadas apenas em suposições.'],
      ['Onde atuamos', 'A Gideon se posiciona no Rio de Janeiro e atende projetos de software remotamente em todo o Brasil. Serviços de infraestrutura que exigem presença física dependem de confirmação de cobertura.']
    ]
  },
  {
    slug: 'contato', kind: 'contact', title: 'Contato e Orçamento | Gideon Systems',
    description: 'Converse com a Gideon Systems sobre software sob medida, ERP, CRM, automações, sites e infraestrutura. Conte o contexto do seu projeto.',
    h1: 'Fale com a Gideon sobre seu projeto',
    intro: 'Conte qual processo você quer melhorar, quais sistemas já utiliza e qual resultado espera. A conversa inicial ajuda a identificar o melhor próximo passo para o projeto.',
    sections: [
      ['O que trazer para a conversa', 'Uma descrição do problema, as pessoas envolvidas, ferramentas existentes e integrações desejadas já ajudam a avaliar o cenário. Não é preciso chegar com uma especificação técnica pronta.']
    ]
  },
  {
    slug: 'cases', kind: 'cases', title: 'Projetos e Cases | Gideon Systems',
    description: 'Conheça a abordagem da Gideon Systems para documentar projetos de software, integrações e transformação digital.',
    h1: 'Projetos e cases da Gideon Systems',
    intro: 'Um bom case mostra contexto, problema, solução, implementação e resultado verificável. Estamos organizando os projetos publicáveis com autorização e informações confirmadas. Enquanto isso, conheça as soluções que podemos desenvolver para sua empresa.',
    sections: [
      ['Como documentamos um projeto', 'Descrevemos o desafio, as decisões técnicas, as tecnologias efetivamente usadas e o que mudou na operação. Métricas e nomes de clientes só entram com confirmação.']
    ], noindex: true
  },
  {
    slug: 'blog', kind: 'blog', title: 'Conteúdo sobre Software Empresarial | Gideon Systems',
    description: 'Artigos da Gideon Systems sobre ERP, CRM, automação, APIs, desenvolvimento e tecnologia para empresas.',
    h1: 'Ideias práticas sobre software empresarial',
    intro: 'Conteúdo para apoiar decisões sobre ERP, CRM, automações, integrações, IA e desenvolvimento. Publicamos apenas materiais completos e úteis para quem precisa escolher ou evoluir tecnologia na empresa.',
    sections: [
      ['Temas em preparação', 'Custos de um sistema sob medida, escolha entre software pronto e próprio, integração de ERP com e-commerce, uso de WhatsApp no CRM e substituição de planilhas por sistemas são pautas em desenvolvimento editorial.']
    ], noindex: true
  }
];
