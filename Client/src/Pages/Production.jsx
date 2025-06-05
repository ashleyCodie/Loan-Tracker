import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { loanList } from "../redux/loanSlice";
import SideNavbar from "../components/SideNavbar"
import ProductionPieChart from "../components/ProductionPieChart"



const Production = () => {
  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth);
  const [commission, setCommission] = useState(0.00)
  const [commissionLP, setCommissionLP] = useState(0.00)
  const [commissionLM, setCommissionLM] = useState(0.00)
  const [approvedTotal, setApprovedTotal ] = useState(0.00)
  const [submittedTotal, setSubmittedTotal ] = useState(0.00)
  const [deniedTotal, setDeniedTotal ] = useState(0.00)
  const [closedTotal, setClosedTotal ] = useState(0.00)
  const [finalTotal, setFinalTotal ] = useState(0.00)
  
  const dispatch = useDispatch();
  

        useEffect(() => {
          dispatch(loanList(user.email));
        }, [user]);

        useEffect(() => {
          const calculateTotal = () => {
          const total = loans.reduce((acc, loan) => { return acc + loan.amount }, 0) 
          const submittedTotal = loans.filter(loan => loan.loanStatus === "Submitted").reduce((acc, loan) => { return acc + loan.amount }, 0)
          const approvedTotal = loans.filter(loan => loan.loanStatus === "Approved").reduce((acc, loan) => { return acc + loan.amount }, 0)
          const deniedTotal = loans.filter(loan => loan.loanStatus === "Denied").reduce((acc, loan) => { return acc + loan.amount }, 0)
          const closedTotal = loans.filter(loan => loan.loanStatus === "Closed").reduce((acc, loan) => { return acc + loan.amount }, 0)
          const finalTotal = total - deniedTotal
          const commission = finalTotal * 0.003
          const commissionLP = finalTotal * 0.001
          const commissionLM = finalTotal * 0.005
          const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
          setCommission(formatter.format(commission))
          setCommissionLP(formatter.format(commissionLP))
          setCommissionLM(formatter.format(commissionLM))
          setApprovedTotal(formatter.format(approvedTotal))
          setSubmittedTotal(formatter.format(submittedTotal))
          setDeniedTotal(formatter.format(deniedTotal))
          setClosedTotal(formatter.format(closedTotal))
          setFinalTotal(formatter.format(finalTotal))
        }
        calculateTotal()
        }, [loans])
        

  return (
    <>
    <div className="h-scroll">
   {user.roles.includes("Loan Manager") && (<h1 className="text-center text-5xl ml-44 mt-10 underline font-extrabold">My Teams Production</h1>)}
   {user.roles.includes("Loan Processor") && (<h1 className="text-center text-5xl ml-44 mt-10 underline font-extrabold">My Production</h1>)}
   {user.roles.includes("Loan Officer") && (<h1 className="text-center text-5xl ml-44 mt-10 underline font-extrabold">My Production</h1>)}  
   {user.roles.includes("Underwriter") && (<h1 className="text-center text-5xl ml-44 mt-10 underline font-extrabold">My Production</h1>)}    
     <ProductionPieChart />
   
      <SideNavbar />
          <div className="ml-40 text-center">
          <h1 className="text-2xl mt-20 underline font-bold text-yellow-400 bg-black">Submitted</h1>
              {loans
              .filter(loan => loan.loanStatus === "Submitted")
              .map((loan, index) =>
              <ul key={index} className=""><span className="font-bold">Loan Number:</span>{loan.id} <span className="font-bold ml-10">Borrower:</span>{loan.lastName}, {loan.firstName} <span className="font-bold ml-10">Loan Amount:</span>${loan.amount}</ul>
            )}
            <h4 className= "text-center text-xl font-extrabold">Total: {submittedTotal} </h4>

          <h1 className="text-2xl mt-8 underline font-bold text-lime-500 bg-black">Approved</h1>
              {loans
              .filter(loan => loan.loanStatus === "Approved")
              .map((loan, index) =>
              <ul key={index}><span className="font-bold">Loan Number:</span>{loan.id} <span className="font-bold ml-10">Borrower:</span>{loan.lastName}, {loan.firstName} <span className="font-bold ml-10">Loan Amount:</span>${loan.amount}</ul>
            )}
            <h4 className= "text-center text-xl font-extrabold">Total: {approvedTotal} </h4>

                  <h1 className=" mt-8 text-red-600 bg-black"><span className="text-2xl mt-8 underline font-bold text-red-600 bg-black">Denied</span> -denied loans not include in the totals below</h1>
              {loans
              .filter(loan => loan.loanStatus === "Denied")
              .map((loan, index) =>
              <ul key={index}><span className="font-bold">Loan Number:</span>{loan.id} <span className="font-bold ml-10">Borrower:</span>{loan.lastName}, {loan.firstName} <span className="font-bold ml-10">Loan Amount:</span>${loan.amount}</ul>
              )}
              <h4 className= "text-center text-xl font-extrabold">Total: {deniedTotal}</h4>

              <h1 className="text-2xl mt-8 underline font-bold text-violet-600 bg-black">Closed</h1>
              {loans
              .filter(loan => loan.loanStatus === "Closed")
              .map((loan, index) =>
              <ul key={index}><span className="font-bold">Loan Number:</span>{loan.id} <span className="font-bold ml-10">Borrower:</span>{loan.lastName}, {loan.firstName} <span className="font-bold ml-10">Loan Amount:</span>${loan.amount}</ul>
              )}
              <h4 className= "text-center text-xl font-extrabold">Total: {closedTotal} </h4>

              <h4 className= "text-center text-xl font-extrabold bg-yellow-400 mt-10">Total Loan Production: {finalTotal}</h4>
              {user.roles.includes("Loan Processor") &&
              <h4 className= "text-center text-xl font-extrabold bg-yellow-400 mt-10 mb-10"> Your Commission: {commissionLP}</h4>}
              {user.roles.includes("Loan Officer") &&
              <h4 className= "text-center text-xl font-extrabold bg-yellow-400 mt-10 mb-10"> Your Commission: {commission}</h4>}
              {user.roles.includes("Loan Manager") &&
              <h4 className= "text-center text-xl font-extrabold bg-yellow-400 mt-10 mb-10"> Your Commission: {commissionLM}</h4>}
            </div>
    </div>
    </>
  )
}

export default Production