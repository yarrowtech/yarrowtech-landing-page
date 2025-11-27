import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell as PieCell,
  Legend,
} from "recharts";
import "../../styles/ClientDashboard.css";

export default function ClientDashboard() {
  // MAIN STATS
  const stats = [
    { label: "My Projects", value: 12, change: "+3.2%" },
    { label: "Payments Made", value: 8, change: "+1.1%" },
    { label: "Pending Bills", value: 4, change: "-2.3%" },
    { label: "Support Tickets", value: 2, change: "+1.8%" },
  ];

  // BAR CHART (example data)
  const barData = [
    { month: "Jan", work: 2 },
    { month: "Feb", work: 1 },
    { month: "Mar", work: 3 },
    { month: "Apr", work: 2 },
    { month: "May", work: 4 },
  ];

  // LINE CHART
  const lineData = [
    { date: "Jun", progress: 20 },
    { date: "Jul", progress: 45 },
    { date: "Aug", progress: 60 },
    { date: "Sep", progress: 75 },
    { date: "Oct", progress: 90 },
  ];

  // PIE CHART
  const pieData = [
    { name: "Completed", value: 6 },
    { name: "Ongoing", value: 4 },
    { name: "On Hold", value: 2 },
  ];

  const COLORS = ["#ffcb05", "#007bff", "#ff5252"];

  return (
    <div className="client-dashboard-container">
      {/* PAGE TITLE */}
      <div className="client-header">
        <h2>Client Dashboard</h2>
        <p className="subtitle">Overview of your project activity</p>
      </div>

      {/* TOP STAT CARDS */}
      <div className="client-stats-grid">
        {stats.map((item) => (
          <div key={item.label} className="client-stat-card">
            <h4>{item.label}</h4>
            <p className="value">{item.value}</p>
            <span
              className={`change ${
                item.change.includes("+") ? "up" : "down"
              }`}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="client-charts-grid">
        {/* BAR CHART */}
        <div className="client-chart-box">
          <h3>Monthly Work Progress</h3>
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#29415c" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="work" radius={[8, 8, 0, 0]}>
                {barData.map((d, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}
        <div className="client-chart-box">
          <h3>Overall Progress</h3>
          <ResponsiveContainer width="100%" height={270}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#ffcb05"
                fill="#ffcb05"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="client-chart-box">
          <h3>Project Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={75}
                label
              >
                {pieData.map((e, i) => (
                  <PieCell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
