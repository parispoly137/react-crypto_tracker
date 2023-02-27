import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

// styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  margin: 40px 0;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 38px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
  color: ${(props) => props.theme.listColor};
  font-size: 20px;
`;

// Declaration of variables

// useLocation 으로 받은 state 타입 선언
interface IRouterState {
  state: {
    name: string;
  };
  // 객체도 선언해야 한다.
}

// coinInfo 타입 선언
interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

// coinPrice 타입 선언
interface ICoinPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

// Main
export default function Coin() {
  const [isLoading, setIsLoading] = useState(true);
  const { coinId } = useParams();
  const [coinInfo, setCoinInfo] = useState<ICoinInfo>(); // 타입을 알기 때문에 빈 객체 생략 가능
  const [coinPrice, setCoinPrice] = useState<ICoinPrice>();

  // Link를 통해 보낸 state 객체를 받음. 새롭게 url에서 추출하지 않아도 된다.
  // (coinId를 이용해 API 호출하여 name을 받아올 수도 있다. <useLocation 실습용>)
  const {
    state: { name }, // 객체 분해 할당
  } = useLocation() as IRouterState; // Generic을 지원하지 않아 as로 직접 지정

  // coinId를 이용해 개별 코인 정보에 대한 API를 호출 ... axios

  useEffect(() => {
    try {
      axios
        .get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then((coin) => {
          setCoinInfo(coin.data);
        });

      axios
        .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then((ticker) => {
          setCoinPrice(ticker.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <div>
          <h1>coinInfo</h1>
          <h3>{coinInfo?.id}</h3>
          <h1>coinTicker</h1>
          <h3>{coinPrice?.id}</h3>
        </div>
      )}
    </Container>
  );
}
