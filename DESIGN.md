# Design System — Michalina's Veterinary Blog (Redesigned)

Bold, modern minimalism with playful personality. 2026 trending palette: electric brights with dark mode sophistication.

## 1. Visual Theme & Atmosphere

This is a **confident, energetic, forward-thinking** veterinary blog. Playful without being childish. Bold without being aggressive. Dark mode foundation with electric accents that pop. Modern, high-contrast, vibrant.

Think: high-energy vet clinic with personality. Clean lines. Confident typography. Colors that *move*.

**Key Characteristics:**
- **Font Stack**: Geist (modern, playful sans-serif, Google Fonts)  
  + Outfit (bold display headlines, geometric energy)
- **Geist** for body and secondary headings — contemporary, friendly, highly legible
- **Outfit** for primary headings — geometric, bold, trendy 2024–2026 energy
- **Dark Mode First**: `#0A0E27` (almost-black background) — sophisticated, modern, reduces eye strain
- **Electric Primary**: `#00D9FF` (cyan, electric aqua) — CTAs, links, focus, accent elements
- **Neon Secondary**: `#FF006E` (hot pink/magenta) — complementary accent, hover states, decorative
- **Accent Tertiary**: `#FFBE0B` (electric yellow) — highlights, tags, warnings
- **Surface Light**: `#1A1E3F` (dark navy, raised surfaces) — cards, containers
- **Text Bright**: `#F5F7FA` (near-white, cool tone) — primary reading text
- **Text Secondary**: `#B8BED1` (cool gray) — secondary info, descriptions
- **Ultra-clean borders**: `1px solid rgba(0,217,255,0.15)` — subtle electric glow
- **Neon shadows**: Low-opacity colored shadows with cyan tint for depth
- **4px base spacing unit**

## 2. Color Palette & Roles

### Primary
- **Text Bright** (`#F5F7FA`): Primary text, headings, body copy. Cool white, not harsh.
- **Background Dark** (`#0A0E27`): Page background. Deep, dark, modern.
- **Cyan/Electric** (`#00D9FF`): Primary accent — CTA buttons, links, focus ring, active elements. Pops on dark.

### Brand Secondary & Tertiary
- **Neon Pink/Magenta** (`#FF006E`): Hot accent — hover states, decorative, secondary CTAs.
- **Electric Yellow** (`#FFBE0B`): Warm accent — tags, badges, highlights.
- **Cyan Dark** (`#00A8CC`): Darker cyan variant for button hover/active states.

### Neutral Scale (Cool)
- **Background Dark** (`#0A0E27`): Page background, deep black.
- **Surface Light** (`#1A1E3F`): Card fills, raised surfaces, alternate sections.
- **Surface Medium** (`#252D4A`): Secondary card backgrounds, containers.
- **Text Bright** (`#F5F7FA`): Primary text.
- **Text Secondary** (`#B8BED1`): Secondary text, descriptions, muted labels.
- **Text Muted** (`#7A8399`): Disabled states, captions, very secondary info.
- **Border Subtle** (`rgba(0,217,255,0.15)`): Whisper borders with cyan tint.
- **Border Strong** (`rgba(0,217,255,0.25)`): Emphasized borders, dividers.

### Semantic Accents
- **Success** (`#00D9FF`): Cyan — confirmations, success indicators.
- **Warning** (`#FFBE0B`): Electric yellow — warnings, attention indicators.
- **Error** (`#FF006E`): Neon pink — errors, critical alerts.
- **Info** (`#00D9FF`): Cyan — informational states.

### Interactive
- **Link** (`#00D9FF`): Link color — cyan with subtle underline on hover.
- **Link Hover** (`#00A8CC`): Darker cyan for hover state.
- **Focus Ring** (`#00D9FF`): 2px solid focus, high contrast on dark background.
- **Badge Cyan Bg** (`rgba(0,217,255,0.15)`): Pill badge background — cyan tint.
- **Badge Cyan Text** (`#00D9FF`): Pill badge text — bright cyan.
- **Badge Pink Bg** (`rgba(255,0,110,0.15)`): Pink badge background.
- **Badge Pink Text** (`#FF006E`): Pink badge text.
- **Badge Yellow Bg** (`rgba(255,190,11,0.15)`): Yellow badge background.
- **Badge Yellow Text** (`#FFBE0B`): Yellow badge text.

### Shadows & Depth
- **Card Shadow** (`0px 8px 24px rgba(0,217,255,0.08), 0px 2px 8px rgba(0,217,255,0.04)`): Card elevation — subtle cyan glow.
- **Deep Shadow** (`0px 20px 48px rgba(0,217,255,0.12), 0px 8px 20px rgba(0,217,255,0.06)`): Modals, featured content — stronger glow.
- **Neon Glow** (optional): `0px 0px 20px rgba(255,0,110,0.15)` — pink glow on hover for special elements.
- **Border** (`1px solid rgba(0,217,255,0.15)`): Default dividers, card outlines.

## 3. Typography Rules

### Font Family
- **Primary Headings (H1, H2)**: `Outfit`, fallback: `system-ui, -apple-system, sans-serif` — Google Fonts, geometric, bold, 2026 energy.
- **Secondary Headings (H3, H4)**: `Geist`, fallback: `system-ui, -apple-system, sans-serif` — Google Fonts, clean, modern, friendly.
- **Body**: `Geist`, fallback: `system-ui, -apple-system, sans-serif` — warm sans-serif, highly readable.
- **Monospace**: `JetBrains Mono` or `Courier New` — code blocks, technical text.

### Loading (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | Outfit | 64px (4.00rem) | 800 | 1.05 | -1.2px | Main page headline, bold impact |
| Display Secondary | Outfit | 48px (3.00rem) | 700 | 1.10 | -0.8px | Hero sub-headlines |
| Section Heading | Outfit | 40px (2.5rem) | 700 | 1.15 | -0.6px | Section titles, major headings |
| Sub-heading Large | Geist | 28px (1.75rem) | 600 | 1.25 | -0.25px | Sub-sections, card headers |
| Sub-heading | Geist | 24px (1.5rem) | 600 | 1.30 | normal | H3, content headers |
| Card Title | Geist | 20px (1.25rem) | 600 | 1.35 | normal | Blog post card titles |
| Body Large | Geist | 18px (1.125rem) | 400 | 1.60 | normal | Leads, intro paragraphs |
| Body | Geist | 16px (1.00rem) | 400 | 1.65 | normal | Standard reading text |
| Body Medium | Geist | 16px (1.00rem) | 500 | 1.65 | normal | Nav links, UI labels |
| Body Semibold | Geist | 16px (1.00rem) | 600 | 1.65 | normal | Strong labels, emphasis |
| Nav / Button | Geist | 15px (0.9375rem) | 600 | 1.40 | 0.02em | Navigation, button text |
| Caption | Geist | 14px (0.875rem) | 500 | 1.50 | normal | Metadata, dates, labels |
| Caption Light | Geist | 14px (0.875rem) | 400 | 1.50 | normal | Descriptions, secondary |
| Badge | Geist | 12px (0.75rem) | 600 | 1.33 | 0.05em | Tags, categories, status |
| Micro Label | Geist | 11px (0.6875rem) | 500 | 1.33 | 0.05em | Timestamps, meta |

### Principles
- **Bold Headlines**: Outfit is geometric, futuristic, confident — gives the blog personality and energy
- **Readable Body**: Geist is modern but warm — perfect for long-form veterinary content
- **High Contrast**: Dark background + bright text = strong legibility and modern feel
- **Generous spacing**: Line-height 1.60–1.65 for body — airy, contemporary feel
- **Weight hierarchy**: Use Outfit's weight 800 for impact, Geist's 600 for emphasis, 400 for reading

## 4. Component Stylings

### Buttons

**Primary (Cyan Electric)**
- Background: `#00D9FF`
- Text: `#0A0E27`
- Padding: 12px 24px
- Radius: 8px
- Border: `1px solid transparent`
- Font: Geist 15px weight 600
- Hover: background `#00A8CC`, text stays dark
- Active: scale(0.96) transform
- Focus: `2px solid #00D9FF`, offset 3px, subtle glow
- Use: Primary CTA ("Read article", "Subscribe", "Learn More")

**Secondary (Neon Pink)**
- Background: `transparent`
- Text: `#FF006E`
- Border: `2px solid #FF006E`
- Padding: 10px 22px
- Radius: 8px
- Hover: background `rgba(255,0,110,0.15)`, text `#FF006E`
- Active: scale(0.96)
- Use: Secondary actions, alt CTAs

**Tertiary (Ghost)**
- Background: `transparent`
- Text: `#F5F7FA`
- Border: `1px solid rgba(0,217,255,0.25)`
- Padding: 10px 20px
- Radius: 8px
- Hover: background `rgba(0,217,255,0.1)`, border color `#00D9FF`
- Use: Tertiary actions, inline links

**Pill Badge / Tag**
- Background: `rgba(0,217,255,0.15)` (cyan), `rgba(255,0,110,0.15)` (pink), or `rgba(255,190,11,0.15)` (yellow)
- Text: `#00D9FF`, `#FF006E`, or `#FFBE0B` respectively
- Padding: 6px 14px
- Radius: 9999px
- Font: Geist 12px weight 600, letter-spacing 0.05em
- Use: Post categories, tags, status indicators
- Hover: subtle background intensification

### Cards & Containers
- Background: `#1A1E3F` (surface light)
- Border: `1px solid rgba(0,217,255,0.15)`
- Radius: 12px (standard cards), 16px (featured)
- Shadow: Card Shadow (soft cyan glow)
- Hover: shadow intensification + subtle cyan border glow + translateY(-2px)
- Image area: `12px 12px 0 0` border-radius on top

### Inputs & Forms
- Background: `#252D4A` (surface medium)
- Text: `#F5F7FA`
- Border: `1px solid rgba(0,217,255,0.15)`
- Padding: 12px 16px
- Radius: 8px
- Focus: `2px solid #00D9FF` outline + glow effect
- Placeholder: `#7A8399`
- Transition: all 200ms for smooth focus states

### Navigation
- Background: `#0A0E27` (dark background) or `rgba(10,14,39,0.9)` if floating
- Logo: Outfit 24px weight 800, color `#00D9FF`
- Links: Geist 15px weight 600, `#F5F7FA`, hover color `#00D9FF`
- CTA: cyan pill button or outlined button, right-aligned
- Sticky with `backdrop-filter: blur(12px)` + subtle border-bottom `rgba(0,217,255,0.1)`
- Mobile: hamburger collapse
- Active nav link: `#00D9FF` text color + underline

### Article Typography (Blog Post)
- Article headings: Outfit (primary) or Geist (secondary)
- Article body: Geist 16px, line-height 1.70 (breathing room for long reading)
- Optional drop cap on first paragraph: Outfit, 3-line, cyan color
- Blockquote: Geist italic, border-left 4px solid `#FF006E`, padding-left 20px, color `#B8BED1`, background `rgba(255,0,110,0.08)`
- Inline code: background `#252D4A`, border `1px solid rgba(0,217,255,0.15)`, color `#00D9FF`, border-radius 4px, monospace font
- Code block: background `#0A0E27`, border `1px solid rgba(0,217,255,0.2)`, padding 16px, border-radius 8px, overflow-x auto

### Image Treatment
- Animal photos: border-radius 12px, border `1px solid rgba(0,217,255,0.15)`
- Hero image: full-width with `object-fit: cover`, subtle glow on hover
- Card thumbnails: aspect-ratio 16/9 or 4/3, border-radius 8px top
- Alt text: always required for accessibility

## 5. Layout Principles

### Spacing System
- Base: 4px (tighter, more modern)
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px
- Modern, tech-forward spacing — more compact than warm minimalism

### Grid & Container
- Max content width: 1200px (modern, expansive blog feel)
- Article max-width: 768px (optimal for reading, slightly wider)
- Hero: full-viewport or 100vh with overlay, centered
- Card grid: 3 columns → 2 → 1 on mobile, 20px gap (modern)
- Optional sidebar: 2/3 content + 1/3 sidebar layout
- Generous horizontal padding on mobile: 16px

### Whitespace Philosophy
- **Bold vertical rhythm**: 80–120px between major sections (spacious)
- **Dark alternation**: sections on `#0A0E27` alternate with `#1A1E3F` raised cards
- **Article breathing**: article has its own max-width 768px and generous line-height 1.70
- **Section spacing**: section headings 16px from sub-headline, 40px from content
- **Modern aesthetic**: lots of negative space, not cramped

### Border Radius Scale
- Micro (4px): Small UI elements, inputs
- Subtle (6px): Button alternatives
- Standard (8px): Buttons, inputs, small cards
- Comfortable (12px): Article cards, images, standard containers
- Large (16px): Featured cards, modals, hero elements
- Full Pill (9999px): Tags, categories, status badges
- Circle (100%): Avatars, circular images

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, no border | Page background, text blocks |
| Whisper (1) | `1px solid rgba(0,217,255,0.15)` | Standard card outlines |
| Soft Card (2) | `0px 8px 24px rgba(0,217,255,0.08)` | Article cards, containers |
| Deep Card (3) | `0px 20px 48px rgba(0,217,255,0.12)` | Featured content, modals |
| Neon Glow (Special) | `0px 0px 20px rgba(255,0,110,0.15)` | Hover on accent elements |
| Focus (A11y) | `2px solid #00D9FF` outline | Keyboard focus on all interactive elements |

**Shadow Philosophy**: Shadows use cyan-tinted rgba for a cohesive, modern electric glow. Low opacity, multi-layered, creates subtle depth without heaviness. Optional pink glow for hover states adds playful energy.

## 7. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile S | <380px | Tight single column, 16px padding |
| Mobile | 380–640px | Standard mobile, stacked layout, compact spacing |
| Tablet | 640–1024px | 2-column card grid, 20px padding |
| Desktop | 1024–1280px | Full layout, optional sidebar, generous padding |
| Wide | >1280px | Centered, maximum width 1200px, spacious margins |

### Touch Targets
- Buttons: min 48px height (WCAG 2.5.5 + modern standard)
- Navigation links: adequate padding for thumb-friendly interaction
- Tags/badges: 12px vertical, 14px horizontal padding
- Cards: min 54px clickable height

### Collapsing Strategy
- Hero: 64px → 48px → 36px on mobile, proportional letter-spacing
- Nav: horizontal links → hamburger (mobile)
- Cards: 3-col → 2-col → 1-col
- Article: max-width 768px → full width with 16px padding
- Section spacing: 100px → 60px on tablet → 40px on mobile
- Font sizes: subtle reduction on mobile (max 6% scale down)

## 8. Accessibility & States

### Focus System
- All interactive elements receive a visible focus indicator
- Focus: `2px solid #00D9FF` + `outline-offset: 3px`
- Full keyboard navigation support
- Tab order: logical, left-to-right, top-to-bottom
- Contrast: `#F5F7FA` on `#0A0E27` → ~14:1 (WCAG AAA+)

### Color Contrast Ratios
- Primary text `#F5F7FA` on `#0A0E27`: ~14:1 (WCAG AAA+)
- Secondary `#B8BED1` on `#0A0E27`: ~8.5:1 (WCAG AAA)
- Cyan `#00D9FF` on `#1A1E3F`: ~7.2:1 (WCAG AA+, passes for all text)
- Pink `#FF006E` on `#1A1E3F`: ~5.8:1 (WCAG AA for large text / UI)
- Badge text `#00D9FF` on `rgba(0,217,255,0.15)` (dark): ~6.5:1 (WCAG AA)
- Yellow `#FFBE0B` on dark: ~8:1 (excellent contrast)

### Interactive States
- **Default**: Standard appearance, subtle border
- **Hover**: Color shift to cyan/pink, shadow intensification, slight elevation (translateY)
- **Active**: scale(0.96), darker background tint
- **Focus**: Cyan outline + glow effect, clearly visible
- **Disabled**: `#7A8399` text, opacity 0.5, cursor not-allowed
- **Loading**: Spinner animation using cyan + pink gradient

## 9. Agent Prompt Guide

### Quick Color Reference
```
Background:       #0A0E27  (deep dark)
Surface Light:    #1A1E3F  (card/container fill)
Surface Medium:   #252D4A  (alternate fill)
Text Bright:      #F5F7FA  (primary text)
Text Secondary:   #B8BED1  (secondary text)
Text Muted:       #7A8399  (disabled/meta)
Primary Accent:   #00D9FF  (cyan — CTA, links, focus) ✨
Accent Hover:     #00A8CC  (darker cyan)
Secondary Accent: #FF006E  (neon pink — decorative, hover)
Tertiary Accent:  #FFBE0B  (electric yellow — tags, warnings)
Border:           1px solid rgba(0,217,255,0.15)
Heading Font:     Outfit (bold, geometric, modern)
Body Font:        Geist (clean, friendly, readable)
```

### Example Component Prompts
- "Hero section on dark background `#0A0E27`. Headline 64px Outfit weight 800, line-height 1.05, letter-spacing -1.2px, color `#F5F7FA`. Subheadline 20px Geist weight 500, color `#B8BED1`. CTA button: cyan `#00D9FF`, dark text, radius 8px, padding 12px 24px, weight 600."
- "Blog post card: `#1A1E3F` background, `1px solid rgba(0,217,255,0.15)` border, radius 12px, cyan glow shadow. Title 20px Geist weight 600, `#F5F7FA`. Meta (date, category) Geist 14px weight 400, `#B8BED1`. Tag pill: cyan tint bg `rgba(0,217,255,0.15)`, cyan text `#00D9FF`, 9999px radius, Geist 12px weight 600."
- "Navigation: dark background `#0A0E27`, sticky, backdrop-blur 12px. Logo Outfit 24px weight 800, cyan `#00D9FF`. Links Geist 15px weight 600, `#F5F7FA`, hover `#00D9FF`. CTA cyan button right-aligned."
- "Blockquote: Geist 16px italic, color `#B8BED1`, border-left 4px solid `#FF006E`, padding-left 20px, background `rgba(255,0,110,0.08)`, margin 32px 0."
- "Card grid section: `#1A1E3F` cards on `#0A0E27` background. 3-column grid, 20px gap. Section vertical padding 100px."
- "Input field: `#252D4A` background, `#F5F7FA` text, `1px solid rgba(0,217,255,0.15)` border, 12px 16px padding, radius 8px. Focus: `2px solid #00D9FF` outline with glow."

### Iteration Guide
1. Use `#0A0E27` as page background — dark, modern, sophisticated
2. Outfit on ALL primary headings — bold, geometric, 2026 energy
3. Geist on all body and secondary headings — clean, modern, readable
4. Cyan (`#00D9FF`) is the primary accent — pops on dark, high energy
5. Pink (`#FF006E`) and yellow (`#FFBE0B`) are decorative — hover states, tags, secondary accents
6. Borders use cyan tint: `rgba(0,217,255,0.15)` — cohesive, not harsh
7. Shadows are cyan-tinted, low opacity — modern, subtle depth
8. High contrast is key — bright text on dark = legibility + modern aesthetic
9. Spacing is tighter & more modern than warm minimalism — 4px base unit

## 10. Component Library (shadcn/ui)

shadcn/ui provides the component foundation. All components live in `src/components/ui/` and are fully customized to use this design system's tokens.

### Installed Components

| Component | File | Usage |
|-----------|------|-------|
| `Button` | `ui/button.tsx` | CTAs and actions. Variants: `default` (cyan), `secondary` (pink outline), `tertiary` (ghost), `outline` |
| `Badge` | `ui/badge.tsx` | Category tags, status pills. Variants: `cyan`, `pink`, `yellow` |
| `Card` | `ui/card.tsx` | Content containers. Sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `Sheet` | `ui/sheet.tsx` | Slide-in drawer panel (mobile nav). Sides: `top`, `bottom`, `left`, `right` |
| `Separator` | `ui/separator.tsx` | Horizontal/vertical dividers with cyan tint |

### Design Token Mapping

Components use Tailwind tokens directly:

```
Button default      →  bg-cyan + text-dark, hover:bg-cyan-dark
Button secondary    →  border-pink + text-pink, hover:bg-pink-light
Badge cyan          →  bg-cyan-light + text-cyan
Badge pink          →  bg-pink-light + text-pink
Badge yellow        →  bg-yellow-light + text-yellow
Card                →  bg-surface-light + border-cyan-whisper + shadow-card-cyan
Sheet panel         →  bg-dark + shadow-deep-cyan
Separator           →  bg-cyan-whisper (h-px)
Focus ring          →  ring-cyan (all interactive elements)
```

### `cn()` Utility

`src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge). Use it in all React components:
```ts
import { cn } from '@/lib/utils';
cn('base-class', condition && 'conditional-class', props.className)
```

### Adding New Components

Copy from [ui.shadcn.com](https://ui.shadcn.com):
```bash
npx shadcn@latest add <component>
```
Replace all default CSS variable references with this design system's tokens:
- `bg-background` → `bg-dark` (`#0A0E27`)
- `text-foreground` → `text-bright` (`#F5F7FA`)
- `bg-primary` → `bg-cyan` (`#00D9FF`)
- `bg-secondary` → `bg-pink` (`#FF006E`) or `bg-yellow` (`#FFBE0B`)
- `border-border` → `border-cyan-whisper` (`rgba(0,217,255,0.15)`)
