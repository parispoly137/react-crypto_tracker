import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import ChartUI from "./ChartUI";

const Text = styled.span`
  font-size: 16px;
`;

interface IHistoryProps {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
  error?: string;
}

// Main
export default function Chart() {
  const { coinId } = useParams();

  // 실시간 가격 변화 api 호출
  const { isLoading, data } = useQuery<IHistoryProps[] | IHistoryProps>({
    queryKey: ["ohlcv", coinId],
    // queryFn: fetchCoinHistory,
    queryFn: () => fetchCoinHistory(coinId!),
  });

  return (
    <>
      {data ? (
        // price data가 없는 경우 고려
        "error" in data ? (
          <Text>{data.error}</Text>
        ) : (
          // -> ChartUI 컴포넌트 렌더링. data 전달.
          <>{isLoading ? <Text>Loading...</Text> : <ChartUI data={data} />}</>
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}
