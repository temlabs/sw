import { SharedValue } from "react-native-reanimated";
import { Point } from "./types";
import { NoiseFunction2D } from "simplex-noise";

export const getPoints = (
  numPoints: number,
  radius: number = 100,
  centerX: number = 0,
  centerY: number = 0
): Point[] => {
  const points = [];
  const angleStep = (Math.PI * 2) / numPoints;
  for (let i = 0; i < numPoints; i++) {
    const angle = angleStep * i;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const noiseOffsetX = Math.random() * 1000;
    const noiseOffsetY = Math.random() * 1000;
    points.push({
      x,
      y,
      noiseOffsetX,
      noiseOffsetY,
    });
  }
  return points;
};

function formatPoints(pointsArg: Point[], close: boolean) {
  "worklet";
  const points = pointsArg.map(({ x, y }) => [x, y]);

  if (close) {
    const lastPoint = points[points.length - 1];
    const secondToLastPoint = points[points.length - 2];

    const firstPoint = points[0];
    const secondPoint = points[1];

    points.unshift(lastPoint);
    points.unshift(secondToLastPoint);

    points.push(firstPoint);
    points.push(secondPoint);
  }

  return points.flat();
}

export const spline = (
  pointsArg: Point[] = [],
  tension = 1,
  close = false,
  cb?: (type: string, points: number[]) => void
): string => {
  "worklet";
  const points = formatPoints(pointsArg, close);

  const size = points.length;
  const last = size - 4;

  const startPointX = close ? points[2] : points[0];
  const startPointY = close ? points[3] : points[1];

  let path = `M${startPointX},${startPointY}`;

  cb?.("MOVE", [startPointX, startPointY]);

  const startIteration = close ? 2 : 0;
  const maxIteration = close ? size - 4 : size - 2;
  const inc = 2;

  for (let i = startIteration; i < maxIteration; i += inc) {
    const x0 = i ? points[i - 2] : points[0];
    const y0 = i ? points[i - 1] : points[1];

    const x1 = points[i + 0];
    const y1 = points[i + 1];

    const x2 = points[i + 2];
    const y2 = points[i + 3];

    const x3 = i !== last ? points[i + 4] : x2;
    const y3 = i !== last ? points[i + 5] : y2;

    const cp1x = x1 + ((x2 - x0) / 6) * tension;
    const cp1y = y1 + ((y2 - y0) / 6) * tension;

    const cp2x = x2 - ((x3 - x1) / 6) * tension;
    const cp2y = y2 - ((y3 - y1) / 6) * tension;

    path += `C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;

    cb?.("CURVE", [cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }

  return path;
};

export const mapNumbers = (
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) => {
  "worklet";
  return start2 + (stop2 - start2) * ((n - start1) / (stop1 - start1));
};

export const animate = (
  points: Point[],
  noise: NoiseFunction2D,
  noiseStep: number
) => {
  "worklet";
  console.log("animating");
  const newPoints = [];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const newX = noise(point.noiseOffsetX, point.noiseOffsetY);
    const newY = noise(point.noiseOffsetX, point.noiseOffsetY);
    const x = mapNumbers(newX, -1, 1, point.x, point.x + 10);
    const y = mapNumbers(newY, -1, 1, point.y, point.y + 10);
    newPoints.push({
      ...point,
      x,
      y,
      noiseOffsetX: point.noiseOffsetX + noiseStep,
      noiseOffsetY: point.noiseOffsetY + noiseStep,
    });
  }

  return newPoints;
};
