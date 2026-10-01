# Continuous device animation refinement

## Approach
- Replace the four discrete visual jumps with one normalized scroll timeline that continuously interpolates device transforms and opacity.
- Keep service text, section layout, tabs, and palette unchanged; tabs will scroll to exact timeline anchors.
- Preserve stable device footprints while softening corners, shadows, and adding restrained floating motion where it cannot compete with scrolling.

## Motion behavior
- Smooth raw scroll progress with requestAnimationFrame interpolation and derive the active service from centered timeline thresholds.
- Drive laptop scale/position, screen crossfades, interface layers, phone, campaign cards, and footer progress from shared CSS variables.
- Avoid visibility toggles and layout-affecting animation properties so every transition reverses naturally without flicker.
- Disable smoothing and decorative drift for reduced-motion users.

## Validation
- Inspect launch→repositioning, repositioning→reinvention, and reinvention→elevation in both directions.
- Check all tab anchors, desktop/mobile overflow, device overlap, runtime errors, and the final build signal.
