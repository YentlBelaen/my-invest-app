import { StyleSheet } from 'react-native';
import theme from './theme';

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: theme.FONT_SIZE_LARGE, fontWeight: '700', color: theme.TEXT_COLOR },
  muted: { color: theme.MUTED },
  row: { flexDirection: 'row', alignItems: 'center' },
});
