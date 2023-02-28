import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

// styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  margin: 0 auto;
  color: ${(props) => props.theme.listColor};
`;

const Header = styled.header`
  margin: 40px 0;
  text-align: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 38px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
  font-size: 20px;
`;

const InfoView = styled.div``;

const InfoBox = styled.div`
  height: 60px;
  background-color: #00000080;
  display: flex;
  justify-content: space-evenly;
  border-radius: 10px;

  // 자식 요소를 동일한 너비와 높이를 갖도록 한다.
  & > * {
    flex: 1;
  }
`;

const Description = styled.div`
  margin: 25px 0;
  line-height: 1.2;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    text-align: center;
    display: block;
    font-size: 16px;

    &:first-of-type {
      font-size: 10px;
      margin-bottom: 12px;
    }
  }
`;

// styled(<component>) 로 특성을 그대로 가져온다.
const TabView = styled(InfoView)`
  // gap 특성을 활용하기 위해 그리드 사용
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  width: 100%;
`;

// props로 값을 보낸 뒤, 타입 직접 지정
const Tab = styled(InfoBox)<{ isActive: boolean }>`
  height: 100%;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    text-transform: uppercase;
    padding: 10px 0;
    // props 로 조건문을 만들어 선택적으로 색상 적용
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.listColor};
  }
`;

// Declaration of variables

// useLocation 으로 받은 state 타입 선언
interface IRouteState {
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
  const { state } = useLocation() as IRouteState; // Generic을 지원하지 않아 as로 직접 지정

  // useMatch를 이용하여 현재 url에 대한 object 정보를 얻는다.
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");

  // coinId를 이용해 개별 코인 정보에 대한 API를 호출 ... axios
  useEffect(() => {
    try {
      // coin 정보 API
      axios
        .get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then((coin) => {
          setCoinInfo(coin.data);
        });

      // coin 실시간 거래가 API
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
        <Title>
          {/* 직접 접근했다면 state.name이 아닌 api에서 받은 정보로 출력 */}
          {state?.name ? state.name : isLoading ? "Loading..." : coinInfo?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <InfoView>
            <InfoBox>
              <InfoItem>
                <span>Rank</span>
                <span>{coinInfo?.rank}</span>
              </InfoItem>
              <InfoItem>
                <span>Symbol</span>
                <span>{coinInfo?.symbol}</span>
              </InfoItem>
              <InfoItem>
                <span>Price</span>
                <span>{coinPrice?.quotes.USD.price.toFixed(3)}</span>
              </InfoItem>
            </InfoBox>
            <Description>{coinInfo?.description}</Description>
            <InfoBox>
              <InfoItem>
                <span>TOTAL SUPPLY</span>
                <span>{coinPrice?.total_supply}</span>
              </InfoItem>
              <InfoItem>
                <span>MAX SUPPLY</span>
                <span>{coinPrice?.max_supply}</span>
              </InfoItem>
            </InfoBox>
          </InfoView>
          <TabView>
            {/* props를 직접 정의하여 전달 */}
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </TabView>
          <Outlet />
        </>
      )}
    </Container>
  );
}
