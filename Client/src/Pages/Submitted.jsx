import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { loanList } from "../redux/loanSlice";
import SubmittedBarChart from "../components/SubmittedBarChart"
import SideNavbar from '../components/SideNavbar'

const Submitted = () => {
    const { loans } = useSelector((state) => state.loan);
    const { user } = useSelector((state) => state.auth);
    const [submittedTotal, setSubmittedTotal ] = useState(0.00)
    

    const dispatch = useDispatch();

        useEffect(() => {
              dispatch(loanList(user.email));
            }, [user]);

            useEffect(() => {
                const calculateTotal = () => {
                const total = loans.reduce((acc, loan) => { return acc + loan.amount }, 0) 
                const submittedTotal = loans.filter(loan => loan.loanStatus === "Submitted").reduce((acc, loan) => { return acc + loan.amount }, 0)
                const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                setSubmittedTotal(formatter.format(submittedTotal))
              }
              calculateTotal()
              }, [loans])
  return (
    <>
    <div className="text-center text-5xl mt-4 ml-40 mb-10 font-extrabold underline" >Submitted Loans</div>
    <p className="text-center text-2xl ml-40">Total Submitted Loans: {submittedTotal}</p>
    <div className="bg-white">
    <SideNavbar />
    <SubmittedBarChart />
    </div>
    </>
  )
}

export default Submitted