import React from "react";

const SkillCircle = ({ skill }) => {
const radius = 70;
const stroke = 10;  
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (skill.percentage / 100) * circumference;

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#ccc"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#00cc66"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.35s" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="16"
          fill="#fff"
        >
          {skill.percentage}%
        </text>
      </svg>
      <p style={{ color: "white", marginTop: "8px" }}>{skill.name}</p>
    </div>
  );
};

export default SkillCircle;
