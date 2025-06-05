import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loanList } from "../redux/loanSlice";
import SideNavbar from "../components/SideNavbar";

const localizer = momentLocalizer(moment);

const ClosingCalendar = () => {
  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(" loanList user.email ", user.email);
    dispatch(loanList(user.email));
  }, [user]);

  useEffect(() => {
    console.log("loans", loans);
  }, [loans]);

  const events = loans.map((loan) => {
    return {
      title: loan.lastName,
      start: loan.estClosingDate,
      end: loan.estClosingDate,
    };
  });

  return (
    <>
      <SideNavbar />
      <div className="ml-72 me-8">
        <h1 className="mt-10 mb-10 text-5xl underline ml-96 pl-36 font-extrabold">
          Closing Calendar
        </h1>

        <div style={{ height: "100vh" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
          >
            
          </Calendar>
        </div>

        <div className=" text-2xl font-extrabold">Estimated Closing Dates:</div>
        {loans.map((loan, index) => (
          <p key={index} className="mb-2 mt-4 text-black dark:text-black ">
            <span className="text-black font-bold"> Borrowers Name:</span>{" "}
            {loan.lastName}, {loan.firstName}{" "}
            <span className="text-black font-bold ml-10">Closing Date:</span>{" "}
            {new Date(loan.estClosingDate).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        ))}
      </div>
    </>
  );
};

export default ClosingCalendar;