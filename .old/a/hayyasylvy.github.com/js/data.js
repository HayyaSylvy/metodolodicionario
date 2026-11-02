// Categorias e verbetes-base do dicionário
const CATS = ["Fundamentos", "Tipos e produtos", "Normas e formatos", "Comunidade científica"];

const BASE = [
  {
    id: "pesquisa", termo: "Pesquisa", cat: "Fundamentos",
    def: "Investigação planejada e sistemática que busca responder a uma pergunta ou resolver um problema, usando métodos reconhecidos e produzindo conhecimento que outras pessoas possam verificar.",
    mais: [
      "Parte de uma pergunta ou problema delimitado, não de um tema amplo.",
      "Exige método explícito: quem lê precisa saber como os dados foram obtidos e analisados.",
      "Termina em um resultado comunicável, como artigo, dissertação ou relatório."
    ],
    ex: "Comparar o tempo de resposta de duas arquiteturas de software sob a mesma carga é pesquisa. Juntar opiniões soltas sobre elas, não.",
    ver: ["tipos-pesquisa", "projeto-pesquisa", "ciencia-tecnologia"]
  },
  {
    id: "dados-informacao-conhecimento", termo: "Dados, informação e conhecimento", cat: "Fundamentos",
    def: "Três níveis de elaboração do que sabemos: dados são registros brutos, informação é o dado com contexto e conhecimento é a informação interpretada e usada para decidir ou agir.",
    mais: [
      "Dado: o número 38,5, sozinho, não diz nada.",
      "Informação: a temperatura do paciente às 14h é 38,5 °C.",
      "Conhecimento: temperatura acima de 38 °C com tosse persistente indica avaliar infecção respiratória.",
      "Alguns autores acrescentam a sabedoria no topo, formando a pirâmide DIKW (data, information, knowledge, wisdom)."
    ],
    ex: "Uma planilha de notas é dado. A média da turma por disciplina é informação. Saber qual disciplina precisa de reforço é conhecimento.",
    ver: ["pesquisa", "ciencia-tecnologia"]
  },
  {
    id: "ciencia-tecnologia", termo: "Ciência × tecnologia", cat: "Fundamentos",
    def: "A ciência busca compreender e explicar fenômenos; a tecnologia usa conhecimento para criar soluções, produtos e processos. Uma alimenta a outra.",
    mais: [
      "Ciência: produz teorias, leis e modelos que podem ser testados.",
      "Tecnologia: produz artefatos, técnicas e sistemas que resolvem problemas práticos.",
      "A influência corre nos dois sentidos: a teoria da informação permitiu a compressão de dados, e o telescópio permitiu novas descobertas astronômicas.",
      "Na computação as duas se misturam, e por isso a pesquisa na área costuma ser aplicada."
    ],
    ex: "Estudar por que um algoritmo de ordenação é mais rápido é ciência. Implementá-lo em um aplicativo é tecnologia.",
    ver: ["pesquisa", "dados-informacao-conhecimento", "tipos-pesquisa"]
  },
  {
    id: "tipos-pesquisa", termo: "Tipos de pesquisa", cat: "Tipos e produtos",
    def: "Classificações usadas para descrever uma pesquisa segundo critérios como natureza, abordagem, objetivos e procedimentos técnicos.",
    mais: [
      "Natureza: básica (gera conhecimento sem aplicação imediata) ou aplicada (busca resolver um problema prático).",
      "Abordagem: qualitativa (interpreta significados) ou quantitativa (mede e testa com números).",
      "Objetivos: exploratória, descritiva ou explicativa.",
      "Procedimentos: bibliográfica, experimental, estudo de caso, levantamento, pesquisa-ação, entre outros."
    ],
    nota: "Anotado em aula com a referência Wazlawick (2021). Confira no livro as categorias exatas que o autor adota, pois cada obra organiza essa classificação de um jeito.",
    ex: "Um experimento que mede o consumo de energia de dois aplicativos é aplicada, quantitativa, explicativa e experimental.",
    ver: ["pesquisa", "projeto-pesquisa", "tipos-trabalho"]
  },
  {
    id: "tipos-trabalho", termo: "Tipos de trabalho científico", cat: "Tipos e produtos",
    def: "Formatos em que uma pesquisa é registrada e comunicada, cada um com extensão, estrutura e público próprios.",
    mais: [
      "Artigo científico: texto curto, publicado em periódico ou anais de evento.",
      "Resumo expandido: versão intermediária, comum em eventos de iniciação científica.",
      "Monografia ou TCC: trabalho de conclusão de curso, segue a NBR 14724.",
      "Dissertação (mestrado) e tese (doutorado): trabalhos longos e aprofundados.",
      "Relatório técnico, pôster e resenha: usos mais específicos."
    ],
    ex: "O resultado de uma iniciação científica pode virar um resumo expandido no evento da universidade e, depois, um artigo em periódico.",
    ver: ["nbr-14724", "resumo", "evento", "periodico"]
  },
  {
    id: "resumo", termo: "Resumo", cat: "Tipos e produtos",
    def: "Apresentação concisa dos pontos principais de um trabalho: objetivo, método, resultados e conclusões, em texto corrido e sem citações.",
    mais: [
      "A ABNT NBR 6028:2021 (resumo, resenha e recensão) orienta a redação. Ela costuma indicar de 150 a 500 palavras para trabalhos acadêmicos e de 100 a 250 para artigos de periódicos.",
      "Vem seguido de palavras-chave que facilitam a busca.",
      "Em artigos, costuma haver também uma versão em inglês (abstract)."
    ],
    nota: "A NBR 6028 não aparece na lista da aula, mas é a norma que trata do resumo. Confira os limites na edição vigente.",
    ex: "Quem lê só o resumo deve saber o que foi investigado, como e o que se descobriu.",
    ver: ["nbr-14724", "tipos-trabalho"]
  },
  {
    id: "projeto-pesquisa", termo: "Projeto de pesquisa", cat: "Tipos e produtos",
    def: "Documento que planeja uma pesquisa antes de ela acontecer: o que será investigado, por que, como e em quanto tempo.",
    mais: [
      "Tema e problema de pesquisa, com a pergunta que se quer responder.",
      "Objetivo geral e objetivos específicos.",
      "Justificativa e referencial teórico.",
      "Metodologia: tipo de pesquisa, coleta e análise dos dados.",
      "Cronograma e referências."
    ],
    ex: "Um projeto de TCC sobre acessibilidade em aplicativos de ensino traz o problema, os objetivos e o cronograma dos seis meses seguintes.",
    ver: ["pesquisa", "tipos-pesquisa", "nbr-6023"]
  },
  {
    id: "abnt", termo: "Normas ABNT", cat: "Normas e formatos",
    def: "Normas técnicas da Associação Brasileira de Normas Técnicas, a entidade que padroniza documentos no Brasil. As de código NBR são as normas brasileiras.",
    mais: [
      "NBR 14724 (edição de 2024): estrutura e apresentação de trabalhos acadêmicos.",
      "NBR 10520 (edição de 2023): citações em documentos.",
      "NBR 6023 (edição de 2025): referências.",
      "Outras normas ligadas ao trabalho acadêmico: NBR 6024 (numeração progressiva das seções), NBR 6027 (sumário) e NBR 6028 (resumo).",
      "As normas são revisadas de tempos em tempos, então vale usar a edição vigente."
    ],
    ex: "Quando a coordenação pede o TCC \"nas normas\", em geral se refere a essas três em conjunto.",
    ver: ["nbr-14724", "nbr-10520", "nbr-6023", "normas-apa"]
  },
  {
    id: "nbr-14724", termo: "NBR 14724", cat: "Normas e formatos",
    def: "Norma que define os princípios gerais para a apresentação de trabalhos acadêmicos, como TCCs, dissertações e teses.",
    mais: [
      "Parte pré-textual: capa, folha de rosto, resumo, listas, sumário.",
      "Parte textual: introdução, desenvolvimento e conclusão.",
      "Parte pós-textual: referências, apêndices, anexos.",
      "Também trata de formatação, como margens, espaçamento e numeração de seções.",
      "A edição vigente é a ABNT NBR 14724:2024 (4ª edição), que cancelou e substituiu a de 2011."
    ],
    ex: "O sumário, o resumo e a folha de rosto do seu TCC seguem esta norma.",
    ver: ["abnt", "nbr-10520", "nbr-6023", "tipos-trabalho"]
  },
  {
    id: "nbr-10520", termo: "NBR 10520", cat: "Normas e formatos",
    def: "Norma que trata das citações em documentos: como incluir, no seu texto, ideias e trechos de outras pessoas indicando a fonte.",
    mais: [
      "Citação direta curta: trecho copiado, até três linhas, entre aspas no corpo do texto.",
      "Citação direta longa: mais de três linhas, em bloco recuado e sem aspas.",
      "Citação indireta: ideia do autor reescrita com suas palavras, com a fonte indicada.",
      "Citação de citação: usa-se apud quando só se teve acesso à obra por meio de outra.",
      "A edição vigente é a ABNT NBR 10520:2023, que atualizou a de 2002."
    ],
    ex: "Segundo Silva (2020), a coleta de dados exige critérios claros.",
    ver: ["nbr-6023", "nbr-14724", "abnt", "normas-apa"]
  },
  {
    id: "nbr-6023", termo: "NBR 6023", cat: "Normas e formatos",
    def: "Norma que define como elaborar as referências, a lista das obras citadas no final do trabalho.",
    mais: [
      "Cada obra citada no texto precisa aparecer na lista, e só elas.",
      "Os elementos essenciais mudam conforme o tipo de documento: autor, título, edição, local, editora e ano para livros.",
      "A lista segue ordem alfabética pelo sobrenome do primeiro autor, no sistema autor-data.",
      "A edição vigente é a ABNT NBR 6023:2025 (3ª edição, de 21 de maio de 2025), que cancelou e substituiu a de 2018. Obras seguidas do mesmo autor podem trazer seis traços no lugar do nome a partir da segunda."
    ],
    ex: "SILVA, Ana. Métodos de pesquisa. 2. ed. São Paulo: Exemplo, 2020. (referência fictícia, só para mostrar a ordem dos elementos)",
    ver: ["nbr-10520", "nbr-14724", "abnt", "normas-apa"]
  },
  {
    id: "normas-apa", termo: "Normas APA", cat: "Normas e formatos",
    def: "Padrão de citação e referência da American Psychological Association, muito usado em psicologia, educação e em periódicos internacionais.",
    mais: [
      "Citação no sistema autor-data, com o ano entre parênteses.",
      "Lista de referências em ordem alfabética ao final.",
      "Está na 7ª edição, de 2020.",
      "No Brasil, a ABNT é o padrão da maioria das instituições, e a APA aparece quando o curso ou o periódico a exige."
    ],
    ex: "Citação: (Silva, 2020). Referência: Silva, A. (2020). Métodos de pesquisa. Editora Exemplo. (fictícia)",
    ver: ["abnt", "nbr-10520", "nbr-6023"]
  },
  {
    id: "evento", termo: "Evento científico", cat: "Comunidade científica",
    def: "Encontro em que pesquisadores apresentam e discutem trabalhos: congressos, simpósios, workshops, seminários e jornadas.",
    mais: [
      "Costuma abrir uma chamada de trabalhos (call for papers) com prazos e regras.",
      "Os trabalhos passam por avaliação por pares antes de aceitos.",
      "Os textos aprovados são reunidos nos anais do evento.",
      "Na computação, conferências têm peso grande, às vezes comparável ao dos periódicos."
    ],
    ex: "O CSBC (Congresso da Sociedade Brasileira de Computação) reúne vários simpósios da área em um mesmo período.",
    ver: ["sbc", "periodico", "tipos-trabalho", "associacoes"]
  },
  {
    id: "periodico", termo: "Periódicos", cat: "Comunidade científica",
    def: "Revistas científicas que publicam artigos de forma regular, depois de revisão por especialistas, e servem de registro oficial da produção de uma área.",
    mais: [
      "A revisão por pares avalia originalidade, método e qualidade antes da publicação.",
      "Cada artigo é identificado por volume, número e, em geral, um DOI.",
      "Em geral o texto é mais longo e mais elaborado do que o publicado em anais."
    ],
    ex: "O Journal of the Brazilian Computer Society (JBCS), da SBC, e o IEEE Transactions on Software Engineering são periódicos da computação.",
    ver: ["evento", "repositorios", "associacoes"]
  },
  {
    id: "associacoes", termo: "Associações da área", cat: "Comunidade científica",
    def: "Organizações de pesquisadores e profissionais que promovem eventos, publicam periódicos, criam padrões e representam a comunidade.",
    mais: [
      "Na computação, três nomes aparecem o tempo todo: SBC, IEEE e ACM.",
      "Ser sócio costuma dar desconto em inscrições e acesso a bibliotecas digitais.",
      "Os eventos e periódicos dessas associações são boas fontes para começar uma revisão de literatura."
    ],
    ex: "Para um tema de engenharia de software, comece pelos eventos e periódicos da SBC, da IEEE e da ACM.",
    ver: ["sbc", "ieee", "acm", "evento", "periodico"]
  },
  {
    id: "sbc", termo: "SBC", cat: "Comunidade científica",
    def: "Sociedade Brasileira de Computação, entidade científica da área no Brasil, fundada em 1978.",
    mais: [
      "Organiza o CSBC, congresso anual com vários simpósios.",
      "Publica o Journal of the Brazilian Computer Society (JBCS).",
      "Mantém a SBC OpenLib (SOL), biblioteca digital com artigos de eventos e periódicos, de acesso aberto."
    ],
    ex: "Boa fonte para encontrar trabalhos em português da área de computação.",
    ver: ["associacoes", "evento", "ieee", "acm"]
  },
  {
    id: "ieee", termo: "IEEE", cat: "Comunidade científica",
    def: "Institute of Electrical and Electronics Engineers, grande organização técnica profissional, lida \"i-triplo-e\". Atua em engenharia elétrica, eletrônica e computação.",
    mais: [
      "Publica periódicos e organiza conferências no mundo todo.",
      "Define padrões técnicos, como o IEEE 802.11, base do Wi-Fi.",
      "A biblioteca digital IEEE Xplore reúne seus artigos e padrões."
    ],
    ex: "Uma busca por artigos sobre redes de sensores quase sempre leva ao IEEE Xplore.",
    ver: ["associacoes", "sbc", "acm", "repositorios"]
  },
  {
    id: "acm", termo: "ACM", cat: "Comunidade científica",
    def: "Association for Computing Machinery, fundada em 1947, a maior sociedade científica e educacional dedicada à computação.",
    mais: [
      "Publica a revista Communications of the ACM e vários periódicos especializados.",
      "Concede o Prêmio Turing, o mais importante da área.",
      "A ACM Digital Library reúne artigos e anais de suas conferências."
    ],
    ex: "Trabalhos de interação humano-computador costumam sair em conferências da ACM, como a CHI.",
    ver: ["associacoes", "sbc", "ieee", "repositorios"]
  },
  {
    id: "repositorios", termo: "Repositórios e portais científicos", cat: "Comunidade científica",
    def: "Plataformas onde se encontram trabalhos acadêmicos: repositórios guardam a produção de instituições e portais reúnem e indexam publicações de muitas fontes.",
    mais: [
      "BDTD: biblioteca digital de teses e dissertações brasileiras.",
      "Portal de Periódicos da CAPES: acesso a periódicos e bases para instituições conveniadas.",
      "SciELO: periódicos de acesso aberto, forte na América Latina.",
      "Google Acadêmico: busca ampla, útil para achar e rastrear citações.",
      "IEEE Xplore, ACM Digital Library e SBC OpenLib: bibliotecas das associações da área."
    ],
    ex: "Ao procurar trabalhos anteriores sobre o seu tema, combine uma busca ampla com as bibliotecas da sua área.",
    ver: ["periodico", "associacoes", "pesquisa"]
  }
];

// Referências fixas (ABNT NBR 6023:2025). Cada verbete lista as suas em FONTES.
// Montagem: aut. pre<strong>tit</strong>pos
const ABNT_ORG = "ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS";
const ACESSO = " Acesso em: 28 out. 2026.";
const REFS = {
  nbr10520: { aut: ABNT_ORG, tit: "ABNT NBR 10520", pos: ": informação e documentação: citações em documentos: apresentação. Rio de Janeiro: ABNT, 2023." },
  nbr14724: { aut: ABNT_ORG, tit: "ABNT NBR 14724", pos: ": informação e documentação: trabalhos acadêmicos: apresentação. 4. ed. Rio de Janeiro: ABNT, 2024." },
  nbr6022:  { aut: ABNT_ORG, tit: "ABNT NBR 6022", pos: ": informação e documentação: artigo em publicação periódica técnica e/ou científica: apresentação. 2. ed. Rio de Janeiro: ABNT, 2018." },
  nbr6023:  { aut: ABNT_ORG, tit: "ABNT NBR 6023", pos: ": informação e documentação: referências: elaboração. 3. ed. Rio de Janeiro: ABNT, 2025." },
  nbr6024:  { aut: ABNT_ORG, tit: "ABNT NBR 6024", pos: ": informação e documentação: numeração progressiva das seções de um documento escrito: apresentação. 2. ed. Rio de Janeiro: ABNT, 2012." },
  nbr6027:  { aut: ABNT_ORG, tit: "ABNT NBR 6027", pos: ": informação e documentação: sumário: apresentação. 2. ed. Rio de Janeiro: ABNT, 2012." },
  nbr6028:  { aut: ABNT_ORG, tit: "ABNT NBR 6028", pos: ": informação e documentação: resumo, resenha e recensão: apresentação. 2. ed. Rio de Janeiro: ABNT, 2021." },
  acm: { aut: "ASSOCIATION FOR COMPUTING MACHINERY", tit: "ACM history", pos: ". New York: ACM, [s. d.]. Disponível em: https://www.acm.org/acm-history." + ACESSO },
  ieee: { aut: "INSTITUTE OF ELECTRICAL AND ELECTRONICS ENGINEERS", tit: "About IEEE Xplore", pos: ". [S. l.]: IEEE, [s. d.]. Disponível em: https://ieeexplore.ieee.org/Xplorehelp/overview-of-ieee-xplore/about-ieee-xplore." + ACESSO },
  apa: { aut: "AMERICAN PSYCHOLOGICAL ASSOCIATION", tit: "Publication manual of the American Psychological Association", pos: ". 7th ed. Washington, DC: APA, 2020." },
  ackoff: { aut: "ACKOFF, Russell L", pre: "From data to wisdom. ", tit: "Journal of Applied Systems Analysis", pos: ", [S. l.], v. 16, p. 3-9, 1989." },
  rowley: { aut: "ROWLEY, Jennifer", pre: "The wisdom hierarchy: representations of the DIKW hierarchy. ", tit: "Journal of Information Science", pos: ", [S. l.], v. 33, n. 2, p. 163-180, 2007." },
  bigonha: { aut: "BIGONHA, Roberto da Silva (org.)", tit: "Memórias da Sociedade Brasileira de Computação", pos: ": 1978-2023. Porto Alegre: SBC, 2024. E-book. Disponível em: https://books-sol.sbc.org.br/index.php/sbc/catalog/download/146/642/1124?inline=1." + ACESSO },
  gil: { aut: "GIL, Antonio Carlos", tit: "Como elaborar projetos de pesquisa", pos: ". 6. ed. São Paulo: Atlas, 2017." },
  leite: { aut: "LEITE, Fernando César Lima; ASSIS, Tatiana Bezerra de; MELO, Bruno Almeida de", pre: "Gestão de teses e dissertações eletrônicas no Brasil: sobre bibliotecas digitais de teses e dissertações e repositórios institucionais. ", tit: "Informação & Informação", pos: ", Londrina, v. 20, n. 3, p. 529-543, 2015. DOI: 10.5433/1981-8920.2015v20n3p529. Disponível em: https://ojs.uel.br/revistas/uel/index.php/informacao/article/view/21090." + ACESSO },
  prodanov: { aut: "PRODANOV, Cleber Cristiano; FREITAS, Ernani Cesar de", tit: "Metodologia do trabalho científico", pos: ": métodos e técnicas da pesquisa e do trabalho acadêmico. 2. ed. Novo Hamburgo: Feevale, 2013." },
  wazlawick: { aut: "WAZLAWICK, Raul Sidnei", tit: "Metodologia de pesquisa para ciência da computação", pos: ". 3. ed. Rio de Janeiro: GEN LTC, 2021." }
};


// Chamadas autor-data (ABNT NBR 10520:2023) correspondentes a cada referência.
const CIT = {
  nbr10520: "ABNT, 2023", nbr14724: "ABNT, 2024", nbr6022: "ABNT, 2018", nbr6023: "ABNT, 2025",
  nbr6024: "ABNT, 2012", nbr6027: "ABNT, 2012", nbr6028: "ABNT, 2021",
  acm: "ACM, [s. d.]", ieee: "IEEE, [s. d.]", apa: "APA, 2020",
  ackoff: "ACKOFF, 1989", rowley: "ROWLEY, 2007", bigonha: "BIGONHA, 2024", gil: "GIL, 2017",
  leite: "LEITE; ASSIS; MELO, 2015", prodanov: "PRODANOV; FREITAS, 2013", wazlawick: "WAZLAWICK, 2021"
};
Object.keys(REFS).forEach((k) => { REFS[k].cit = CIT[k]; REFS[k].key = k; });

const FONTES = {
  "pesquisa": ["gil", "wazlawick"],
  "dados-informacao-conhecimento": ["ackoff", "rowley"],
  "ciencia-tecnologia": ["wazlawick"],
  "tipos-pesquisa": ["prodanov", "wazlawick"],
  "tipos-trabalho": ["nbr14724", "nbr6022"],
  "resumo": ["nbr6028"],
  "projeto-pesquisa": ["gil"],
  "abnt": ["nbr6023", "nbr10520", "nbr14724", "nbr6024", "nbr6027", "nbr6028"],
  "nbr-14724": ["nbr14724"],
  "nbr-10520": ["nbr10520"],
  "nbr-6023": ["nbr6023"],
  "normas-apa": ["apa"],
  "evento": ["bigonha"],
  "periodico": ["nbr6022"],
  "associacoes": ["bigonha", "acm", "ieee"],
  "sbc": ["bigonha"],
  "ieee": ["ieee"],
  "acm": ["acm"],
  "repositorios": ["leite", "ieee", "bigonha"]
};
// Em ordem alfabética, como exige a NBR 6023.
BASE.forEach((e) => {
  e.fonte = (FONTES[e.id] || []).map((id) => REFS[id])
    .sort((a, b) => (a.aut + a.tit).localeCompare(b.aut + b.tit, "pt"));
});
