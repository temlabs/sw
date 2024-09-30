import React from "react";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { animate, getPoints, spline, mapNumbers } from "./functions";
import {
  AnimatedProp,
  Color,
  LinearGradient,
  Path,
  RadialGradient,
  Transforms3d,
  useClock,
  vec,
} from "@shopify/react-native-skia";
import { createNoise2D } from "@/components/graphics/functions";

interface MorphingCircleProps {
  numPoints: number;
  radius: number;
  x?: number;
  y?: number;
  color1: SharedValue<Color>;
  color2: SharedValue<Color>;
  transform?: AnimatedProp<Transforms3d | undefined>;
}

export function MorphingCircle({
  numPoints,
  radius,
  x,
  y,
  color1,
  color2,
  transform,
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

  const radiusOffset = useSharedValue(0);
  const gradientRadius = useDerivedValue(() => {
    radiusOffset.value += noiseStep / 8;

    const radiusNoise = noise(
      (x ?? 0) + radiusOffset.value + 0.05,
      (y ?? 0) + radiusOffset.value
    );

    return radius * 0.8 + radiusNoise * radius * 0.5;
  }, [clock]);

  const gradientColors = useDerivedValue(() => {
    return [color1.value, color2.value];
  }, []);

  return (
    <Path path={path} color={"red"} transform={transform}>
      {/* <LinearGradient
        start={vec((x ?? 0) - radius, y ?? 0)}
        end={endGradientCoordinates}
        colors={colorsAnimated}
      /> */}
      <RadialGradient
        c={vec(x, y)}
        r={gradientRadius}
        colors={gradientColors}
      />
    </Path>
  );
}
