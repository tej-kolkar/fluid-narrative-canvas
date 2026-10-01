# Four-service laptop animation

## Scope
- Recreate the four-service section visible in the supplied reference because the current project is still a blank template.
- Keep the dark green, ivory, and gold visual language, top service tabs, left-side service copy, and restrained composition.
- Replace only the reference's abstract right-side artwork with one responsive laptop sequence.

## Interaction
- Build four reversible visual states: brand wordmark, polished website, separated three-layer interface, and elevated laptop/mobile/campaign set.
- Link the active state to both page scroll progress and the four service tabs.
- Use CSS transforms, transitions, and inline SVG only, with reduced-motion support and mobile-safe sizing.

## Validation
- Check desktop and mobile rendering, tab selection, scroll-forward/back behavior, and current preview diagnostics.

## Technical details
- Keep the experience on the existing `/` page using React state and passive scroll listeners.
- Define all visual roles as semantic CSS tokens and avoid heavy 3D or canvas libraries.
