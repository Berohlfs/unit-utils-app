import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Unit } from '../types';

function sanitizeNumericInput(raw: string): string | null {
  // Replace comma with dot
  let sanitized = raw.replace(',', '.');

  // Remove anything that isn't a digit or dot
  sanitized = sanitized.replace(/[^0-9.]/g, '');

  // Allow only one dot
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }

  // Reject if nothing useful remains
  if (sanitized === '') return '';
  if (sanitized !== raw.replace(',', '.')) return sanitized;

  return sanitized;
}

type Props = {
  label: string;
  unit: Unit;
  value: string;
  onChangeValue: (text: string) => void;
  onPressUnit: () => void;
  editable?: boolean;
  hint?: string | null;
};

export default function UnitRow({
  label,
  unit,
  value,
  onChangeValue,
  onPressUnit,
  editable = true,
  hint,
}: Props) {
  const { text, textSecondary, inputBackground, tint, border, placeholder } =
    useThemeColor();

  const handleChangeText = (raw: string) => {
    const sanitized = sanitizeNumericInput(raw);
    if (sanitized !== null) {
      onChangeValue(sanitized);
    }
  };

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
        <View style={styles.inputWrapper}>
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
            onChangeText={handleChangeText}
            inputMode="decimal"
            placeholder="0"
            placeholderTextColor={placeholder}
            editable={editable}
            selectTextOnFocus
          />
          {hint ? (
            <Text style={[styles.hint, { color: textSecondary }]}>
              = {hint}
            </Text>
          ) : null}
        </View>
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
    alignItems: 'flex-start',
    gap: 10,
  },
  unitPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 12,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 72,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  hint: {
    fontSize: 13,
    marginLeft: 4,
    marginTop: 6,
    fontStyle: 'italic',
  },
});
