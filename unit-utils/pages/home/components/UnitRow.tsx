import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Unit } from '../types';

type Props = {
  label: string;
  unit: Unit;
  value: string;
  onChangeValue: (text: string) => void;
  onPressUnit: () => void;
  editable?: boolean;
};

export default function UnitRow({
  label,
  unit,
  value,
  onChangeValue,
  onPressUnit,
  editable = true,
}: Props) {
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const inputBackground = useThemeColor({}, 'inputBackground');
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const placeholder = useThemeColor({}, 'placeholder');

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textSecondary }]}>{label}</Text>
      <View style={styles.row}>
        <Pressable
          onPress={onPressUnit}
          style={[styles.unitPicker, { borderColor: border }]}
        >
          <Text style={[styles.unitText, { color: tint }]}>
            {unit.abbreviation}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color={tint} />
        </Pressable>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: inputBackground,
              color: text,
              borderColor: border,
            },
          ]}
          value={value}
          onChangeText={onChangeValue}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={placeholder}
          editable={editable}
          selectTextOnFocus
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  unitPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 72,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});
