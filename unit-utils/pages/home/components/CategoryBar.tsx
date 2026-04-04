import { ScrollView, StyleSheet } from 'react-native';

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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <CategoryPill
          key={cat.key}
          category={cat}
          isSelected={cat.key === selectedKey}
          onPress={() => onSelect(cat.key)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
});
