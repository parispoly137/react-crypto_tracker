import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 40px;
`;

const Text = styled.h1`
  margin-bottom: 10px;
  font-weight: bold;

  @media screen and (max-width: 565px) {
    font-size: 14px;
  }
`;

const TextInfo = styled.span`
  color: ${(props) => props.theme.accentColor};
  margin-left: 10px;
`;

interface IPriceData {
  priceData: {
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
    error?: number;
  };
}

export default function Price() {
  const { priceData } = useOutletContext<IPriceData>();

  let priceInfo = priceData?.quotes.USD;

  return (
    <Container>
      <Text>
        Price:<TextInfo>{priceInfo?.price}</TextInfo>
      </Text>
      <Text>
        Volume 24h:<TextInfo>{priceInfo?.volume_24h}</TextInfo>
      </Text>
      <Text>
        Volume 24h change 24h:
        <TextInfo>{priceInfo?.volume_24h_change_24h}</TextInfo>
      </Text>
      <Text>
        Market cap:<TextInfo>{priceInfo?.market_cap}</TextInfo>
      </Text>
      <Text>
        Market cap change 24h:
        <TextInfo>{priceInfo?.market_cap_change_24h}</TextInfo>
      </Text>
      <Text>
        Percent change15m:
        <TextInfo>{priceInfo?.percent_change_15m}</TextInfo>
      </Text>
      <Text>
        Percent change30m:
        <TextInfo>{priceInfo?.percent_change_30m}</TextInfo>
      </Text>
      <Text>
        Percent change1h:<TextInfo>{priceInfo?.percent_change_1h}</TextInfo>
      </Text>
      <Text>
        Percent change6h:
        <TextInfo>{priceInfo?.percent_change_6h}</TextInfo>
      </Text>
      <Text>
        Percent change12h:
        <TextInfo>{priceInfo?.percent_change_12h}</TextInfo>
      </Text>
      <Text>
        Percent change24h:
        <TextInfo>{priceInfo?.percent_change_24h}</TextInfo>
      </Text>
      <Text>
        Percent change7d:
        <TextInfo>{priceInfo?.percent_change_7d}</TextInfo>
      </Text>
      <Text>
        Percent change30d:
        <TextInfo>{priceInfo?.percent_change_30d}</TextInfo>
      </Text>
      <Text>
        Percent change1y:
        <TextInfo>{priceInfo?.percent_change_1y}</TextInfo>
      </Text>
      <Text>
        Ath price:<TextInfo>{priceInfo?.ath_price}</TextInfo>
      </Text>
      <Text>
        Ath date:<TextInfo>{priceInfo?.ath_date}</TextInfo>
      </Text>
      <Text>
        Percent from price ath:
        <TextInfo>{priceInfo?.percent_from_price_ath}</TextInfo>
      </Text>
    </Container>
  );
}
