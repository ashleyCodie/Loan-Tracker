import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loanList } from "../redux/loanSlice";
import ApprovedBarChart from "../components/ApprovedBarChart";
import SideNavbar from "../components/SideNavbar";

const Approved = () => {
  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth);
  const [approvedTotal, setApprovedTotal] = useState(0.0);
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
      const approvedTotal = loans
        .filter((loan) => loan.loanStatus === "Approved")
        .reduce((acc, loan) => {
          return acc + loan.amount;
        }, 0);
      const finalTotal = total;
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      setApprovedTotal(formatter.format(approvedTotal));
      setFinalTotal(formatter.format(finalTotal));
    };
    calculateTotal();
  }, [loans]);
  return (
    <>
      <div className="text-center text-5xl mt-4 ml-40 mb-10 font-extrabold underline">
        Approved Loans
      </div>
      <p className="text-center text-2xl ml-40">
        Total Approved Loans: {approvedTotal}
      </p>
      <div className="bg-white">
        <SideNavbar />
        <ApprovedBarChart />
      </div>
    </>
  );
};

export default Approved;
