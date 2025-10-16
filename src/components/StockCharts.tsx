import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { StockHistory } from '../types';

type Props = {
  history: StockHistory | null;
};

export default function StockCharts({ history }: Props) {
  if (!history)
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        Select a stock from your portfolio to view its price and volume trends.
      </div>
    );

  const options = {
    chart: {
      backgroundColor: 'transparent',
      style: { fontFamily: 'Inter, sans-serif' },
    },
    title: {
      text: `${history.symbol} - Price & Volume History`,
      style: { fontSize: '16px', fontWeight: '600' },
    },
    xAxis: {
      categories: history.history.map((h) => h.date),
      crosshair: true,
      labels: { style: { fontSize: '12px', color: '#6B7280' } },
    },
    yAxis: [
      {
        title: { text: 'Price (USD)', style: { color: '#111827' } },
        labels: { style: { color: '#111827' } },
      },
      {
        title: { text: 'Volume', style: { color: '#4B5563' } },
        labels: { style: { color: '#4B5563' } },
        opposite: true,
        gridLineWidth: 0,
      },
    ],
    tooltip: {
      shared: true,
      backgroundColor: '#fff',
      borderColor: '#E5E7EB',
      borderRadius: 8,
      shadow: false,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: { fontWeight: '500', color: '#374151' },
    },
    series: [
      {
        type: 'line',
        name: 'Price',
        data: history.history.map((h) => h.close),
        color: '#2563EB',
        lineWidth: 2,
        marker: { enabled: false },
      },
      {
        type: 'column',
        name: 'Volume',
        data: history.history.map((h) => h.volume),
        yAxis: 1,
        color: '#A5B4FC',
        borderWidth: 0,
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
