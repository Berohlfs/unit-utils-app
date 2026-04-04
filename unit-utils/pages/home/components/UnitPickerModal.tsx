import { useEffect } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Unit } from '../types';

type Props = {
  visible: boolean;
  units: Unit[];
  selectedKey: string;
  onSelect: (unit: Unit) => void;
  onClose: () => void;
};

const SHEET_HEIGHT_RATIO = 0.6;
const DISMISS_THRESHOLD = 80;

export default function UnitPickerModal({
  visible,
  units,
  selectedKey,
  onSelect,
  onClose,
}: Props) {
  const { height: windowHeight } = useWindowDimensions();
  const sheetHeight = windowHeight * SHEET_HEIGHT_RATIO;

  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');

  const translateY = useSharedValue(sheetHeight);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [visible, sheetHeight, translateY]);

  const close = () => {
    translateY.value = withTiming(
      sheetHeight,
      { duration: 250, easing: Easing.in(Easing.cubic) },
      () => {
        runOnJS(onClose)();
      }
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD) {
        runOnJS(close)();
      } else {
        translateY.value = withTiming(0, {
          duration: 200,
          easing: Easing.out(Easing.cubic),
        });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={close}
      statusBarTranslucent
    >
      <GestureHandlerRootView style={styles.container}>
        <Pressable style={styles.overlay} onPress={close} />

        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.sheet,
              { backgroundColor: background, height: sheetHeight },
              sheetStyle,
            ]}
          >
            <View style={[styles.handle, { backgroundColor: border }]} />
            <Text style={[styles.title, { color: text }]}>Select Unit</Text>
            <FlatList
              data={units}
              keyExtractor={(item) => item.key}
              bounces={false}
              renderItem={({ item }) => {
                const isSelected = item.key === selectedKey;
                return (
                  <Pressable
                    onPress={() => {
                      onSelect(item);
                      close();
                    }}
                    style={[
                      styles.option,
                      {
                        backgroundColor: isSelected ? surface : 'transparent',
                      },
                    ]}
                  >
                    <View style={styles.optionLeft}>
                      <Text style={[styles.optionLabel, { color: text }]}>
                        {item.label}
                      </Text>
                      <Text
                        style={[styles.optionAbbr, { color: textSecondary }]}
                      >
                        {item.abbreviation}
                      </Text>
                    </View>
                    {isSelected && (
                      <MaterialIcons name="check" size={20} color={tint} />
                    )}
                  </Pressable>
                );
              }}
            />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionAbbr: {
    fontSize: 14,
  },
});
