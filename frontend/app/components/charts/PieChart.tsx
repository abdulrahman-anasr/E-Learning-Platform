import { Pie } from "react-chartjs-2";
interface PieChartProps {
  labels: string[];
  data: number[];
}

export default function PieChart({ labels, data }: PieChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Pie data={chartData} />
    </div>
  );
}
