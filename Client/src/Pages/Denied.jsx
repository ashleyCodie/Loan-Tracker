import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loanList } from "../redux/loanSlice";
import DeniedBarChart from "../components/DeniedBarChart";
import SideNavbar from "../components/SideNavbar";

const Denied = () => {
  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth);
  const [deniedTotal, setDeniedTotal] = useState(0.0);
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
      const deniedTotal = loans
        .filter((loan) => loan.loanStatus === "Denied")
        .reduce((acc, loan) => {
          return acc + loan.amount;
        }, 0);
      const finalTotal = total;
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      setDeniedTotal(formatter.format(deniedTotal));
      setFinalTotal(formatter.format(finalTotal));
    };
    calculateTotal();
  }, [loans]);
  return (
    <>
      <div className="text-center text-5xl mt-4 ml-40 mb-10 font-extrabold underline">
        Denied Loans
      </div>
      <p className="text-center text-2xl ml-40">
        Total Denied Loans: {deniedTotal}
      </p>
      <div className="bg-white">
        <SideNavbar />
        <DeniedBarChart />
      </div>
    </>
  );
};

export default Denied;