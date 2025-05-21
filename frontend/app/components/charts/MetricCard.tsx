
interface MetricCardProps {
    title: string;
    value: string | number;
  }
  
  export default function MetricCard({ title, value }: MetricCardProps) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          width: "200px",
        }}
      >
        <h3 style={{ marginBottom: "8px", fontSize: "1.1rem" }}>{title}</h3>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>{value}</p>
      </div>
    );
  }
  