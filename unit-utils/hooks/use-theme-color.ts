import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export function useThemeColor() {
  const scheme = useColorScheme() ?? 'light';
  return Colors[scheme];
}
