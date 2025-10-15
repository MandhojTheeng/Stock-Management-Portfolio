import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type { StockHistory } from '../types'

type Props = {
  history: StockHistory | null
}

export default function StockCharts({ history }: Props) {
  if (!history) return <p className="muted">Select a stock to see charts</p>

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
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}
