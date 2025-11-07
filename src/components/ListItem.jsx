import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';

export default function ListItem({ item, onPress }) {
  const price = item.current_price;
  const change = item.price_change_percentage_24h;
  const cap = item.market_cap;
  const changeColor = change > 0 ? '#2e7d32' : change < 0 ? '#c1121f' : '#666';

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.title}>
          {item.name} <Text style={styles.symbol}>({item.symbol?.toUpperCase()})</Text>
        </Text>
        <Text numberOfLines={1} style={styles.sub}>
          €{price?.toLocaleString('nl-BE', { maximumFractionDigits: 6 })} • MCap €{cap?.toLocaleString('nl-BE')}
        </Text>
      </View>
      <Text style={[styles.change, { color: changeColor }]}>{change?.toFixed(2)}%</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  thumb: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f4f4f4' },
  info: { flex: 1, minWidth: 0 },
  title: { fontSize: 16, fontWeight: '600' },
  symbol: { fontWeight: '400', color: '#666' },
  sub: { color: '#666', marginTop: 4 },
  change: { fontWeight: '700', minWidth: 68, textAlign: 'right' },
});
