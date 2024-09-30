import {
  BackdropBlur,
  Blur,
  Canvas,
  Color,
  ColorMatrix,
  Fill,
  Group,
  Paint,
  Shadow,
  Skia,
  Text,
  Transforms3d,
  Turbulence,
  useClock,
  useFont,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { MorphingCircle } from "../../graphics/morphingCircle/MorphingCircle";
import { black_300, black_500, colors, white_0 } from "@/theme/colors";
import {
  Easing,
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { createNoise2D } from "../../graphics/functions";
import { Href, usePathname } from "expo-router";

const paths: Href[] = ["/", "/signUp", "/logIn"];
const color1 = [black_500, "red", "cyan"];
const color2 = [black_300, "green", "red"];
const color3 = [white_0, "yellow", "blue"];
const color4 = [black_500, "blue", "green"];
const withTimingOptions = { duration: 500, easing: Easing.linear };
const withSpringOptions = { stiffness: 100, damping: 10 };

const translateX1 = -300;
const translateY1 = -200;
const translateX2 = -50;
const translateY2 = -250;

export function WelcomeBackground() {
  const font = useFont(require("@/assets/fonts/Sora-Regular.ttf"), 24);
  const currentPath = usePathname();
  const currentIndex = paths.indexOf(currentPath);
  const currentIndexIsWelcome = currentIndex === 0;
  const gc1 = useSharedValue(color1[currentIndex]);
  const gc2 = useSharedValue(color2[currentIndex]);
  const gc3 = useSharedValue(color3[currentIndex]);
  const gc4 = useSharedValue(color4[currentIndex]);
  const tx1 = useSharedValue(currentIndexIsWelcome ? 0 : translateX1);
  const ty1 = useSharedValue(currentIndexIsWelcome ? 0 : translateY1);
  const tx2 = useSharedValue(currentIndexIsWelcome ? 0 : translateX2);
  const ty2 = useSharedValue(currentIndexIsWelcome ? 0 : translateY2);
  const baseOpacity = useSharedValue(0);
  useAnimatedReaction(
    () => currentPath,
    (path) => {
      const index = paths.indexOf(path);
      baseOpacity.value = withTiming(index === 0 ? 1 : 0, {
        duration: index === 0 ? 2000 : 150,
        easing: Easing.linear,
      });
      gc1.value = withTiming(color1[index], withTimingOptions);
      gc2.value = withTiming(color2[index], withTimingOptions);
      gc3.value = withTiming(color3[index], withTimingOptions);
      gc4.value = withTiming(color4[index], withTimingOptions);
      tx1.value = withSpring(index === 0 ? 0 : translateX1, withSpringOptions);
      ty1.value = withSpring(index === 0 ? 0 : translateY1, withSpringOptions);
      tx2.value = withSpring(index === 0 ? 0 : translateX2, withSpringOptions);
      ty2.value = withSpring(index === 0 ? 0 : translateY2, withSpringOptions);
    }
  );

  const clock = useClock();

  const noise = createNoise2D();

  // useEffect(() => {
  //   baseOpacity.value = withDelay(
  //     2000,
  //     withTiming(1, { duration: 2000, easing: Easing.linear })
  //   );
  // }, []);

  const blurOffset = useSharedValue(0);
  const blur = useDerivedValue(() => {
    const minBlur = 0.2;
    const maxBlur = 0.8;
    blurOffset.value += 0.3;
    const blurNoise =
      noise(blurOffset.value + 0.05, blurOffset.value) * 0.8 + 0.8;
    const limitedBlur = minBlur + blurNoise * (maxBlur - minBlur);

    return limitedBlur;
  }, [clock]);

  const mct1 = useDerivedValue<Transforms3d>(() => {
    return [{ translateX: tx1.value }, { translateY: ty1.value }];
  }, [tx1, ty1]);

  const mct2 = useDerivedValue<Transforms3d>(() => {
    return [{ translateX: tx2.value }, { translateY: ty2.value }];
  }, [tx2, ty2]);

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
          color1={gc1}
          color2={gc2}
        />
        <MorphingCircle
          numPoints={6}
          radius={80}
          x={150}
          y={300}
          color1={gc3}
          color2={gc4}
        />
        <MorphingCircle
          numPoints={6}
          radius={160}
          x={120}
          y={800}
          color1={gc3}
          color2={gc4}
        />
        <MorphingCircle
          numPoints={6}
          radius={114}
          x={260}
          y={578}
          color1={gc3}
          color2={gc4}
        />
      </Group>
      <Text
        text={"wonder more"}
        font={font}
        color={"white"}
        x={16}
        y={300}
        opacity={baseOpacity}
      >
        <Shadow
          dx={12}
          dy={12}
          blur={blur}
          color={colors.text.primary}
          shadowOnly
        />
        {/* <Shadow dx={-12} dy={-12} blur={1} color="#c7f8ff" /> */}
      </Text>
      <BackdropBlur blur={60} />
      <Fill blendMode={"softLight"} opacity={0.4}>
        <Turbulence freqX={1} freqY={1} octaves={2} />
        {/* <Blur blur={0.9} /> */}
      </Fill>
      {/* <DisplacementMap channelX="r" channelY="b" scale={20}>
        <Turbulence freqX={0.0005} freqY={0.001} octaves={2} seed={4} />
      </DisplacementMap> */}
    </Canvas>
  );
}
