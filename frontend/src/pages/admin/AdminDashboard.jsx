// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Cell,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell as PieCell,
//   Legend,
// } from "recharts";
// import "../../styles/AdminDashboard.css";

// export default function AdminDashboard() {
//   // MAIN STATS
//   const stats = [
//     { label: "Total Users", value: 1250, change: "+4.1%" },
//     { label: "Total Projects", value: 32, change: "+1.2%" },
//     { label: "Demo Requests", value: 48, change: "+6.0%" },
//     { label: "Contacts Received", value: 21, change: "-2.5%" },
//   ];

//   // BAR CHART
//   const barData = [
//     { month: "Jan", requests: 12 },
//     { month: "Feb", requests: 18 },
//     { month: "Mar", requests: 30 },
//     { month: "Apr", requests: 20 },
//     { month: "May", requests: 27 },
//   ];

//   // LINE CHART
//   const lineData = [
//     { date: "Jun", users: 1100 },
//     { date: "Jul", users: 1120 },
//     { date: "Aug", users: 1150 },
//     { date: "Sep", users: 1170 },
//     { date: "Oct", users: 1250 },
//   ];

//   // PIE CHART
//   const pieData = [
//     { name: "Completed", value: 18 },
//     { name: "Ongoing", value: 10 },
//     { name: "On Hold", value: 4 },
//   ];

//   const COLORS = ["#ffcb05", "#007bff", "#ff5252"];

//   return (
//     <div className="admin-dashboard-container">
//       {/* PAGE TITLE */}
//       <div className="admin-header">
//         <h2>Dashboard Overview</h2>
//         <p className="subtitle">Insights & analytics for admin activity</p>
//       </div>

//       {/* TOP STAT CARDS */}
//       <div className="top-stats-grid">
//         {stats.map((item) => (
//           <div key={item.label} className="stat-card">
//             <h4>{item.label}</h4>
//             <p className="value">{item.value}</p>
//             <span
//               className={`change ${
//                 item.change.includes("+") ? "up" : "down"
//               }`}
//             >
//               {item.change}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* CHARTS SECTION */}
//       <div className="charts-grid">
//         {/* BAR CHART */}
//         <div className="chart-box">
//           <h3>Demo Requests (Monthly)</h3>
//           <ResponsiveContainer width="100%" height={270}>
//             <BarChart data={barData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#29415c" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="requests" radius={[8, 8, 0, 0]}>
//                 {barData.map((d, i) => (
//                   <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* LINE CHART */}
//         <div className="chart-box">
//           <h3>User Growth Trend</h3>
//           <ResponsiveContainer width="100%" height={270}>
//             <LineChart data={lineData}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="users"
//                 stroke="#ffcb05"
//                 fill="#ffcb05"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* PIE CHART */}
//         <div className="chart-box">
//           <h3>Projects Status Distribution</h3>
//           <ResponsiveContainer width="100%" height={270}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={45}
//                 outerRadius={75}
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <PieCell key={index} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { getAdminStats } from "../../services/adminService";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#ffcb05", "#007bff", "#ff5252"];

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (err) {
      console.error("Admin stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="admin-dashboard-container">
      
      {/* PAGE TITLE */}
      <div className="admin-header">
        <h2>Dashboard Overview</h2>
        <p className="subtitle">Insights & analytics for admin activity</p>
      </div>

      {/* TOP STATS */}
      <div className="top-stats-grid">
        {stats.topCards.map((item) => (
          <div key={item.label} className="stat-card">
            <h4>{item.label}</h4>
            <p className="value">{item.value}</p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        
        {/* MONTHLY DEMO REQUESTS */}
        <div className="chart-box">
          <h3>Demo Requests (Monthly)</h3>
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={stats.demoChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#29415c" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests">
                {stats.demoChart.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* USER GROWTH */}
        <div className="chart-box">
          <h3>User Growth Trend</h3>
          <ResponsiveContainer width="100%" height={270}>
            <LineChart data={stats.userGrowth}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#ffcb05" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PROJECT STATUS DISTRIBUTION */}
        <div className="chart-box">
          <h3>Projects Status Distribution</h3>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={stats.projectDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={75}
                label
              >
                {stats.projectDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
