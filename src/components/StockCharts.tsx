import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { StockHistory } from '../types';

type Props = {
  history: StockHistory | null;
};

export default function StockCharts({ history }: Props) {
  if (!history) return <p className="text-gray-500">Select a stock to see charts</p>;

  const options = {
    title: { text: `${history.symbol} Price History` },
    xAxis: { categories: history.history.map(h => h.date) },
    series: [
      { type: 'line', name: 'Price', data: history.history.map(h => h.close) },
      { type: 'column', name: 'Volume', data: history.history.map(h => h.volume), yAxis: 1 }
    ],
    yAxis: [
      { title: { text: 'Price' } },
      { title: { text: 'Volume' }, opposite: true }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
