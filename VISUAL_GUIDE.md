# Guía Visual - Boost Analytics Platform

## 🎨 Sistema de Diseño Profesional

### Colores Corporativos Boost

**Paleta Principal:**
- **Azul Primario**: `#2596be` - Confianza, profesionalismo
- **Verde Secundario**: `#84be64` - Crecimiento, éxito
- **Azul Oscuro**: `#1a7fa0` - Profundidad
- **Verde Oscuro**: `#5a9845` - Estabilidad

**Paleta Complementaria:**
- Gris Oscuro: `#1f2937` - Textos principales
- Gris Medio: `#6b7280` - Textos secundarios
- Gris Claro: `#e5e7eb` - Bordes y divisiones

### Gradientes Profesionales

```css
/* Header gradient */
background: linear-gradient(to right, #2596be, #84be64);

/* Card hover effect */
background: linear-gradient(135deg, #2596be 0%, #1a7fa0 100%);

/* Progress bars */
background: linear-gradient(to right, #84be64, #6bc65f);
```

## 📐 Tipografía y Jerarquía

### Tamaños de Título
- **Título Principal (H1)**: `text-3xl font-bold` - 1920px
- **Subtítulo (H2)**: `text-2xl font-bold` - Secciones
- **Encabezado Subsección (H3)**: `text-xl font-bold` - Elementos clave
- **Texto Base**: `text-sm/base` - Contenido
- **Pequeño**: `text-xs` - Etiquetas, metadata

### Espaciado Vertical

```
Componente → Separador (my-20) → Siguiente Componente
  ↓
  48px de espacio

Sección → Siguiente Sección
  ↓
  80px de espacio (my-20 en Separator)
```

## 🎯 Componentes Visuales

### Header (Sticky Navigation)
- Logo Boost con gradiente
- Titulo "Startup Ecosystem"
- Status badge animado en verde
- Mantiene branding visible mientras scroll

### Cards
- Borde: 1px gris #e5e7eb
- Border-radius: 12px (rounded-xl)
- Sombra suave hover
- Transición: 300ms cubic-bezier
- Padding: 28px (p-7)

### Buttons & CTAs
- Rounded: 8px
- Padding: 12px 16px
- Transición suave on hover
- Elevación en hover: -4px transform
- Box-shadow: rgba(37, 150, 190, 0.15)

### Progress Bars
- Height: 16px (h-4)
- Border-radius: 9999px
- Gradiente de color según tipo
- Shadow interior en fondo
- Animación: 1000ms ease-out

### Tooltips & Info Boxes
- Fondo: Blanco (#ffffff)
- Borde: 2px color marca
- Border-radius: 12px
- Padding: 12px
- Sombra: 0 10px 40px rgba(color, 0.15)

### Badges/Labels
- Background: Gradient fade 10% opacity
- Border: 1px color marca 20% opacity
- Text: color marca, font-semibold
- Padding: 8px 12px
- Border-radius: 9999px

## ✨ Micro-interacciones

### Transiciones de Hover
```css
/* Cards */
transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

/* Buttons */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Links */
transition: opacity 0.2s ease-out;
```

### Animaciones
- **Fade In**: 600ms ease-out on page load
- **Pulse**: Subtle pulse en badges activos
- **Elevation**: Lift on hover (+4px -translateY)

### Estados Interactivos
- **Hover**: Elevación + sombra amplificada
- **Active**: Color más saturado
- **Disabled**: Opacidad 50% + no pointer
- **Loading**: Pulse animation

## 📊 Gráficos

### Paleta de Colores para Barras
- Industria 1-11: Colores específicos por sector
- Diáspora: Verde (#84be64)
- RD: Azul (#2596be)

### Estilos Recharts
- **Bar radius**: 8px top corners
- **Tooltip border**: 2px marca color
- **Grid**: Gris 20% opacity
- **Animation**: 1200ms ease-out

### Heatmap
- Gradiente: Azul claro → Azul oscuro
- Intensidad basada en valor normalizado
- Bordes: 2px gris on hover

## 🎭 Paleta por Sección

| Sección | Color Principal | Color Secundario | Uso |
|---------|-----------------|-----------------|-----|
| Industria | #2596be | #3ba8ce | Gráficos de industria |
| Etapa | #84be64 | #6bc65f | Gráficos de etapa |
| Fundadores | #2596be | #84be64 | Pie charts |
| Presencia Digital | #2596be | #84be64 | Cards y métricas |
| Comparación | RD: #2596be | Diáspora: #84be64 | Side-by-side |
| Heatmap | Gradiente azul | N/A | Intensidad |
| Integridad | Verde/Amarillo/Rojo | N/A | Estado |

## 📱 Responsive

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Ajustes
- Padding: 16px mobile, 24px tablet, 32px desktop
- Título: text-2xl mobile → text-3xl desktop
- Grid: 1 col mobile → 2-4 cols desktop

## 🔍 Proporciones Visuales

### Card Spacing
- Gap entre cards: 24px (gap-6)
- Padding interno: 28px (p-7)
- Margin inferior sección: 80px (my-20)

### Chart Heights
- Industry: 480px
- Stage: 400px
- Heatmap: Variable según datos
- Horizontal: 300px

## ♿ Accesibilidad

- Contraste WCAG AA minimo
- Texto alternativo en iconos
- Focus states visibles (outline-ring/50)
- Transiciones: máximo 300ms (no nauseante)
- Color nunca único para comunicar info

## 🎬 Flujo Visual Sugerido

1. **Header Sticky** - Orienta usuario
2. **Intro Cards** - Contexto rápido
3. **Key Metrics** - DatasetOverview
4. **Main Charts** - Industria, Etapa, Fundadores
5. **Insights** - InsightBox cards
6. **Comparativa** - RD vs Diáspora
7. **Matriz** - Industria × Etapa
8. **Data Quality** - Integridad
9. **Footer** - Last Updated + Branding

---

**Nota**: Todos los componentes mantienen padding y spacing consistentes para crear una experiencia visual limpia y profesional lista para presentaciones ejecutivas.
