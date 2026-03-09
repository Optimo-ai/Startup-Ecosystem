"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export type Language = "en" | "es"

export const translations = {
  en: {
    // Dashboard Header
    header: {
      brand: "Boost Analytics",
      title: "Startup Ecosystem",
      subtitle: "Dominican Republic & Diaspora",
      lastUpdated: "Last Updated",
    },
    // Platform Introduction
    intro: {
      mainTitle: "Startup Ecosystem Analytics",
      card1Title: "What is it?",
      card1Items: [
        "Startup ecosystem analysis and mapping platform",
        "Real-time data on companies, sectors, and stages",
        "Team structure and founder information",
      ],
      card2Title: "What is it for?",
      card2Items: [
        "Explore and understand the startup ecosystem",
        "Identify trends by industry and stage",
        "Compare geographic and digital characteristics",
      ],
      card3Title: "Project Status",
      card3Items: [
        "Platform under active development",
        "Expanding coverage and improving data continuously",
        "Your feedback contributes to our improvements",
      ],
      noteLabel: "Note on data:",
      noteText: "Information collected and verified. Some fields may be incomplete as we expand our database.",
    },
    // Methodology
    methodology: {
      mainTitle: "Methodology and Scope",
      card1Title: "Startup Selection",
      card1Text: "All companies registered in our CSV files are included, validating that they have names and key data.",
      card2Title: "RD vs Diaspora",
      rdLabel: "RD",
      rdDef: "Local startups with operations and/or founders based in Dominican Republic.",
      rdText: "Local startups in Dominican Republic",
      diasporaLabel: "Diaspora",
      diasporaDef: "Startups founded by Dominicans or with origins in Dominican Republic operating from abroad.",
      diasporaText: "Startups founded by Dominicans outside the country",
      noteLabel: "Methodological note:",
      noteText: "This analysis is based on verified data and continuously updated to ensure precision in our classifications.",
    },
    // Page sections
    page: {
      generalDistribution: "General Ecosystem Distribution",
      generalDistributionDesc: "Key statistics and startup composition",
      industryStageAnalysis: "Industry and Stage Analysis",
      industryStageAnalysisDesc: "Detailed visualization of startups by sector and maturity level",
      digitalEcosystem: "Digital Ecosystem and Online Presence",
      digitalEcosystemDesc: "Visibility and digital maturity metrics",
      rdDiaspora: "RD vs Diaspora: Comparative Analysis",
      rdDiasporaDesc: "Differences and similarities between the local ecosystem and diaspora",
      industryMatrix: "Industry × Stage Matrix",
      industryMatrixDesc: "Visualization of the intersection between industries and maturity stages",
      dataQuality: "Data Quality and Integrity",
      dataQualityDesc: "Analysis of dataset completeness and quality",
    },
    // Insights
    insights: {
      industryDiversification: (count: number) =>
        `The ${count} industries represented show diversification across the ecosystem.`,
      earlyStage: "The majority of startups are in early stages, indicating a dynamic and growing ecosystem.",
      founderModels: "Most startups have either a single founder or co-founders, with both models significantly represented.",
      digitalPresence: "Online presence is critical; here we show what percentage of startups have websites and LinkedIn profiles.",
      rdDiaspora: "The RD vs Diaspora analysis reveals specialization patterns and collaboration opportunities.",
    },
    // Dataset Overview
    dataset: {
      title: "Ecosystem Size & Coverage",
      subtitle: (count: number) => `Comprehensive analysis of ${count.toLocaleString()} startups in the Dominican ecosystem`,
      totalStartups: "Total Startups",
      totalStartupsSource: "Aggregated from multiple sources",
      startupsInDR: "Startups in DR",
      ofTotal: "of total ecosystem",
      diaspora: "Diaspora",
      dataCoverage: "Data Coverage",
      industry: "Industry",
      stage: "Stage",
      website: "Website",
      ecosystemComposition: "Ecosystem Composition",
      ecosystemCompositionText: (count: number) =>
        `This dataset integrates ${count.toLocaleString()} startups from the Dominican ecosystem, including local and diaspora initiatives. Each metric reflects the availability of declared data, validated across multiple sources.`,
    },
    // Industry Chart
    industryChart: {
      title: "Industry Distribution",
      subtitle: "Classification of startups by industry sector",
      limitedCoverage: "Limited Coverage",
      limitedCoverageText: (pct: number) =>
        `Only ${pct}% of startups have declared industry information. Charts require at least 30% coverage to provide meaningful insights.`,
      basedOn: (count: number, pct: number) =>
        `Based on ${count.toLocaleString()} startups with industry data (${pct}% coverage)`,
      sectors: "sectors",
      topSectors: (n: number) => `Shows the top ${n} sectors by number of startups`,
    },
    // Stage Chart
    stageChart: {
      title: "Stage Distribution",
      subtitle: "Breakdown of startups by development stage",
      limitedCoverage: "Limited Coverage",
      limitedCoverageText: (pct: number) =>
        `Only ${pct}% of startups have declared stage information. Charts require at least 30% coverage to provide meaningful insights.`,
      basedOn: (count: number, pct: number) =>
        `Based on ${count.toLocaleString()} startups with stage data (${pct}% coverage)`,
      stages: "stages",
      groupedByStage: "Startups grouped by development stage",
    },
    // Digital Presence
    digitalPresence: {
      title: "Digital Presence",
      subtitle: (count: number) => `Online visibility metrics across all ${count.toLocaleString()} startups`,
      websitePresence: "Website Presence",
      websiteAvailable: "Website available",
      coverage: "coverage",
      linkedinPresence: "LinkedIn Presence",
      linkedinProfile: "Business profile",
      websiteCount: (with_: number, total: number) =>
        `${with_.toLocaleString()} of ${total.toLocaleString()} startups have a declared website`,
      linkedinCount: (with_: number, total: number) =>
        `${with_.toLocaleString()} of ${total.toLocaleString()} startups have a LinkedIn page`,
      summaryTitle: "Digital Presence Summary",
      fullPresence: "Full Presence",
      fullPresenceDesc: "Website and LinkedIn",
      partialPresence: "Partial Presence",
      partialPresenceDesc: "Website or LinkedIn",
      noPresence: "No Presence",
      noPresenceDesc: "No declared platform",
      note: "Based on declared CSV data. \"Digital Presence\" indicates online visibility, not business quality or success.",
    },
    // Digital Maturity
    digitalMaturity: {
      title: "Digital Maturity Index",
      subtitle: (count: number) => `Online visibility combinations across all ${count.toLocaleString()} startups`,
      bothPresent: "Both Present",
      bothDescription: "Website + LinkedIn",
      websiteOnly: "Website Only",
      websiteDescription: "Website only",
      linkedinOnly: "LinkedIn Only",
      linkedinDescription: "LinkedIn only",
      noPresence: "No Presence",
      noPresenceDescription: "No digital presence",
      detailedBreakdown: "Detailed Breakdown",
      coveragePct: (pct: number) => `${pct.toFixed(1)}% coverage`,
      note: "Digital maturity index based on declared website and LinkedIn presence. Measures online visibility, not business effectiveness.",
    },
    // Origin Comparison
    originComparison: {
      title: "DR vs Diaspora Comparison",
      subtitle: "Comparative analysis of startups based in the Dominican Republic and the Dominican diaspora",
      dominicanRepublic: "Dominican Republic",
      diaspora: "Diaspora",
      topIndustry: "Top Industry",
      mostCommonStage: "Most Common Stage",
      webPresence: "Web Presence",
      industryDistribution: "Industry Distribution",
      industryDistributionDesc: "Top 8 industries in both regions",
      stageDistribution: "Stage Distribution",
      stageDistributionDesc: "Development stages of startups",
      digitalPresenceComparison: "Digital Presence Comparison",
      digitalPresenceComparisonDesc: "Percentage of startups with online presence",
      startups: "startups",
      numberOfStartups: "Number of startups",
      industry: "Industry",
      stage: "Stage",
      note: "This comparison highlights strategic differences between the local ecosystem (DR) and initiatives from the Dominican diaspora.",
    },
    // Ecosystem Completeness
    ecosystemCompleteness: {
      title: "Ecosystem Completeness",
      subtitle: "Availability of data across key fields, showing the quality and comprehensiveness of coverage",
      whatDoesItMean: "What does this percentage mean?",
      explanation: "Each percentage indicates the data availability for that specific field. It does not reflect the ecosystem quality, but rather how complete our information coverage is. Higher values indicate better documentation of the startups.",
      dataAvailability: "data availability",
      industryClassification: "Industry Classification",
      developmentStage: "Development Stage",
      websiteInformation: "Website Information",
      linkedinPresence: "LinkedIn Presence",
      complete: "Complete",
      completeDesc: "70% or above",
      partial: "Partial",
      partialDesc: "30–70%",
      limited: "Limited",
      limitedDesc: "Below 30%",
      fullCoverage: "✓ Full coverage (70%+)",
      sufficientCoverage: "⚠ Sufficient coverage (30-70%)",
      limitedData: "✗ Limited data (<30%)",
      footerNote: "All percentages reflect declared data from startups. Missing values are tracked and documented within the analytics framework, ensuring transparency and methodological rigor.",
    },
    // Founder Structure
    founderStructure: {
      title: "Founder Structure",
      subtitle: (count: number) => `Team formation patterns among ${count.toLocaleString()} startups`,
      soloFounder: "Solo Founder",
      twoFounders: "Two Founders",
      noData: "No Data",
      ofTotal: "% of total",
      note: "Founder data is extracted only from declared information. The \"No Data\" category indicates startups with no available founder information.",
    },
    // Industry Stage Heatmap
    heatmap: {
      title: "Industry × Stage Matrix",
      subtitle: "Density of startups by industry and maturity stage",
      matrixUnavailable: "Matrix Unavailable",
      matrixUnavailableText: (indPct: number, stagePct: number) =>
        `This view requires industry data (${indPct}%) and stage data (${stagePct}%) with at least 30% coverage each.`,
      concentration: (count: number) => `Concentration of startups by industry and development stage`,
      startups: "startups",
      heatIntensity: "Heat Intensity",
      lowHigh: "Low → High concentration",
      startup: "startup",
      note: "The matrix shows the intersection between industries and development stages. Darker colors indicate higher concentration of startups in that combination.",
    },
    // Data Logs
    dataLogs: {
      title: "Data Processing Logs",
      subtitle: "Transparency report showing how CSV files were processed and validated",
      csvRows: "CSV Rows",
      totalRowsProcessed: "Total rows processed",
      valid: "Valid",
      accepted: "accepted",
      discarded: "Discarded",
      rejected: "rejected",
      showLogs: "Show detailed logs",
      hideLogs: "Hide detailed logs",
      totalRows: "Total Rows",
      validStartups: "Valid Startups",
      discardReasons: "Discard Reasons",
      andMore: (n: number) => `... and ${n} more reasons`,
      note: "This log documents each stage of data processing, ensuring full transparency in the validation of startups. Discarded rows are recorded for auditing purposes.",
    },
    // Startups Explorer
    explorer: {
      title: "Show Mapped Startups",
      subtitle: (total: number, filtered: number) => `${total} startups • ${filtered} matches`,
      searchPlaceholder: "Search by name, description, or industry...",
      noResults: "No startups found matching your search",
      noDescription: "No description available",
      showing: (filtered: number, total: number) => `Showing ${filtered} of ${total} startups`,
    },
    // Startup Directory
    directory: {
      title: "Startup Directory",
      subtitle: "Explore all startups in the Dominican ecosystem and diaspora",
      searchPlaceholder: "Search by name, description, or industry...",
      noResults: (query: string) => `No startups found matching "${query}"`,
      showing: (filtered: number, total: number) => `Showing ${filtered} of ${total} startups`,
      noDescription: "No description available",
    },
    // Footer
    footer: {
      brand: "Boost Analytics Platform",
      tagline: "Designed for executive insights",
      description: "Verified data • Rigorous analysis • Complete transparency",
      copyright: "© All rights reserved for Boost Acceleration Camp",
    },
    // Last Updated
    lastUpdated: {
      label: "Last Updated",
    },
    // Language toggle
    langToggle: {
      switchTo: "ES",
    },
  },
  es: {
    // Dashboard Header
    header: {
      brand: "Boost Analytics",
      title: "Ecosistema de Startups",
      subtitle: "República Dominicana y Diáspora",
      lastUpdated: "Última Actualización",
    },
    // Platform Introduction
    intro: {
      mainTitle: "Analítica del Ecosistema de Startups",
      card1Title: "¿Qué es?",
      card1Items: [
        "Plataforma de análisis y mapeo del ecosistema de startups",
        "Datos en tiempo real sobre empresas, sectores y etapas",
        "Estructura de equipo e información de fundadores",
      ],
      card2Title: "¿Para qué sirve?",
      card2Items: [
        "Explorar y comprender el ecosistema de startups",
        "Identificar tendencias por industria y etapa",
        "Comparar características geográficas y digitales",
      ],
      card3Title: "Estado del Proyecto",
      card3Items: [
        "Plataforma en desarrollo activo",
        "Ampliando cobertura y mejorando datos continuamente",
        "Tu retroalimentación contribuye a nuestras mejoras",
      ],
      noteLabel: "Nota sobre los datos:",
      noteText: "Información recopilada y verificada. Algunos campos pueden estar incompletos mientras expandimos nuestra base de datos.",
    },
    // Methodology
    methodology: {
      mainTitle: "Metodología y Alcance",
      card1Title: "Selección de Startups",
      card1Text: "Se incluyen todas las empresas registradas en nuestros archivos CSV, validando que tengan nombre y datos clave.",
      card2Title: "RD vs Diáspora",
      rdLabel: "RD",
      rdDef: "Startups locales con operaciones y/o fundadores basados en República Dominicana.",
      rdText: "Startups locales en República Dominicana",
      diasporaLabel: "Diáspora",
      diasporaDef: "Startups fundadas por dominicanos o con origen en República Dominicana que operan desde el extranjero.",
      diasporaText: "Startups fundadas por dominicanos fuera del país",
      noteLabel: "Nota metodológica:",
      noteText: "Este análisis se basa en datos verificados y se actualiza continuamente para garantizar precisión en nuestras clasificaciones.",
    },
    // Page sections
    page: {
      generalDistribution: "Distribución General del Ecosistema",
      generalDistributionDesc: "Estadísticas clave y composición de startups",
      industryStageAnalysis: "Análisis por Industria y Etapa",
      industryStageAnalysisDesc: "Visualización detallada de startups por sector y nivel de madurez",
      digitalEcosystem: "Ecosistema Digital y Presencia en Línea",
      digitalEcosystemDesc: "Métricas de visibilidad y madurez digital",
      rdDiaspora: "RD vs Diáspora: Análisis Comparativo",
      rdDiasporaDesc: "Diferencias y similitudes entre el ecosistema local y la diáspora",
      industryMatrix: "Matriz Industria × Etapa",
      industryMatrixDesc: "Visualización de la intersección entre industrias y etapas de madurez",
      dataQuality: "Calidad e Integridad de los Datos",
      dataQualityDesc: "Análisis de la completitud y calidad del conjunto de datos",
    },
    // Insights
    insights: {
      industryDiversification: (count: number) =>
        `Las ${count} industrias representadas muestran diversificación en el ecosistema.`,
      earlyStage: "La mayoría de las startups están en etapas tempranas, lo que indica un ecosistema dinámico y en crecimiento.",
      founderModels: "La mayoría de las startups tienen un único fundador o co-fundadores, con ambos modelos ampliamente representados.",
      digitalPresence: "La presencia digital es clave; aquí mostramos qué porcentaje de startups tienen sitios web y perfiles en LinkedIn.",
      rdDiaspora: "El análisis RD vs Diáspora revela patrones de especialización y oportunidades de colaboración.",
    },
    // Dataset Overview
    dataset: {
      title: "Tamaño y Cobertura del Ecosistema",
      subtitle: (count: number) => `Análisis completo de ${count.toLocaleString()} startups en el ecosistema dominicano`,
      totalStartups: "Total de Startups",
      totalStartupsSource: "Agregado de múltiples fuentes",
      startupsInDR: "Startups en RD",
      ofTotal: "del ecosistema total",
      diaspora: "Diáspora",
      dataCoverage: "Cobertura de Datos",
      industry: "Industria",
      stage: "Etapa",
      website: "Sitio Web",
      ecosystemComposition: "Composición del Ecosistema",
      ecosystemCompositionText: (count: number) =>
        `Este conjunto de datos integra ${count.toLocaleString()} startups del ecosistema dominicano, incluyendo iniciativas locales y de la diáspora. Cada métrica refleja la disponibilidad de datos declarados, validados en múltiples fuentes.`,
    },
    // Industry Chart
    industryChart: {
      title: "Distribución por Industria",
      subtitle: "Clasificación de startups por sector industrial",
      limitedCoverage: "Cobertura Limitada",
      limitedCoverageText: (pct: number) =>
        `Solo el ${pct}% de las startups tienen información de industria declarada. Los gráficos requieren al menos 30% de cobertura para proporcionar información significativa.`,
      basedOn: (count: number, pct: number) =>
        `Basado en ${count.toLocaleString()} startups con datos de industria (${pct}% de cobertura)`,
      sectors: "sectores",
      topSectors: (n: number) => `Muestra los ${n} principales sectores por número de startups`,
    },
    // Stage Chart
    stageChart: {
      title: "Distribución por Etapa",
      subtitle: "Desglose de startups por etapa de desarrollo",
      limitedCoverage: "Cobertura Limitada",
      limitedCoverageText: (pct: number) =>
        `Solo el ${pct}% de las startups tienen información de etapa declarada. Los gráficos requieren al menos 30% de cobertura para proporcionar información significativa.`,
      basedOn: (count: number, pct: number) =>
        `Basado en ${count.toLocaleString()} startups con datos de etapa (${pct}% de cobertura)`,
      stages: "etapas",
      groupedByStage: "Startups agrupadas por etapa de desarrollo",
    },
    // Digital Presence
    digitalPresence: {
      title: "Presencia Digital",
      subtitle: (count: number) => `Métricas de visibilidad en línea de las ${count.toLocaleString()} startups`,
      websitePresence: "Presencia Web",
      websiteAvailable: "Sitio web disponible",
      coverage: "cobertura",
      linkedinPresence: "Presencia en LinkedIn",
      linkedinProfile: "Perfil de empresa",
      websiteCount: (with_: number, total: number) =>
        `${with_.toLocaleString()} de ${total.toLocaleString()} startups tienen un sitio web declarado`,
      linkedinCount: (with_: number, total: number) =>
        `${with_.toLocaleString()} de ${total.toLocaleString()} startups tienen una página de LinkedIn`,
      summaryTitle: "Resumen de Presencia Digital",
      fullPresence: "Presencia Completa",
      fullPresenceDesc: "Sitio web y LinkedIn",
      partialPresence: "Presencia Parcial",
      partialPresenceDesc: "Sitio web o LinkedIn",
      noPresence: "Sin Presencia",
      noPresenceDesc: "Sin plataforma declarada",
      note: "Basado en datos CSV declarados. \"Presencia Digital\" indica visibilidad en línea, no calidad ni éxito empresarial.",
    },
    // Digital Maturity
    digitalMaturity: {
      title: "Índice de Madurez Digital",
      subtitle: (count: number) => `Combinaciones de visibilidad en línea de las ${count.toLocaleString()} startups`,
      bothPresent: "Ambos Presentes",
      bothDescription: "Sitio web + LinkedIn",
      websiteOnly: "Solo Sitio Web",
      websiteDescription: "Solo sitio web",
      linkedinOnly: "Solo LinkedIn",
      linkedinDescription: "Solo LinkedIn",
      noPresence: "Sin Presencia",
      noPresenceDescription: "Sin presencia digital",
      detailedBreakdown: "Desglose Detallado",
      coveragePct: (pct: number) => `${pct.toFixed(1)}% de cobertura`,
      note: "Índice de madurez digital basado en la presencia declarada de sitio web y LinkedIn. Mide la visibilidad en línea, no la efectividad empresarial.",
    },
    // Origin Comparison
    originComparison: {
      title: "RD vs Diáspora: Comparación",
      subtitle: "Análisis comparativo de startups en República Dominicana y la diáspora dominicana",
      dominicanRepublic: "República Dominicana",
      diaspora: "Diáspora",
      topIndustry: "Principal Industria",
      mostCommonStage: "Etapa más Común",
      webPresence: "Presencia Web",
      industryDistribution: "Distribución por Industria",
      industryDistributionDesc: "Las 8 principales industrias en ambas regiones",
      stageDistribution: "Distribución por Etapa",
      stageDistributionDesc: "Etapas de desarrollo de las startups",
      digitalPresenceComparison: "Comparación de Presencia Digital",
      digitalPresenceComparisonDesc: "Porcentaje de startups con presencia en línea",
      startups: "startups",
      numberOfStartups: "Número de startups",
      industry: "Industria",
      stage: "Etapa",
      note: "Esta comparación destaca diferencias estratégicas entre el ecosistema local (RD) e iniciativas de la diáspora dominicana.",
    },
    // Ecosystem Completeness
    ecosystemCompleteness: {
      title: "Completitud del Ecosistema",
      subtitle: "Disponibilidad de datos en campos clave, mostrando la calidad y exhaustividad de la cobertura",
      whatDoesItMean: "¿Qué significa este porcentaje?",
      explanation: "Cada porcentaje indica la disponibilidad de datos para ese campo específico. No refleja la calidad del ecosistema, sino qué tan completa es nuestra cobertura de información. Valores más altos indican mejor documentación de las startups.",
      dataAvailability: "disponibilidad de datos",
      industryClassification: "Clasificación de Industria",
      developmentStage: "Etapa de Desarrollo",
      websiteInformation: "Información de Sitio Web",
      linkedinPresence: "Presencia en LinkedIn",
      complete: "Completo",
      completeDesc: "70% o más",
      partial: "Parcial",
      partialDesc: "30–70%",
      limited: "Limitado",
      limitedDesc: "Menos del 30%",
      fullCoverage: "✓ Cobertura completa (70%+)",
      sufficientCoverage: "⚠ Cobertura suficiente (30-70%)",
      limitedData: "✗ Datos limitados (<30%)",
      footerNote: "Todos los porcentajes reflejan datos declarados de las startups. Los valores faltantes se registran y documentan dentro del marco analítico, garantizando transparencia y rigor metodológico.",
    },
    // Founder Structure
    founderStructure: {
      title: "Estructura de Fundadores",
      subtitle: (count: number) => `Patrones de formación de equipos entre ${count.toLocaleString()} startups`,
      soloFounder: "Fundador Único",
      twoFounders: "Dos Fundadores",
      noData: "Sin Datos",
      ofTotal: "% del total",
      note: "Los datos de fundadores se extraen únicamente de información declarada. La categoría \"Sin Datos\" indica startups sin información de fundadores disponible.",
    },
    // Industry Stage Heatmap
    heatmap: {
      title: "Matriz Industria × Etapa",
      subtitle: "Densidad de startups por industria y etapa de madurez",
      matrixUnavailable: "Matriz No Disponible",
      matrixUnavailableText: (indPct: number, stagePct: number) =>
        `Esta vista requiere datos de industria (${indPct}%) y datos de etapa (${stagePct}%) con al menos 30% de cobertura cada uno.`,
      concentration: (count: number) => `Concentración de startups por industria y etapa de desarrollo`,
      startups: "startups",
      heatIntensity: "Intensidad del Mapa de Calor",
      lowHigh: "Baja → Alta concentración",
      startup: "startup",
      note: "La matriz muestra la intersección entre industrias y etapas de desarrollo. Los colores más oscuros indican mayor concentración de startups en esa combinación.",
    },
    // Data Logs
    dataLogs: {
      title: "Registros de Procesamiento de Datos",
      subtitle: "Informe de transparencia que muestra cómo se procesaron y validaron los archivos CSV",
      csvRows: "Filas CSV",
      totalRowsProcessed: "Total de filas procesadas",
      valid: "Válidas",
      accepted: "aceptadas",
      discarded: "Descartadas",
      rejected: "rechazadas",
      showLogs: "Ver registros detallados",
      hideLogs: "Ocultar registros detallados",
      totalRows: "Total de Filas",
      validStartups: "Startups Válidas",
      discardReasons: "Razones de Descarte",
      andMore: (n: number) => `... y ${n} razones más`,
      note: "Este registro documenta cada etapa del procesamiento de datos, garantizando total transparencia en la validación de startups. Las filas descartadas se registran para fines de auditoría.",
    },
    // Startups Explorer
    explorer: {
      title: "Ver Startups Mapeadas",
      subtitle: (total: number, filtered: number) => `${total} startups • ${filtered} coincidencias`,
      searchPlaceholder: "Buscar por nombre, descripción o industria...",
      noResults: "No se encontraron startups que coincidan con la búsqueda",
      noDescription: "Sin descripción disponible",
      showing: (filtered: number, total: number) => `Mostrando ${filtered} de ${total} startups`,
    },
    // Startup Directory
    directory: {
      title: "Directorio de Startups",
      subtitle: "Explora todas las startups del ecosistema dominicano y la diáspora",
      searchPlaceholder: "Buscar por nombre, descripción o industria...",
      noResults: (query: string) => `No se encontraron startups que coincidan con "${query}"`,
      showing: (filtered: number, total: number) => `Mostrando ${filtered} de ${total} startups`,
      noDescription: "Sin descripción disponible",
    },
    // Footer
    footer: {
      brand: "Plataforma Boost Analytics",
      tagline: "Diseñado para insights ejecutivos",
      description: "Datos verificados • Análisis riguroso • Transparencia total",
      copyright: "© Todos los derechos reservados para Boost Acceleration Camp",
    },
    // Last Updated
    lastUpdated: {
      label: "Última Actualización",
    },
    // Language toggle
    langToggle: {
      switchTo: "EN",
    },
  },
}

type TranslationKey = keyof typeof translations.en

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: typeof translations.en
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("es")
  const t = translations[lang]
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
