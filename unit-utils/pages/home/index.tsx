import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useThemeColor } from '@/hooks/use-theme-color';
import { categories } from './constants/categories';
import CategoryBar from './components/CategoryBar';
import ConverterPanel from './components/ConverterPanel';

export default function HomePage() {
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');

  const [selectedKey, setSelectedKey] = useState(categories[0].key);
  const activeCategory = categories.find((c) => c.key === selectedKey)!;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: background }]}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: text }]}>Unit Utils</Text>
            <Text style={[styles.subtitle, { color: textSecondary }]}>
              Unit Converter
            </Text>
          </View>

          <CategoryBar
            categories={categories}
            selectedKey={selectedKey}
            onSelect={setSelectedKey}
          />

          <ConverterPanel key={selectedKey} category={activeCategory} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
});
