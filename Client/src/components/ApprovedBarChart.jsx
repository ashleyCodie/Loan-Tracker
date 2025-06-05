import {useEffect, useState} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { loanList } from "../redux/loanSlice";
import { useSelector, useDispatch } from "react-redux";



const SubmittedBarChart = () => {
    const { loans } = useSelector((state) => state.loan);
    const { user } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.auth);

    const [ gerdaTotal, setGerdaTotal] = useState(0.00)
    const [ alyssonTotal, setAlyssonTotal ] = useState(0.00)
    const [ vallieTotal, setVallieTotal ] = useState(0.00)
    const [ aniyaTotal, setAniyaTotal ] = useState(0.00)
    const [ ginaTotal, setGinaTotal ] = useState(0.00)
    const [ courtneyTotal, setCourtneyTotal ] = useState(0.00)

    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(loanList(user.email));
     }, [user]);

     useEffect(() => {
        const calculateTotal = () => {
        const total = loans.reduce((acc, loan) => { return acc + loan.amount }, 0) 
        const gerdaTotal = loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Gerda").reduce((acc, loan) => { return acc + loan.amount }, 0)
        const alyssonTotal = loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Alysson").reduce((acc, loan) => { return acc + loan.amount }, 0)
        const vallieTotal = loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Alysson").reduce((acc, loan) => { return acc + loan.amount }, 0)
        const aniyaTotal = loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Aniya").reduce((acc, loan) => { return acc + loan.amount }, 0)
        const ginaTotal = loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Gina").reduce((acc, loan) => { return acc + loan.amount }, 0)
        const courtneyTotal = loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Courtney").reduce((acc, loan) => { return acc + loan.amount }, 0)
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        setGerdaTotal(formatter.format(gerdaTotal))
        setAlyssonTotal(formatter.format(alyssonTotal))
        setVallieTotal(formatter.format(vallieTotal))
        setAniyaTotal(formatter.format(aniyaTotal))
        setGinaTotal(formatter.format(ginaTotal))
        setCourtneyTotal(formatter.format(courtneyTotal))
       
      }
      calculateTotal()
      }, [loans])


    const data = [
        {
          name: 'Gerda',
          uv:  loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Gerda").reduce((acc, loan) => { return acc + loan.amount }, 0),
          pv:  gerdaTotal,
          amt: gerdaTotal,
        },
        {
          name: 'Alysson',
          uv: loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Alysson").reduce((acc, loan) => { return acc + loan.amount }, 0),
          pv: alyssonTotal,
          amt: alyssonTotal,
        },
        {
          name: 'Vallie',
          uv: loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Vallie").reduce((acc, loan) => { return acc + loan.amount }, 0),
          pv: vallieTotal,
          amt: vallieTotal,
        },
        {
          name: 'Aniya',
          uv: loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Aniya").reduce((acc, loan) => { return acc + loan.amount }, 0),
          pv: aniyaTotal,
          amt: aniyaTotal,
        },
        {
          name: 'Gina',
          uv: loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Gina").reduce((acc, loan) => { return acc + loan.amount }, 0),
          pv: ginaTotal,
          amt: ginaTotal,
        },
        {
          name: 'Courtney',
          uv: loans.filter(loan => loan.loanStatus === "Approved" && loan.loanOfficer.firstName === "Courtney").reduce((acc, loan) => { return acc + loan.amount }, 0),
          pv: courtneyTotal,
          amt: courtneyTotal,
        },
      //   {
      //     name: 'Page G',
      //     uv: 3490,
      //     pv: 4300,
      //     amt: 2100,
      //   },
      ];

    const colors = ['#16a34a', '#16a34a', '#16a34a', '#16a34a', '#16a34a', '#16a34a', '#16a34a'];

    let demoUrl = 
    'https://codesandbox.io/p/sandbox/bar-chart-with-customized-shape-jpsj68'

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

  return (
    <BarChart
    style={{ marginLeft: "450px"}}
      width={1300}
      height={700}
      data={data}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" style={{ fontSize: "30px", marginLeft: "100px"}}/>
      <YAxis style={{ fontSize: "12px", marginLeft: "100px"}}/>
      <Bar dataKey="uv" fill="#ffffff" shape={<TriangleBar />} label={{ position: 'top', fontSize: "20px"}}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
}

export default SubmittedBarChart