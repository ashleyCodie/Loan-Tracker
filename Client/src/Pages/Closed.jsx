import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loanList } from "../redux/loanSlice";
import ClosedBarChart from "../components/ClosedBarChart";
import SideNavbar from "../components/SideNavbar";

const Closed = () => {
  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth);
  const [closedTotal, setClosedTotal] = useState(0.0);
  const [finalTotal, setFinalTotal] = useState(0.0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loanList(user.email));
  }, [user]);

  useEffect(() => {
    const calculateTotal = () => {
      const total = loans.reduce((acc, loan) => {
        return acc + loan.amount;
      }, 0);
      const closedTotal = loans
        .filter((loan) => loan.loanStatus === "Closed")
        .reduce((acc, loan) => {
          return acc + loan.amount;
        }, 0);
      const finalTotal = total;
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      setClosedTotal(formatter.format(closedTotal));
      setFinalTotal(formatter.format(finalTotal));
    };
    calculateTotal();
  }, [loans]);
  return (
    <>
      <div className="text-center text-5xl mt-4 ml-40 mb-10 font-extrabold underline">
        Closed Loans
      </div>
      <p className="text-center text-2xl ml-40">
        Total Closed Loans: {closedTotal}
      </p>
      <div className="bg-white">
        <SideNavbar />
        <ClosedBarChart />
      </div>
    </>
  );
};

export default Closed;