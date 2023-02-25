import styled from "styled-components";
import { Link } from "react-router-dom";
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

const Loading = styled.span`
  display: block;
  text-align: center;
  color: ${(props) => props.theme.listColor};
  font-size: 24px;
`;

const CoinsList = styled.ul`
  width: 440px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.listColor};
  margin-bottom: 10px;
  height: 80px;
  border-radius: 10px;
  color: ${(props) => props.theme.bgColor};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }

  a {
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 100%;
  }
`;

// Declaration of variables

interface ICoinInfo {
  // coin api의 객체 항목들에 대한 타입 설정
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// Main
export default function Coins() {
  const [coins, setCoins] = useState<ICoinInfo[]>([]); // 코인api를 담는 state. 타입 지정
  const [isLoading, setIsLoading] = useState(true); // 로딩여부를 담는 state

  useEffect(() => {
    // axios 모듈을 이용하여 코인들의 정보가 담긴 API를 Fetching 및 state 설정
    axios
      .get("https://api.coinpaprika.com/v1/coins")
      .then((response) => {
        setIsLoading(true);
        setCoins(response.data.slice(0, 100));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Title>Crypto Tracker</Title>
      </Header>
      {/* 로딩이 끝난 경우에만 리스트를 보여주도록 삼항연산자 사용 */}
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {/* coins API를 받아와서 mapping ... coin 리스트 생성 */}
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={coin.id}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
