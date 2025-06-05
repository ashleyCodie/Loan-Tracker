import React, { PureComponent } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import { useSelector } from "react-redux";



const ProductionPieChart = () => {
  const { loans } = useSelector((state) => state.loan);
  const COLORS = ["#facc15", "#84cc16", "#dc2626", "#7c3aed"];

const data = [
  { name: 'Submitted', value: loans.filter((loan) => loan.loanStatus === "Submitted").length},
  { name: 'Approved', value: loans.filter((loan) => loan.loanStatus === "Approved").length },
  { name: 'Denied', value: loans.filter((loan) => loan.loanStatus === "Denied").length },
  { name: 'Closed', value: loans.filter((loan) => loan.loanStatus === "Closed").length},
];

  // static demoUrl =
  let demoUrl =
    "https://codesandbox.io/p/sandbox/pie-chart-in-responsive-container-dmhf62";

  return (
    <>
      {/* <h1 className="text-center text-5xl ml-44 mt-10 underline font-extrabold">My Production</h1> */}
      <div
        style={{
          width: "100%",
          height: 300,
          marginLeft: "85px",
          marginTop: "45px",
          paddingTop: "20px",
          backgroundColor: "black",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#ffffff" label>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-4 gap-4 mb-4 pl-16 pb-4 bg-black">
          <div className="text-yellow-400 font-extrabold grid grid-cols-2">
            <svg
              className="w-6 h-6 text-yellow-400 dark:text-yellow-400 ml-40"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clipRule="evenodd"
              />
            </svg>
            Submitted
          </div>
          <div className="text-lime-500  font-extrabold grid grid-cols-2">
            <svg
              className="w-6 h-6 text-lime-500 dark:text-lime-500 ml-40"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clipRule="evenodd"
              />
            </svg>
            Approved
          </div>
          <div className="text-red-600 font-extrabold grid grid-cols-2">
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-600 ml-40"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clipRule="evenodd"
              />
            </svg>
            Denied
          </div>
          <div className="text-violet-600 font-extrabold grid grid-cols-2">
            <svg
              className="w-6 h-6 text-violet-600 dark:text-violet-600 ml-40"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clipRule="evenodd"
              />
            </svg>
            Closed
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductionPieChart