export function darkenForContrast(
  hexColor: string,
  contrastThreshold: number = 4.5,
): string {
  // Helper function to calculate relative luminance
  const getLuminance = (hex: string): number => {
    const rgb = hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255);
    const [r, g, b] = rgb.map(c =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Helper function to calculate contrast ratio
  const getContrastRatio = (color1: string, color2: string): number => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  // Helper function to darken a color by a certain amount
  const darkenColor = (hex: string, amount: number): string => {
    const rgb = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
    const newRgb = rgb.map(c =>
      Math.max(0, Math.min(255, Math.round(c * (1 - amount)))),
    );
    return '#' + newRgb.map(c => c.toString(16).padStart(2, '0')).join('');
  };

  let currentColor = hexColor;
  let currentContrast = getContrastRatio(currentColor, '#FFFFFF');
  let darkenAmount = 0;

  while (currentContrast < contrastThreshold && darkenAmount < 1) {
    darkenAmount += 0.01;
    currentColor = darkenColor(hexColor, darkenAmount);
    currentContrast = getContrastRatio(currentColor, '#FFFFFF');
  }

  return currentColor;
}

// Example usage:
// const adjustedColor = darkenForContrast('#3498db');
// console.log(adjustedColor);
