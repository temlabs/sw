import React, {
  Children,
  createContext,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react';
import { ModalBackground } from './ModalBackground';
import Animated, {
  measure,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Modal } from './Modal';
import { screenHeight } from '@/theme/constants';
import { withSpringConfig } from './config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContextValues {
  setModalContent: (content: ReactNode | null) => void;
}

export const ModalContext = createContext<ContextValues>({
  setModalContent: (content: ReactNode | null) => {},
});

export function ModalContextProvider(props: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const modalRef = useAnimatedRef<Animated.View>();
  const blocking = useSharedValue(false);
  const offsetY = useSharedValue(screenHeight);
  const hiddenOffsetY = useSharedValue(screenHeight);
  useAnimatedReaction(
    () => modalContent,
    content => {
      if (content) {
        const measurement = measure(modalRef);
        console.debug('measurement', measurement);
        hiddenOffsetY.value = measurement?.height ?? screenHeight;
        offsetY.value = measurement?.height ?? screenHeight;
        offsetY.value = withSpring(0 - insets.bottom, withSpringConfig);
        blocking.value = true;
      } else {
        // by this time it has disappeared
        blocking.value = false;
      }
    },
    [modalContent],
  );

  const collapseModal = () => {
    'worklet';
    // animate then setmodalcontent to null
    offsetY.value = withSpring(
      hiddenOffsetY.value,
      withSpringConfig,
      f => f && runOnJS(setModalContent)(null),
    );
  };

  return (
    <>
      <ModalContext.Provider
        value={{
          setModalContent: content =>
            content ? setModalContent(content) : collapseModal(),
        }}
      >
        {props.children}

        <Modal
          modalRef={modalRef}
          offsetY={offsetY}
          modalHeight={hiddenOffsetY}
          blocking={blocking}
          collapseModal={collapseModal}
        >
          {modalContent}
        </Modal>
      </ModalContext.Provider>
    </>
  );
}
