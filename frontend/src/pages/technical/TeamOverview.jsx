import React from "react";
import "../../styles/TechteamOverview.css";

export default function TeamOverview() {
  const team = [
    { name: "Rahul Sharma", role: "Frontend Developer" },
    { name: "Priya Verma", role: "Backend Developer" },
    { name: "Ankit Kumar", role: "UI/UX Designer" },
    { name: "Simran Kaur", role: "QA Tester" },
  ];

  return (
    <div className="team-overview">

      <div className="page-title">Team Overview</div>

      <div className="team-grid">
        {team.map((member, i) => (
          <div className="team-card" key={i}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
