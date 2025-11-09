# My Invest App (Expo + React Navigation + FlashList)

## 1. App description
This small mobile app shows a home page with a FlashList of cryptocurrencies. When navigating to a cryptocurrency by tapping one, the user can view a detail page with additional information about the selected cryptocurrency.  
There's also a tab that shows static profile information.

## 2. Copy & run this project locally
1) Open Visual Studio Code  
2) Open Terminal  
3) Clone the repo: `git clone https://github.com/YentlBelaen/my-invest-app.git`  
4) Change directory: `cd my-invest-app`  
5) Install dependencies (if needed): `npm install`  
6) Start the dev server: `npx expo start`  
7) Open the app in the browser: press `w` in the Expo terminal

## 3. Endpoints & API
The app uses **CoinGecko**’s public API (no API key) with prices in **EUR**.

**Base URL**  
`https://api.coingecko.com/api/v3`

**List (Home)**  
`GET /coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`  
Returns an array with fields like: `id`, `symbol`, `name`, `image`, `current_price`, `market_cap`, `price_change_percentage_24h`, etc.  
The app filters locally on `name` and `symbol`.

**Detail (Detail screen)**  
`GET /coins/{id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`  
Displays logo (centered, `resizeMode="contain"`), `name`, `symbol`, `market_data.current_price.eur`, `market_data.market_cap.eur`, `market_data.price_change_percentage_24h`, `market_cap_rank`, and a short plain-text description.

## 4. Search and Sort Explanation
**Search**  
- Debounced by **300ms** while typing (reduces unnecessary requests).  
- Press **Enter** to trigger an immediate search.  
- Case-insensitive match on **name** and **symbol**.

**Sort**  
Active sort is shown as **pill chips**:
- **MCap ↓** — Market cap descending (default)  
- **ABC** — Alphabetical (A→Z)  
- **€ ↑ / € ↓** — Price ascending / descending  
- **Δ24h ↑ / Δ24h ↓** — 24h % change ascending / descending

**Filter**  
- **Green only** — Only shows coins with **positive 24h change**.

**States**  
- Clear **Loading**, **Error**, and **Empty** states.  
- **Search bar and chips remain visible** in all states.
