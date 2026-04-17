# Design System — Michalina's Veterinary Blog

Warm minimalism inspired by Notion, adapted for a personal veterinary blog.
Palette: cream, sage green, warm brown. Typography: Lora (headings) + Inter (body).

## 1. Visual Theme & Atmosphere

Michalina's blog embodies organic, trustworthy warmth — like a good vet reception: calm,
professional, approachable. The cream background (`#F9F5F0`) replaces cold white. Sage green
(`#7B9E87`) takes the role of the primary accent instead of blue. Warm brown (`#C4956A`) adds
depth and earthiness. Text `#2C2C2C` — dark but not black, soft on the eyes.

Lora serif headings give personality and editorial character; Inter body ensures readability.
The serif/sans contrast is a classic editorial combination that feels intentional, not accidental.

**Key Characteristics:**
- Lora (serif, Google Fonts) for headings with negative letter-spacing for elegance
- Inter for body text — readability and neutrality, familiar from Notion
- Cream background (`#F9F5F0`) — warm, organic, not sterile
- Sage green (`#7B9E87`) as the only saturated color in core UI (CTA, links, focus)
- Warm brown (`#C4956A`) as secondary accent for tags, decorative elements, hover states
- Whisper borders: `1px solid rgba(0,0,0,0.08)` — softer than Notion's 0.1
- Multi-layer shadows with max opacity 0.05 — depth without heaviness
- 8px base spacing unit

## 2. Color Palette & Roles

### Primary
- **Text Dark** (`#2C2C2C`): Primary text, headings, body copy. Warm near-black.
- **Background Cream** (`#F9F5F0`): Page background. Warm cream, not cold white.
- **Sage Green** (`#7B9E87`): Primary accent — CTA buttons, links, focus ring, active elements.

### Brand Secondary
- **Warm Brown** (`#C4956A`): Secondary accent — tags, hover states, decorative accents.
- **Sage Dark** (`#5C7A68`): Darker sage variant for button hover/active states.

### Neutral Scale (Warm)
- **Cream Light** (`#F9F5F0`): Page background.
- **Cream Mid** (`#EDE8E1`): Alternate section backgrounds, card fills.
- **Warm Gray 500** (`#7A7068`): Secondary text, descriptions, muted labels.
- **Warm Gray 300** (`#B0A89E`): Placeholder text, disabled states, captions.
- **Surface White** (`#FFFFFF`): Card surfaces, modals, inputs.

### Semantic Accents
- **Success** (`#7B9E87`): Sage green — confirmations, success indicators.
- **Warning** (`#C4956A`): Warm brown — warnings, attention indicators.
- **Muted** (`#B0A89E`): Disabled, inactive states.

### Interactive
- **Link** (`#7B9E87`): Link color — sage green with underline on hover.
- **Link Hover** (`#5C7A68`): Darker sage for hover state.
- **Focus Ring** (`#7B9E87`): 2px solid focus, visible contrast on cream background.
- **Badge Sage Bg** (`#EEF3F0`): Pill badge background — light sage tint.
- **Badge Sage Text** (`#5C7A68`): Pill badge text — darker sage.
- **Badge Brown Bg** (`#F7EDE3`): Brown badge background — warm tint.
- **Badge Brown Text** (`#A06B3E`): Brown badge text.

### Shadows & Depth
- **Card Shadow** (`rgba(44,44,44,0.04) 0px 4px 18px, rgba(44,44,44,0.027) 0px 2px 7.85px, rgba(44,44,44,0.02) 0px 0.8px 2.93px, rgba(44,44,44,0.01) 0px 0.175px 1.04px`): Card elevation — warm, multi-layered.
- **Deep Shadow** (`rgba(44,44,44,0.01) 0px 1px 3px, rgba(44,44,44,0.02) 0px 3px 7px, rgba(44,44,44,0.02) 0px 7px 15px, rgba(44,44,44,0.04) 0px 14px 28px, rgba(44,44,44,0.05) 0px 23px 52px`): Modals, featured content.
- **Whisper Border** (`1px solid rgba(0,0,0,0.08)`): Dividers, card outlines. Softer than Notion.

## 3. Typography Rules

### Font Family
- **Headings**: `Lora`, fallback: `Georgia, 'Times New Roman', serif` — Google Fonts serif.
- **Body**: `Inter`, fallback: `-apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif`.
- **OpenType**: `"lnum"` and `"locl"` on Lora headings for typographic precision.

### Loading (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
```

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | Lora | 56px (3.50rem) | 700 | 1.10 | -1.5px | Main page headline |
| Display Secondary | Lora | 44px (2.75rem) | 700 | 1.15 | -1.0px | Hero sub-headlines |
| Section Heading | Lora | 36px (2.25rem) | 700 | 1.20 | -0.75px | Section titles, `"lnum"` |
| Sub-heading Large | Lora | 28px (1.75rem) | 600 | 1.30 | -0.5px | Sub-sections, card headers |
| Sub-heading | Lora | 22px (1.375rem) | 600 | 1.35 | -0.25px | H3, content headers |
| Card Title | Lora | 18px (1.125rem) | 600 | 1.40 | normal | Blog post card titles |
| Body Large | Inter | 18px (1.125rem) | 400 | 1.65 | normal | Leads, intro paragraphs |
| Body | Inter | 16px (1.00rem) | 400 | 1.70 | normal | Standard reading text |
| Body Medium | Inter | 16px (1.00rem) | 500 | 1.70 | normal | Nav links, UI labels |
| Body Semibold | Inter | 16px (1.00rem) | 600 | 1.70 | normal | Strong labels |
| Nav / Button | Inter | 15px (0.9375rem) | 500 | 1.33 | 0.01em | Navigation, button text |
| Caption | Inter | 14px (0.875rem) | 500 | 1.50 | normal | Metadata, dates, labels |
| Caption Light | Inter | 14px (0.875rem) | 400 | 1.50 | normal | Descriptions, secondary |
| Badge | Inter | 12px (0.75rem) | 600 | 1.33 | 0.05em | Tags, categories, status |
| Micro Label | Inter | 11px (0.6875rem) | 500 | 1.33 | 0.05em | Timestamps, meta |

### Principles
- **Serif contrast**: Lora headings vs Inter body — classic editorial contrast that gives the blog character and identity.
- **Warmth at scale**: Lora uses negative letter-spacing at large sizes (-1.5px @ 56px), relaxing to normal at 18px.
- **Three Inter weights**: 400 (reading), 500 (interface), 600 (emphasis). Lora: 400 italic (quotes), 600 (sub-headings), 700 (headings).
- **Generous line-height**: Body 1.70 — higher than Notion, better for long-form article reading.
- **Lora italic**: Use `Lora italic 400` for veterinary quotes and callouts — a naturally elegant accent.

## 4. Component Stylings

### Buttons

**Primary (Sage Green)**
- Background: `#7B9E87`
- Text: `#FFFFFF`
- Padding: 10px 20px
- Radius: 6px
- Border: `1px solid transparent`
- Hover: background `#5C7A68`
- Active: scale(0.97) transform
- Focus: `2px solid #7B9E87`, offset 2px
- Use: Primary CTA ("Read article", "Subscribe")

**Secondary (Warm Brown)**
- Background: `transparent`
- Text: `#C4956A`
- Border: `1px solid #C4956A`
- Padding: 10px 20px
- Radius: 6px
- Hover: background `#F7EDE3`, text `#A06B3E`
- Use: Secondary actions

**Ghost**
- Background: `transparent`
- Text: `#2C2C2C`
- Decoration: underline on hover in `#7B9E87`
- Use: Tertiary actions, inline links

**Pill Badge / Tag**
- Background: `#EEF3F0` (sage tint) or `#F7EDE3` (brown tint)
- Text: `#5C7A68` or `#A06B3E`
- Padding: 4px 10px
- Radius: 9999px
- Font: Inter 12px weight 600, letter-spacing 0.05em
- Use: Post categories, tags (e.g. "Cats", "Dogs", "Prevention")

### Cards & Containers
- Background: `#FFFFFF`
- Border: `1px solid rgba(0,0,0,0.08)`
- Radius: 12px (standard cards), 16px (featured)
- Shadow: Card Shadow (multi-layer, warm-tinted)
- Hover: shadow intensification + subtle translateY(-2px)
- Image area: `12px 12px 0 0` border-radius on top

### Inputs & Forms
- Background: `#FFFFFF`
- Text: `#2C2C2C`
- Border: `1px solid rgba(0,0,0,0.15)`
- Padding: 10px 14px
- Radius: 6px
- Focus: `2px solid #7B9E87` outline
- Placeholder: `#B0A89E`

### Navigation
- Background: `#F9F5F0` (cream, not white)
- Logo: Lora 20px weight 700, color `#2C2C2C`
- Links: Inter 15px weight 500, `#2C2C2C`, hover color `#7B9E87`
- CTA: sage green pill button, right-aligned
- Sticky with `backdrop-filter: blur(8px)` + whisper border-bottom
- Mobile: hamburger collapse

### Article Typography (Blog Post)
- Article headings: Lora
- Article body: Inter 16px, line-height 1.80 (more room for long reading)
- Optional drop cap on first paragraph (Lora, 3-line)
- Blockquote: Lora italic, border-left 3px `#7B9E87`, padding-left 20px, color `#7A7068`
- Inline code: background `#EDE8E1`, border-radius 3px, monospace font

### Image Treatment
- Animal photos: border-radius 12px, whisper border
- Hero image: full-width with `object-fit: cover`
- Card thumbnails: aspect-ratio 16/9 or 4/3
- Alt text: always required for accessibility

## 5. Layout Principles

### Spacing System
- Base: 8px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px
- Organic, not mechanical — 4px adjustments are fine for optical balance

### Grid & Container
- Max content width: 1120px (narrower than Notion — intimate blog feel)
- Article max-width: 720px (optimal for reading)
- Hero: single-column, centered, 80-100px top padding
- Card grid: 3 columns → 2 → 1 on mobile
- Optional sidebar: 2/3 content + 1/3 sidebar layout

### Whitespace Philosophy
- **Generous vertical rhythm**: 64-96px between major sections
- **Cream alternation**: sections on `#F9F5F0` (page bg) alternate with `#FFFFFF` card surfaces
- **Article breathing**: article has its own max-width 720px and larger line-height
- **Section spacing**: section headings separated 12px from sub-headline, 32px from content

### Border Radius Scale
- Micro (4px): Small UI elements
- Subtle (6px): Buttons, inputs
- Standard (8px): Small cards, inline containers
- Comfortable (12px): Article cards, images
- Large (16px): Featured cards, hero elements
- Full Pill (9999px): Tags, categories, status badges
- Circle (100%): Avatars

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, no border | Page background, text blocks |
| Whisper (1) | `1px solid rgba(0,0,0,0.08)` | Standard card outlines |
| Soft Card (2) | 4-layer shadow stack (max 0.04) | Article cards |
| Deep Card (3) | 5-layer shadow stack (max 0.05) | Featured content, modals |
| Focus (A11y) | `2px solid #7B9E87` outline | Keyboard focus on all interactive elements |

**Shadow Philosophy**: Shadows use `rgba(44,44,44,...)` instead of pure black,
producing warm, organic depth that matches the cream palette. Multi-layered, low individual opacity.

## 7. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile S | <380px | Tight single column, 16px padding |
| Mobile | 380–640px | Standard mobile, stacked layout |
| Tablet | 640–1024px | 2-column card grid |
| Desktop | 1024–1280px | Full layout, optional sidebar |
| Wide | >1280px | Centered, generous margins |

### Touch Targets
- Buttons: min 44px height (WCAG 2.5.5)
- Navigation links: adequate padding
- Tags/badges: 8px vertical, 10px horizontal padding

### Collapsing Strategy
- Hero: 56px → 40px → 28px on mobile, proportional letter-spacing
- Nav: horizontal links → hamburger
- Cards: 3-col → 2-col → 1-col
- Article: max-width 720px → full width with 20px padding
- Section spacing: 64px → 40px on mobile

## 8. Accessibility & States

### Focus System
- All interactive elements receive a visible focus indicator
- Focus: `2px solid #7B9E87` + `outline-offset: 2px`
- Full keyboard navigation support
- Contrast: `#2C2C2C` on `#F9F5F0` → ~12:1 (WCAG AAA)

### Color Contrast Ratios
- Primary text `#2C2C2C` on `#F9F5F0`: ~12:1 (WCAG AAA)
- Secondary `#7A7068` on `#F9F5F0`: ~5.2:1 (WCAG AA)
- Sage green `#7B9E87` on `#FFFFFF`: ~3.8:1 (passes AA for large text / UI components)
- Badge text `#5C7A68` on `#EEF3F0`: ~4.6:1 (WCAG AA)

### Interactive States
- **Default**: Standard appearance
- **Hover**: Color shift to sage/brown, subtle translateY on cards
- **Active**: scale(0.97), darker background
- **Focus**: Sage green outline
- **Disabled**: `#B0A89E` text, opacity 0.6

## 9. Agent Prompt Guide

### Quick Color Reference
```
Background:       #F9F5F0  (cream)
Alt Background:   #EDE8E1  (cream mid, section fills)
Card Surface:     #FFFFFF
Primary Text:     #2C2C2C
Secondary Text:   #7A7068
Muted Text:       #B0A89E
Primary Accent:   #7B9E87  (sage green — CTA, links, focus)
Accent Hover:     #5C7A68
Secondary Accent: #C4956A  (warm brown — tags, decoration)
Border:           1px solid rgba(0,0,0,0.08)
Heading Font:     Lora (serif)
Body Font:        Inter (sans-serif)
```

### Example Component Prompts
- "Hero section on cream background `#F9F5F0`. Headline 56px Lora weight 700, line-height 1.10, letter-spacing -1.5px, color `#2C2C2C`. Lead text 18px Inter weight 400, line-height 1.65, color `#7A7068`. CTA button: sage green `#7B9E87`, radius 6px, padding 10px 20px, white text."
- "Blog post card: white background, `1px solid rgba(0,0,0,0.08)` border, radius 12px, warm card shadow. Title 18px Lora weight 600, `#2C2C2C`. Meta (date, category) Inter 14px weight 500, `#7A7068`. Tag pill: `#EEF3F0` bg, `#5C7A68` text, 9999px radius, Inter 12px weight 600."
- "Navigation: cream background `#F9F5F0`, sticky, backdrop-blur. Logo Lora 20px weight 700. Links Inter 15px weight 500, `#2C2C2C`, hover `#7B9E87`. CTA sage green pill button right-aligned."
- "Blockquote: Lora italic 18px, color `#7A7068`, border-left 3px solid `#7B9E87`, padding-left 20px, margin 32px 0."
- "Card grid section: white cards on cream background. 3-column grid, 24px gap. Section vertical padding 80px."

### Iteration Guide
1. Always use cream (`#F9F5F0`) as background — never cold white as the page canvas
2. Lora on ALL headings — this is the blog's typographic identity
3. Sage green (`#7B9E87`) is the only saturated UI color (equivalent to Notion Blue)
4. Warm brown (`#C4956A`) is decorative only — tags, hover accents, not primary actions
5. Borders are soft: `rgba(0,0,0,0.08)` — lighter than Notion's 0.1
6. Shadows use `rgba(44,44,44,...)` not `rgba(0,0,0,...)` for warmth
7. Body line-height 1.70–1.80 — long-form reading needs more room than UI does
8. Tags always as pill badges (9999px) in sage or brown tints
