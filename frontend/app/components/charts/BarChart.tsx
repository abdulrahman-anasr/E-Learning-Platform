
import { Bar } from "react-chartjs-2";

interface BarChartProps {
  labels: string[];
  data: number[];
  label: string;
}

export default function BarChart({ labels, data, label }: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: "#36A2EB",
        borderColor: "#2A9DF4",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Bar data={chartData} />
    </div>
  );
}
