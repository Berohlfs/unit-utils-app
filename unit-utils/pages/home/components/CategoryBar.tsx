import { StyleSheet, View } from 'react-native';

import { UnitCategory } from '../types';
import CategoryPill from './CategoryPill';

type Props = {
  categories: UnitCategory[];
  selectedKey: string;
  onSelect: (key: string) => void;
};

export default function CategoryBar({
  categories,
  selectedKey,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <CategoryPill
          key={cat.key}
          category={cat}
          isSelected={cat.key === selectedKey}
          onPress={() => onSelect(cat.key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
});
