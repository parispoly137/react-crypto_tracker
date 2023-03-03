const BASE_URL = "https://api.coinpaprika.com/v1";

// fetch + promise chaining
// coin 리스트 및 정보 API
export const coinsFetcher = () =>
  fetch(`${BASE_URL}/coins`).then((res) => res.json()); // Promise{<pending>}으로 반환

// // 개별 코인에 대한 정보 API
export const fetchCoinInfo = (coinId: string) =>
  fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());

// 개별 코인의 가격 관련 정보 API
export const fetchCoinPrice = (coinId: string) =>
  fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());

// 개별 코인의 최근 2주 가격 정보 API
export const fetchCoinHistory = (coinId: string) =>
  fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then(
    (res) => res.json()
  );
