import ApexChart from "react-apexcharts";
import NotFound from "../NotFound";

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

interface IProps {
  data: IHistoryProps[] | IHistoryProps;
}

// ApexChart.js 라이브러리 이용
export default function ChartUI({ data }: IProps) {
  return (
    <>
      {/* data가 정상적으로 넘어온 경우에만 차트 생성 (array) */}
      {Array.isArray(data) ? (
        <ApexChart
          type='candlestick'
          series={[
            {
              name: "Price",
              data: data.map((price) => {
                return {
                  x: new Date(price.time_close * 1000),
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000),
            },
          }}
        ></ApexChart>
      ) : (
        <NotFound />
      )}
    </>
  );
}
