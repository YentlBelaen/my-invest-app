import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.box}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search..."
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 16 },
});
