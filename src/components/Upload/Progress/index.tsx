import React from "react";

export interface ProgressProps {
  height?: number;
  width?: number;
  percent?: number;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const { height = 30, width = 200, percent = 0 } = props;

  return (
    <div
      className="outer"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div className="inner" style={{ width: `${(percent * width) / 100}px` }}>
        <span>{percent.toFixed(2) + "%"}</span>
      </div>
    </div>
  );
};

export default Progress;
