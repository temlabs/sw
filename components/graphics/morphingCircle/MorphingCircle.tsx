import React from "react";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { animate, getPoints, spline, mapNumbers } from "./functions";
import {
  Color,
  LinearGradient,
  Path,
  useClock,
  vec,
} from "@shopify/react-native-skia";
import { createNoise2D } from "@/components/graphics/functions";

interface MorphingCircleProps {
  numPoints: number;
  radius: number;
  x?: number;
  y?: number;
  colors?: Color[];
}

export function MorphingCircle({
  numPoints,
  radius,
  x,
  y,
  colors,
}: MorphingCircleProps) {
  const points = useSharedValue(getPoints(numPoints, radius, x, y));

  const noiseStep = 0.005;
  const clock = useClock();
  const noise = createNoise2D();

  const animationProgress = useSharedValue(0);

  const path = useDerivedValue(() => {
    animationProgress.value += noiseStep;
    const animatedPoints = points.value.map((point, index) => {
      const noise2D = noise(
        point.x * noiseStep,
        point.y * noiseStep + animationProgress.value
      );
      return { ...point, x: point.x + noise2D * 10, y: point.y + noise2D * 10 };
    });

    const splinePath = spline(animatedPoints, 1, true);
    return splinePath;
  }, [clock]);

  const endGrdientOffset = useSharedValue(0);
  const endGradientCoordinates = useDerivedValue(() => {
    endGrdientOffset.value += noiseStep / 2;
    const endNoise = noise(
      endGrdientOffset.value,
      endGrdientOffset.value + animationProgress.value * 0.05
    );
    const newValue = mapNumbers(endNoise, -1, 1, 0, 360);
    return vec((x ?? 0) + radius, newValue);
  }, [clock]);

  const colorsAnimated = useDerivedValue(() => {
    return colors ?? ["green", "red"];
  }, [colors]);

  return (
    <Path path={path} color={"red"}>
      <LinearGradient
        start={vec((x ?? 0) - radius, y ?? 0)}
        end={endGradientCoordinates}
        colors={colorsAnimated}
      />
    </Path>
  );
}
