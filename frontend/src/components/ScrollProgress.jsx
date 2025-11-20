import React, { useEffect, useState } from "react";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScroll(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress">
      <svg viewBox="0 0 120 120" className="scroll-svg">
        <polygon
          points="60,5 115,35 115,85 60,115 5,85 5,35"
          className="progress-bg"
        />
        <polygon
          points="60,5 115,35 115,85 60,115 5,85 5,35"
          className="progress-fill"
          style={{
            strokeDasharray: 330,
            strokeDashoffset: 330 - (scroll / 100) * 330,
          }}
        />
      </svg>
      <div className="arrow">↑</div>
    </div>
  );
}
