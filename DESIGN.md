---
name: hribal.site
description: Portfolio of Miloslav Hříbal as a dark store with a shelf of boxed releases.
colors:
  board: "#0f0f0f"
  stock: "#191919"
  carton: "#141414"
  ink: "#f2f2ee"
  muted: "#a5a59d"
  sticker: "#8af0c8"
  danger: "#ff7a7a"
typography:
  display:
    fontFamily: "General Sans, Geist, sans-serif"
    fontSize: "clamp(3.5rem, 10vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "General Sans, Geist, sans-serif"
    fontSize: "clamp(3rem, 8vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "General Sans, Geist, sans-serif"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title-sm:
    fontFamily: "General Sans, Geist, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0.005em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.005em"
    fontFeature: "\"tnum\""
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  tag: "6px"
  face: "10px"
  control: "12px"
  box: "16px"
  panel: "24px"
spacing:
  gutter: "1.25rem"
  gutter-wide: "2rem"
  column-gap: "2.5rem"
  section: "6rem"
  section-wide: "8rem"
  container: "90rem"
components:
  button-sticker:
    backgroundColor: "{colors.sticker}"
    textColor: "#000000"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-sticker-hover:
    backgroundColor: "#ffffff"
    textColor: "#000000"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.board}"
  input:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  sticker-tag:
    backgroundColor: "{colors.sticker}"
    textColor: "#000000"
    rounded: "{rounded.tag}"
    padding: "4px 8px"
  box-front:
    backgroundColor: "{colors.stock}"
    rounded: "{rounded.box}"
  back-panel:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "32px"
  shelf-face:
    backgroundColor: "{colors.carton}"
    textColor: "{colors.ink}"
    rounded: "{rounded.face}"
---

# Design System: hribal.site

## Overview

**Creative North Star: "The Boxed Release Shelf, After Dark"**

Every project is a shipped product sitting in a dark store: it has cover art, a spine with a coloured strip and a year, and a back panel listing its specs. The first viewport is a shelf of spines with one box pulled out face-first. Below the shelf the releases turn to face you as you scroll, and each one sits beside a back panel. The store is black and the boxes are dark carton drawn with light 2px outlines. Colour comes from the work itself: the cover screenshots, each project's spine strip, and the pulled cover's blurred glow on the shelf wall. The only colour the system adds is one mint.

The system has generous space and strong scale contrast. Huge condensed display names sit next to plain readable text. Structure comes from ruled lines and outlines, not from fills or shadows. Motion is physical box handling: pulling a box off the shelf, tipping a spine toward you, a box turning to face you on scroll, and a cover tilting in your hand with a gloss. The user turned down coloured walls (blue and purple) and white cartons, so the shelf blends into the page.

**Key Characteristics:**
- Near-black ground with warm off-white ink, plus one yellow accent.
- Every container is drawn with a 2px ink outline. Nothing floats on a shadow.
- General Sans is used for names, titles and spines. Geist carries all reading text.
- Corner radius grows with object size: tag, face, control, box, panel.
- Motion uses box physics on one ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)). All of it turns off under reduced motion.

## Colors

The palette is a dark store with warm paper ink. Colour comes from the product covers, and the system adds a single yellow.

### Primary
- **Sticker Yellow** (sticker): the price sticker on the pulled box. Used on the pulled box's type tag, the primary hero action ("Write to me"), focus rings, text selection, the skip link, and the hover state of the header Contact button. Text on it is always pure black.

### Neutral
- **Store Black** (board): the page ground, the header and the shelf wall underneath the cover light.
- **Panel Black** (stock): the alternate section surface (Services, About, Footer), back panels, the price rail, inputs and box-front grounds.
- **Carton Black** (carton): the faces of shelf boxes. The `.carton` scope redefines `--stock` to this value.
- **Paper Ink** (ink): all text, every 2px rule and outline, and the fill of the secondary (ink) buttons. Hairline rows in tables use it at 25% opacity, and the resting underlines on links use it at 40%.
- **Shelf Grey** (muted): secondary text, such as spec-table row labels, taglines, process descriptions and footer fine print.
- **Signal Red** (danger): only for contact-form error messages.

**Project spine colours** are data, not system tokens. Each project in `lib/projects.ts` has its own `color`, which fills the spine strip on its shelf box and the left edge of its box front. Don't use them anywhere else.

**Legacy:** `--cobalt` (#2a1243) and `--cobalt-deep` (#1d0c30) are still declared in `app/globals.css` from an earlier wall colour that the user rejected. Neither is used as a surface, and they are not part of the system.

### Named Rules
**The One Sticker Rule.** Yellow appears only where a real store would put a sticker or a pointer: the pulled box's tag, the single primary action, focus, selection, and hover on the header Contact button. Never put it on section fills, headings or decoration.

**The Lit Wall Rule.** The shelf wall has no colour of its own. It is store black, lit by the pulled box's cover image, which is blurred 56px, saturated 1.7 and dimmed to half brightness. The light crossfades when another box is pulled.

## Typography

**Display Font:** General Sans 500, self-hosted (falls back to Geist, then sans-serif)
**Body Font:** Geist 400 / 500 / 700, self-hosted (falls back to system-ui)

**Character:** a lighter, open display face for the names printed on boxes, paired with a calm geometric sans for back-panel copy. Every display element shares the 1.02 line-height and -0.03em tracking of the `font-spine` voice.

### Hierarchy
- **Display**: section titles for Projects and Contact. The hero name uses a larger clamp, clamp(3.5rem, 11vw, 6rem).
- **Headline**: section titles for Services, Experience and About.
- **Title**: project names on feature spreads (3rem, rising to 3.75rem at sm), the Bundle and Concepts headings (2.25–3rem), and footer and price-rail names.
- **Title-sm**: service names, compact project names, company names in Experience, process numerals, and mobile menu links.
- **Spine title**: General Sans, written vertically and rotated 180deg, sized clamp(1.5rem, spine-depth × 0.3, 2.4rem).
- **Lead**: section intros and hero pitch, capped at 44–60ch.
- **Body**: descriptions, capped at 48–68ch. Numerals are tabular.
- **Label**: semibold Geist for links, buttons, tags, years and table values. Taglines and the hero role use weight 500 at 1.125–1.5rem.

### Named Rules
**The Printed Name Rule.** General Sans is only for names: the person, sections, projects, companies, spines and step numerals. Running text, labels and controls are always Geist.

**The No Kicker Rule.** Section titles stand alone. Never put a small label, eyebrow or category line above them.

## Layout

Everything sits in one 90rem container with 1.25rem side gutters, widening to 2rem at sm. Section intros use a 12-column grid with 2.5rem column gaps: the title spans 7 columns and the lead spans 5, aligned to the bottom. Sections get 6rem of vertical padding (8rem at sm). Neighbouring sections are separated by 2px ink rules and by switching between store black and panel black, never by spacers or gradients.

The shelf runs full-bleed under the hero. A pulled box is min(600px, 68vw) wide. Spine width divides whatever space is left so the row always reaches the edge (58–124px, fixed at 60px under 640px). The row scrolls horizontally with its scrollbar hidden. Projects stack with 6rem gaps (8rem at sm) in this order: two features (box front in 7 columns, back panel in 5, with the second one mirrored), the paid-work bundle as a single outlined panel split into two columns, Questie as a 5/7 split, and finally the concept pair in a two-column grid under a ruled heading. Lists of facts are real tables with ink rules: specs, experience and tools. The header is a fixed 4rem bar ruled at the bottom. Under md, the nav collapses into a ruled stack of large General Sans links.

## Elevation & Depth

The system is flat and outlined. There is no box-shadow anywhere. Depth comes from real CSS 3D and light instead. Shelf boxes are 3D objects with a perspective of 2200px: a front face and a spine face set at 90deg, rotated with rotateY. Box fronts tilt toward the mouse pointer by up to 7deg using perspective(1100px). A pointer-following highlight sits on the tilted cover: a radial gradient of white at 22% fading out by 55%. Covers also turn in from rotateY(-62deg) on a scroll view timeline. The only atmosphere is the blurred cover light on the shelf wall.

### Named Rules
**The Outlined, Not Lifted Rule.** Draw containers with a 2px ink outline on a flat dark surface. If something needs to stand out, give it a different surface, a rule or a 3D turn, never a drop shadow.

**The Box Physics Rule.** Motion is only handling boxes: pull (700ms), tip on hover (380ms, rotateY 84deg, lifted 10px), turn-in on scroll, and pointer tilt (500ms to settle, 120ms while tracking). Everything uses cubic-bezier(0.16, 1, 0.3, 1). Under prefers-reduced-motion, transitions and scroll animations are switched off.

## Shapes

Corners are softly rounded, and the radius grows with the size of the object: a 6px sticker tag, 10px shelf faces, 12px controls (buttons, inputs, language toggle, menu button), 16px box fronts and 24px back panels and the bundle. Every edge is a solid 2px ink line (`--rule`), including the borders between cover and band inside a box. Only table rows go thinner, using 1px ink at 25%. Rectangles stay rectangles: no clipped corners, no pill buttons, no circles.

**The Two-Pixel Rule.** Every structural edge is 2px of ink: outlines, section dividers, table heads, the shelf edge and the header. 1px is only for hairlines between table rows.

## Components

### Buttons
Solid, rectangular and blunt.
- **Shape:** control radius (12px), at least 48px tall in the main areas (44px in project links, 40px in the header).
- **Sticker (primary):** yellow with black semibold text. Used only once per page, for the hero "Write to me". It turns white on hover.
- **Ink (secondary):** ink fill with store-black text, for Visit / Case study, Send, the Services CTA and the header Contact button. It turns white on hover, except the header Contact button, which turns mint.
- **Focus:** a 3px sticker outline offset by 3px, applied globally.
- **Text links:** semibold with a 2px underline at 40% ink, 0.2em offset. The underline goes to full ink on hover. Nav links show their underline only on hover.

### Inputs / Fields
- **Style:** panel-black fill, 2px ink outline, 12px radius, 12px × 16px padding, muted placeholder. The semibold label sits above.
- **Focus:** the global sticker outline with zero offset, so it hugs the field.
- **Error / Disabled:** errors appear in signal red in a live status line above Send. Disabled elements fade to 60% opacity.

### Navigation
A fixed store-black bar with a bottom ink rule. The wordmark "hribal.site" is set in General Sans at 1.5rem. Links are Geist 500 at 0.95rem. The language toggle is a segmented control: a 2px outline at 12px radius, with the active segment filled in ink and inactive segments getting 15% ink on hover. Under md, a 44px outlined menu button opens a ruled stack of large General Sans links. Escape closes it.

### Shelf (signature)
A toolbar of 3D carton boxes in a single row. A box at rest shows its spine: a 40px strip in the project colour, the vertical General Sans title, and the year in a ruled 36px foot. Hovering or focusing a spine tips it forward to reveal part of the cover. Clicking or using the arrow keys pulls it out face-first, showing the cover on top and a band underneath with the name in General Sans and the sticker tag. Clicking the pulled box again scrolls to its release section. Under the shelf, a full-width price rail (a carton strip ruled top and bottom) repeats the current name and tagline and offers Details and Live / Case study links.

### Release spread (signature)
On the left is a box front: an outlined 16px box with a coloured spine strip (12–16px) down its left edge and the 16:10 cover, wrapped in pointer tilt and scroll turn-in. Next to it is the back panel: an outlined 24px panel-black panel holding the General Sans name, the tagline, the description, a spec table with muted row labels, and the links. The panel slides up into view on scroll.

### Sticker tag
Black semibold Geist on yellow with a 6px radius. It appears only on the pulled box's band.

## Do's and Don'ts

### Do:
- **Do** draw every container with a 2px ink outline and choose a radius from the ladder by object size (6 / 10 / 12 / 16 / 24px).
- **Do** let the product covers and spine colours supply the colour. Keep chrome in board, stock, carton, ink and muted.
- **Do** keep mint for the one primary action, the pulled-box tag, focus and selection, always with black text.
- **Do** set names in General Sans 500 with line-height 1.02 and tracking -0.03em, and everything else in Geist.
- **Do** present facts as real tables with ink rules and muted row labels.
- **Do** run all motion on cubic-bezier(0.16, 1, 0.3, 1) and provide a reduced-motion fallback that switches it off.

### Don't:
- **Don't** give the shelf wall or any section a hue of its own. The user rejected blue and purple walls. Only the cover light colours the wall.
- **Don't** use white or light cartons. White appears on boxes only as the 2px outline.
- **Don't** use drop shadows or hard offset shadows. Depth comes from 3D turns and the cover light.
- **Don't** add a second accent colour, or use yellow as a fill for headings, sections or decoration.
- **Don't** put eyebrows, kickers or category labels above section titles.
- **Don't** use project spine colours outside their own box's spine strip.
