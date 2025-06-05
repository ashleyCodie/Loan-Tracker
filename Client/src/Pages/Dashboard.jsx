import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLM from "../components/DashboardLM";
import DashboardLO from "../components/DashboardLO";
import DashboardLP from "../components/DashboardLP";
import { loanList } from "../redux/loanSlice";


const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  

  
  if (user.roles.includes("Loan Officer")) {
    console.log("Loan Officer");
  }
  useEffect(() => {
    dispatch(loanList(user.email));
  }, [user]);


  return (
    <>
      {user.roles.includes("Loan Manager") && <DashboardLM />}
      {user.roles.includes("Loan Officer") && <DashboardLO />}
      {user.roles.includes("Loan Processor") && <DashboardLP />}
    </>
  );
};

export default Dashboard;