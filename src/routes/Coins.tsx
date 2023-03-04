import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { coinsFetcher } from "../api";
import { Helmet } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

// styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 480px;
  margin: 0 auto;
  margin-bottom: 60px;

  @media screen and (max-width: 565px) {
    width: 80vw;
  }
`;

const Header = styled.header`
  text-align: center;
  margin: 60px 0;
  position: relative;
  width: 100%;
`;

const Title = styled.h1`
  // ThemeProvider 로 모든 컴포넌트에서 theme의 특성 접근 가능
  color: ${(props) => props.theme.accentColor};
  font-size: 38px;

  @media screen and (max-width: 565px) {
    font-size: 30px;
  }
`;

const Toggle = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 32px;
  aspect-ratio: 1/1;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 30%;
  padding: 5px;
  z-index: 2;
  font-size: 14px;
  color: ${(props) => props.theme.listColor};

  @media screen and (max-width: 565px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
  }
`;

const Loader = styled.span`
  display: block;
  text-align: center;
  color: ${(props) => props.theme.listColor};
  font-size: 20px;
`;

const CoinsList = styled.ul`
  width: 100%;
`;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.listColor};
  margin-bottom: 10px;
  height: 80px;
  padding: 0 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.bgColor};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 565px) {
      font-size: 12px;
    }
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;

  @media screen and (max-width: 565px) {
    width: 28px;
    height: 28px;
  }
`;

// Declaration of variables

interface ICoinInfo {
  // Coins API의 객체 항목들에 대한 타입 설정
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
  // useQuery를 이용하여 API fetching
  const { isLoading, data } = useQuery<ICoinInfo[]>({
    queryKey: ["allCoins"],
    queryFn: coinsFetcher,
  });
  // atom을 읽어오고 값을 수정할 수 있는 hooks들을 사용
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>Crypto Tracker</title>
        <link
          rel='icon'
          href='https://w7.pngwing.com/pngs/285/560/png-transparent-icon-coin-gold-coin-bitcoin-logo-gold-united-states-dollar-circle.png'
        />
      </Helmet>
      <Header>
        <Title>Crypto Tracker</Title>
        {/* 모드를 토글할 수 있는 버튼 생성 */}
        <Toggle onClick={toggleDark}>{isDark ? "🌞" : "🌙"}</Toggle>
      </Header>
      {/* 로딩이 끝난 경우에만 리스트를 보여주도록 삼항연산자 사용 */}
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {/* Coins API를 받아와서 mapping ... coin 리스트 생성 */}
          {data?.slice(0, 100).map((coin) => (
            // -> Coin.tsx
            <Coin key={coin.id}>
              {/* 코인 이미지 API를 직접 연결 */}

              <Image
                src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                alt={coin.name}
                // 이미지 호출 오류 시, 다른 이미지 대체 ... 경로: public폴더 기준
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://w7.pngwing.com/pngs/285/560/png-transparent-icon-coin-gold-coin-bitcoin-logo-gold-united-states-dollar-circle.png")
                }
              />
              {/* Coin.tsx 로 넘어가는 링크 생성 + state를 통한 객체 전달 */}
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
