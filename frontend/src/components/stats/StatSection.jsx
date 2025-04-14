import React from "react";
import StatCard from "./StatCard";

export default function StatsSection({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
}
