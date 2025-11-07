import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  const id = route?.params?.id ?? '(no id)';
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Detail Screen</Text>
      <Text>id: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
});
