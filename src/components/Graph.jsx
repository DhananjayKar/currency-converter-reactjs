import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { fetchHistoricalRates } from "./api.js";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import '../App.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Graph = ({ fromCurrency, toCurrency }) => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  
  const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { color: "black" },
      grid: { display: false },
    },
    y: {
      ticks: { color: "black" },
      grid: { display: false },
    },
  },
};

  useEffect(() => {
    const loadChartData = async () => {
      const data = await fetchHistoricalRates(fromCurrency, toCurrency);
      if (data.length > 0) {
        setChartData({
          labels: data.map((entry) => entry.date),
          datasets: [
            {
              label: `1 ${fromCurrency} to ${toCurrency}`,
              data: data.map((entry) => entry.value),
              borderColor: (ctx) => {
                const chart = ctx.chart;
                if (!chart) return "blue"; 
                const { ctx: canvasCtx, chartArea } = chart;
                if (!chartArea) return "blue"; 

                const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, "red"); 
                gradient.addColorStop(1, "blue"); 
                return gradient;
              }, borderWidth: 3, pointRadius: 0, tension: 0.4, 
            },
          ],
        });
      }
    };
    loadChartData();
  }, [fromCurrency, toCurrency]);
  
  const screen = window.innerWidth >= 768;

  return (
    <div className="transparent-class graph" style={{ width: screen? "70%":"100%", maxWidth: "700px", margin: "auto" }}>
      <h4>1-Year Exchange Rate Trend</h4>
      {chartData ? <Line ref={chartRef} data={chartData} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default Graph;
