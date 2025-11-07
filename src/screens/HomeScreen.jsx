import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import SearchBar from '../components/SearchBar';
import ListItem from '../components/ListItem';
import { getItems } from '../api/client';
import { common } from '../styles/common';
import theme from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('mcapDesc');
  const [onlyGreen, setOnlyGreen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('[HomeScreen] mount');
    return () => console.log('[HomeScreen] unmount');
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setQuery(input), 300);
    return () => clearTimeout(t);
  }, [input]);

  useEffect(() => {
    setLoading(true);
    setError('');
    getItems(query, 1, 100)
      .then(items => setData(items))
      .catch(() => setError('Failed to load.'))
      .finally(() => setLoading(false));
  }, [query]);

  const filteredSorted = useMemo(() => {
    let list = data;
    if (onlyGreen) list = list.filter(x => (x.price_change_percentage_24h || 0) > 0);

    const byAlpha = (a, b) => a.name.localeCompare(b.name);
    const byPrice = (a, b) => (a.current_price || 0) - (b.current_price || 0);
    const byChange = (a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0);
    const byMcap = (a, b) => (a.market_cap || 0) - (b.market_cap || 0);

    if (sort === 'alpha') return [...list].sort(byAlpha);
    if (sort === 'priceAsc') return [...list].sort(byPrice);
    if (sort === 'priceDesc') return [...list].sort((a, b) => byPrice(b, a));
    if (sort === 'changeAsc') return [...list].sort(byChange);
    if (sort === 'changeDesc') return [...list].sort((a, b) => byChange(b, a));
    return [...list].sort((a, b) => byMcap(b, a));
  }, [data, sort, onlyGreen]);

return (
  <View style={common.screen}>
    <SearchBar
      value={input}
      onChange={setInput}
      onSubmit={() => setQuery(input)}
    />


<View style={styles.chipRow}>
  <Pressable
    onPress={() => setSort('mcapDesc')}
    accessibilityLabel="Sort by market cap descending"
    style={[styles.chip, sort === 'mcapDesc' && styles.chipActive]}>
    <Text style={[styles.chipText, sort === 'mcapDesc' && styles.chipTextActive]}>MCap ↓</Text>
  </Pressable>

  <Pressable
    onPress={() => setSort('alpha')}
    accessibilityLabel="Sort alphabetically"
    style={[styles.chip, sort === 'alpha' && styles.chipActive]}>
    <Text style={[styles.chipText, sort === 'alpha' && styles.chipTextActive]}>ABC</Text>
  </Pressable>

  <Pressable
    onPress={() => setSort('priceAsc')}
    accessibilityLabel="Sort by price ascending"
    style={[styles.chip, sort === 'priceAsc' && styles.chipActive]}>
    <Text style={[styles.chipText, sort === 'priceAsc' && styles.chipTextActive]}>€ ↑</Text>
  </Pressable>

  <Pressable
    onPress={() => setSort('priceDesc')}
    accessibilityLabel="Sort by price descending"
    style={[styles.chip, sort === 'priceDesc' && styles.chipActive]}>
    <Text style={[styles.chipText, sort === 'priceDesc' && styles.chipTextActive]}>€ ↓</Text>
  </Pressable>

  <Pressable
    onPress={() => setSort('changeDesc')}
    accessibilityLabel="Sort by 24 hour change descending"
    style={[styles.chip, sort === 'changeDesc' && styles.chipActive]}>
    <Text style={[styles.chipText, sort === 'changeDesc' && styles.chipTextActive]}>Δ24h ↓</Text>
  </Pressable>

  <Pressable
    onPress={() => setSort('changeAsc')}
    accessibilityLabel="Sort by 24 hour change ascending"
    style={[styles.chip, sort === 'changeAsc' && styles.chipActive]}>
    <Text style={[styles.chipText, sort === 'changeAsc' && styles.chipTextActive]}>Δ24h ↑</Text>
  </Pressable>

  <Pressable
    onPress={() => setOnlyGreen(v => !v)}
    accessibilityLabel="Toggle green only filter"
    style={[styles.chip, onlyGreen && styles.chipActive]}>
    <Text style={[styles.chipText, onlyGreen && styles.chipTextActive]}>
      {onlyGreen ? 'Green ✓' : 'Green only'}
    </Text>
  </Pressable>
</View>


    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading…</Text>
      </View>
    ) : error ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <Pressable onPress={() => setQuery(q => q)}><Text>Retry</Text></Pressable>
      </View>
    ) : filteredSorted.length === 0 ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={common.muted}>No results.</Text>
      </View>
    ) : (
      <FlashList
        data={filteredSorted}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={80}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
      />
    )}
  </View>
);
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  chipActive: {
    borderColor: theme.PRIMARY_COLOR,
    backgroundColor: `${theme.PRIMARY_COLOR}20`, // subtle tint
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  chipTextActive: {
    fontWeight: '700',
  },
});

