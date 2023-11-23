import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

// Stacked Bar Chart
const StackedBarChartExample = () => {
  const data = [
    { name: 'Category A', value1: 300, value2: 150, value3: 50 },
    { name: 'Category B', value1: 400, value2: 200, value3: 100 },
    { name: 'Category C', value1: 200, value2: 300, value3: 150 },
  ];

  return (
    <BarChart width={400} height={200} data={data} stackOffset="sign">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value1" fill="#8884d8" />
      <Bar dataKey="value2" fill="#82ca9d" />
      <Bar dataKey="value3" fill="#ffc658" />
    </BarChart>
  );
};

// Mixed Bar Chart
const MixedBarChartExample = () => {
  const data = [
    { name: 'Category A', value1: 300, value2: 150 },
    { name: 'Category B', value1: 400, value2: 200 },
    { name: 'Category C', value1: 200, value2: 300 },
  ];

  return (
    <BarChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value1" fill="#8884d8" />
      <Bar dataKey="value2" fill="#82ca9d" />
      <Line type="monotone" dataKey="value2" stroke="#ff7300" />
    </BarChart>
  );
};

// Synchronized Area Chart
const SynchronizedAreaChartExample = () => {
  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  ];

  return (
    <ResponsiveContainer width="90%" height={200}>
      <AreaChart data={data}>
        {/* Chart components */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Simple Radial Bar Chart
const RadialBarChartExample = () => {
  const data = [{ name: 'Category A', value: 80 }];

  return (
    <RadialBarChart width={300} height={200} cx={150} cy={100} innerRadius={20} outerRadius={140} data={data}>
      <RadialBar startAngle={90} endAngle={-270} dataKey="value" fill="#8884d8" />
    </RadialBarChart>
  );
};

// Bubble Chart
const BubbleChartExample = () => {
  const data = [
    { x: 200, y: 30, z: 80 },
    { x: 100, y: 200, z: 150 },
    { x: 150, y: 50, z: 120 },
  ];

  return (
    <ScatterChart width={400} height={200}>
      {/* Chart components */}
    </ScatterChart>
  );
};

// Scatter Line of Best Fit Chart
const ScatterLineOfBestFitExample = () => {
  const data = [
    { x: 10, y: 30 },
    { x: 40, y: 40 },
    { x: 80, y: 20 },
    { x: 100, y: 60 },
    { x: 120, y: 80 },
  ];

  return (
    <ScatterChart width={400} height={200}>
      {/* Chart components */}
    </ScatterChart>
  );
};

export {
  StackedBarChartExample,
  MixedBarChartExample,
  SynchronizedAreaChartExample,
  RadialBarChartExample,
  BubbleChartExample,
  ScatterLineOfBestFitExample,
};
