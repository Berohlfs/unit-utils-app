import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Unit } from '../types';

type Props = {
  visible: boolean;
  units: Unit[];
  selectedKey: string;
  onSelect: (unit: Unit) => void;
  onClose: () => void;
};

export default function UnitPickerModal({
  visible,
  units,
  selectedKey,
  onSelect,
  onClose,
}: Props) {
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.sheet, { backgroundColor: background }]}>
          <View style={[styles.handle, { backgroundColor: border }]} />
          <Text style={[styles.title, { color: text }]}>Select Unit</Text>
          <FlatList
            data={units}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              const isSelected = item.key === selectedKey;
              return (
                <Pressable
                  onPress={() => onSelect(item)}
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
                      style={[
                        styles.optionAbbr,
                        { color: textSecondary },
                      ]}
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
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: '60%',
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
