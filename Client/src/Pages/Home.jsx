import PieChartHome from "../components/PieChartHome"
import BarChartHome from "../components/BarChartHome"
import CalendarHome from "../components/CalendarHome"


const Home = () => {


  return (
    <div className="p-10">
      <p className="text-2xl"> The Mortgage <strong>Loan Tracker</strong> is a software tool designed to manage and monitor your team at various stages of mortgage loan processing, from origination to closing. It helps lenders and loan officers keep track of loan production, status, and the teams involved in post-production activities. Here's how The Loan Tracker works:</p>
      <div className="p-10">
      <ul>
        <li><strong>Loan Origination: </strong> The tracker would record the initial application details, including borrower information, property details, loan amount, and terms. It would also track the initial underwriting process, where the lender evaluates the borrower's creditworthiness and the property's value.</li>
        <li><strong>Loan Status:</strong> The tracker would update the status of each loan application as it moves through different stages, such as underwriting, appraisal, title search, and insurance. It would provide real-time updates on the progress of each loan, allowing loan officers to identify any bottlenecks or issues that need to be addressed.</li>
        <li><strong>Processing: </strong> The tracker would assign each loan to a specific team or individual responsible for processing it. This could include underwriters, loan processors, closing agents, and other relevant personnel. The tracker would track the workload and performance of each team, ensuring that loans are processed efficiently and accurately.</li>
        <li><strong>Post-Production Activities:</strong> After a loan is approved and closed, the tracker would help manage post-production activities, such as record-keeping, compliance, and customer service. It would track any post-closing issues or concerns, such as late payments or escrow shortages, and alert the appropriate team members to take action.</li>
        <li><strong>Reporting and Analytics:</strong> The tracker would generate reports and analytics on loan production, performance, and team productivity. This would help lenders identify trends, measure performance, and make data-driven decisions to improve their operations.</li>
      </ul>
      </div>
      <PieChartHome />
      <div className="bg-white">
        <h1 className="text-3xl text-black font-extrabold text-center underline p-8 ">Keep Track of Production Amounts For Each Loan Officer.</h1>
      <BarChartHome />
      </div>
      <div className="text-3xl text-white font-extrabold text-center underline p-8">Keep Track Of Closing Dates for Each Borrower and Get Notified of Past Due Closing Dates.</div>
      <CalendarHome />
      <p className="text-2xl mt-10"> The Mortgage <strong>Loan Tracker</strong> is a must have software tool to enhance production, communication of your team, and to easily review 
      the status of the loans your team is working on. Make sure processing is done effectively and scheduled closing deadlines are met. Help your borrowers feel like the process of 
      making one of the biggest purchases of thier lives goes smoothly each step of the way.</p>

    </div>
  )
}

export default Home