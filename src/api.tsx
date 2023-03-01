import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1";

// async/await 방식의 fetcher 함수
/* export const coinsFetcher = async () => {

  // await + async/await
  const { data } = await axios.get(`https://api.coinpaprika.com/v1/coins/`);
  return data;

  // fetch + async/await
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const data = await response.json();

  return data;

  // fetch + async/await + IIFE
  return (async () =>
    await (await fetch("https://api.coinpaprika.com/v1/coins")).json())();
}; */

// fetch + promise chaining
export const coinsFetcher = () =>
  fetch(`${BASE_URL}/coins`).then((res) => res.json()); // Promise{<pending>}으로 반환

// axios + promise chaining
// axios.get("https://api.coinpaprika.com/v1/coins").then((res) => res.data);

// props를 받아오는 케이스. 타입 지정
export const fetchCoinInfo = (coinId: string) =>
  fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());

export const fetchCoinPrice = (coinId: string) =>
  fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
