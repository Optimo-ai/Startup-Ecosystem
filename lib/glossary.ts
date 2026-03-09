export const GLOSSARY_TERMS = {
  PRESEMILLA: {
    term: "Presemilla",
    definition: "Etapa inicial de una startup, antes de recibir financiación formal. Fase de validación de idea y prototipado."
  },
  SEMILLA: {
    term: "Semilla",
    definition: "Primera ronda de financiación. La startup ha validado su idea y busca capital para desarrollar el producto y escalar."
  },
  SERIE_A: {
    term: "Serie A",
    definition: "Segunda ronda de financiación. Para startups con producto validado en el mercado que buscan acelerar crecimiento."
  },
  PRE_SERIE_A: {
    term: "Pre Serie A",
    definition: "Financiación intermedia entre Semilla y Serie A. Para startups con tracción y lista para escalar significativamente."
  },
  RD: {
    term: "RD",
    definition: "Startups locales con operaciones y/o fundadores basados en República Dominicana."
  },
  DIASPORA: {
    term: "Diáspora",
    definition: "Startups fundadas por dominicanos o con origen en República Dominicana que operan desde el extranjero."
  },
  PROPTECH: {
    term: "PropTech",
    definition: "Technology aplicada al sector inmobiliario y real estate."
  },
  FINTECH: {
    term: "FinTech",
    definition: "Tecnología financiera. Soluciones innovadoras en servicios financieros y pagos."
  },
  LOGTECH: {
    term: "LogTech",
    definition: "Tecnología aplicada a logística y cadena de suministro."
  },
  AI: {
    term: "AI",
    definition: "Inteligencia Artificial. Soluciones basadas en machine learning y automatización inteligente."
  },
  PRODUCTIVIDAD: {
    term: "Productividad",
    definition: "Herramientas y plataformas que mejoran la eficiencia operacional de negocios."
  },
} as const

export type GlossaryKey = keyof typeof GLOSSARY_TERMS
