import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

// Scatter Chart
const ScatterChartExample = () => {
  const data = [
    { x: 10, y: 30 },
    { x: 40, y: 40 },
    { x: 80, y: 20 },
    { x: 100, y: 60 },
    { x: 120, y: 80 },
  ];

  return (
    <ScatterChart width={400} height={200} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="X" />
      <YAxis type="number" dataKey="y" name="Y" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter name="A Scatter" data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

// Line Chart
const LineChartExample = () => {
  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  ];

  return (
    <LineChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
};

// Bar Chart
const BarChartExample = () => {
  const data = [
    { name: 'Category A', value: 300 },
    { name: 'Category B', value: 500 },
    { name: 'Category C', value: 200 },
  ];

  return (
    <BarChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

// Pie Chart
const PieChartExample = () => {
  const data = [
    { name: 'Category A', value: 300 },
    { name: 'Category B', value: 500 },
    { name: 'Category C', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <PieChart width={400} height={200}>
      <Pie
        data={data}
        cx={200}
        cy={100}
        labelLine={false}
        label={entry => entry.name}
        outerRadius={80}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

// Area Chart
const AreaChartExample = () => {
  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  ];

  return (
    <AreaChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export {
  ScatterChartExample,
  LineChartExample,
  BarChartExample,
  PieChartExample,
  AreaChartExample,
};
