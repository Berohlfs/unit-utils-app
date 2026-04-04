import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useThemeColor } from '@/hooks/use-theme-color';
import { UnitCategory } from '../types';

type Props = {
  category: UnitCategory;
  isSelected: boolean;
  onPress: () => void;
};

export default function CategoryPill({ category, isSelected, onPress }: Props) {
  const surface = useThemeColor({}, 'surface');
  const surfaceActive = useThemeColor({}, 'surfaceActive');
  const surfaceActiveText = useThemeColor({}, 'surfaceActiveText');
  const text = useThemeColor({}, 'text');
  const icon = useThemeColor({}, 'icon');

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.pill,
        {
          backgroundColor: isSelected ? surfaceActive : surface,
        },
      ]}
    >
      <MaterialIcons
        name={category.icon as keyof typeof MaterialIcons.glyphMap}
        size={18}
        color={isSelected ? surfaceActiveText : icon}
      />
      <Text
        style={[
          styles.label,
          { color: isSelected ? surfaceActiveText : text },
        ]}
      >
        {category.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
