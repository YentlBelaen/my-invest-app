//CoinGecko API, No Key
const BASE = 'https://api.coingecko.com/api/v3';

export const getItems = (q = '', page = 1, perPage = 100) =>
  fetch(`${BASE}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`)
    .then(res => { if (!res.ok) throw new Error('Network error'); return res.json(); })
    .then(list => {
      if (!Array.isArray(list)) return [];
      const term = q.trim().toLowerCase();
      if (!term) return list;
      return list.filter(x =>
        x.name?.toLowerCase().includes(term) || x.symbol?.toLowerCase().includes(term)
      );
    });

export const getItemById = (id) =>
  fetch(`${BASE}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    .then(res => { if (!res.ok) throw new Error('Network error'); return res.json(); });
