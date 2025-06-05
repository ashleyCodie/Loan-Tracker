import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const colors = ['#16a34a', '#16a34a', '#16a34a', '#16a34a', '#16a34a', '#16a34a', '#16a34a'];

const data = [
  {
    name: 'Ashley',
    uv: 4000000,
    pv: 2400000,
    amt: 2400000,
  },
  {
    name: 'Morgan',
    uv: 3000000,
    pv: 1398000,
    amt: 2210000,
  },
  {
    name: 'Danielle',
    uv: 2000000,
    pv: 9800000,
    amt: 2290000,
  },
  {
    name: 'David',
    uv: 2780000,
    pv: 3908000,
    amt: 2000000,
  },
  {
    name: "Maddisan",
    uv: 1890000,
    pv: 4800000,
    amt: 2181000,
  },
  {
    name: 'Payson',
    uv: 2390000,
    pv: 3800000,
    amt: 2500000,
  },
  {
    name: 'Liliana',
    uv: 3490000,
    pv: 4300000,
    amt: 2100000,
  },
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function App() {
  return (
    <div className="pl-96">
    <BarChart
      width={900}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 200,
        bottom: 50,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#ffffff" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </div>
  );
}

App.demoUrl = 'https://codesandbox.io/p/sandbox/bar-chart-with-customized-shape-jpsj68';