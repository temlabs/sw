import React, { useEffect, useState } from 'react';
import { getColors, ImageColorsResult } from 'react-native-image-colors';

export function useImageColors(url: string) {
  const [colors, setColors] = useState<ImageColorsResult>();

  useEffect(() => {
    getColors(url, {
      fallback: '#228B22',
      cache: true,
      key: url,
    }).then(setColors);
  }, [url]);

  return colors;
}
