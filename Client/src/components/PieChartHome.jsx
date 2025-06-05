import React, { PureComponent } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

const data = [
  { name: "Submitted", value: 300 },
  { name: "Approved", value: 602 },
  { name: "Denied", value: 35 },
  { name: "Closed", value: 1012 },
];

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/pie-chart-in-responsive-container-dmhf62";

  render() {
    return (
      <div className="bg-black">
        <h1 className="text-3xl text-white font-extrabold text-center underline  p-8">
          Keep Track of How Manys Loans Are Submitted, Approved, Denied, and
          Closed.
        </h1>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data} fill="#16a34a" label />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}