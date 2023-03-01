const BASE_URL = "https://api.coinpaprika.com/v1";

// fetch + promise chaining
export const coinsFetcher = () =>
  fetch(`${BASE_URL}/coins`).then((res) => res.json()); // Promise{<pending>}으로 반환

// props를 받아오는 케이스. 타입 지정
export const fetchCoinInfo = (coinId: string) =>
  fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());

export const fetchCoinPrice = (coinId: string) =>
  fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
