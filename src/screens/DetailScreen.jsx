import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { getItemById } from '../api/client';
import { common } from '../styles/common';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getItemById(id)
      .then(data => { if (active) setItem(data); })
      .catch(() => { if (active) setError('Failed to load detail'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return (
      <View style={[common.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator /><Text style={{ marginTop: 8 }}>Loading…</Text>
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={[common.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red' }}>{error || 'No detail found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        <Image
          source={{ uri: item.image?.large || item.image?.thumb }}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
      </View>
      <Text style={[common.title, { marginTop: 12 }]}>{item.name}</Text>

      <Text style={{ marginTop: 6 }}>
        Price: €{item.market_data?.current_price?.eur?.toLocaleString('nl-BE', { maximumFractionDigits: 8 })}
      </Text>
      <Text style={{ marginTop: 6 }}>
        Market cap: €{item.market_data?.market_cap?.eur?.toLocaleString('nl-BE')}
      </Text>
      <Text style={{ marginTop: 6 }}>
        24h change: {item.market_data?.price_change_percentage_24h?.toFixed(2)}%
      </Text>
      <Text style={{ marginTop: 6 }}>
        Symbol: {item.symbol?.toUpperCase()}
      </Text>
      <Text style={{ marginTop: 6 }}>
        Rank: {item.market_cap_rank}
      </Text>

      {item.description?.en ? (
        <Text style={{ marginTop: 12 }}>
          {item.description.en.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 2000)}…
        </Text>
      ) : null}
    </ScrollView>
  );
}
