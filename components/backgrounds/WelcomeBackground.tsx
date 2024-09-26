import {
  BackdropBlur,
  Blur,
  Canvas,
  ColorMatrix,
  DisplacementMap,
  Fill,
  Group,
  Paint,
  Turbulence,
} from "@shopify/react-native-skia";
import React from "react";
import { MorphingCircle } from "../graphics/morphingCircle/MorphingCircle";

export function WelcomeBackground() {
  return (
    <Canvas style={{ flex: 1 }}>
      <Group
        layer={
          <Paint>
            <Blur blur={30} />
            <ColorMatrix
              matrix={[
                // R, G, B, A, Position
                // prettier-ignore
                1, 0, 0, 0, 0,
                // prettier-ignore
                0, 1, 0, 0, 0,
                // prettier-ignore
                0, 0, 1, 0, 0,
                // prettier-ignore
                0, 0, 0, 30, -20,
              ]}
            />
          </Paint>
        }
      >
        <MorphingCircle
          numPoints={6}
          radius={100}
          x={300}
          y={400}
          colors={["orange", "cyan"]}
        />
        <MorphingCircle
          numPoints={6}
          radius={80}
          x={150}
          y={300}
          colors={["purple", "blue"]}
        />
      </Group>
      <Blur blur={10} />
      <BackdropBlur blur={60} />
      <Fill blendMode={"softLight"}>
        <Turbulence freqX={1} freqY={1} octaves={1} />
      </Fill>
      <DisplacementMap channelX="r" channelY="b" scale={20}>
        <Turbulence freqX={0.005} freqY={0.001} octaves={2} seed={4} />
      </DisplacementMap>
    </Canvas>
  );
}
