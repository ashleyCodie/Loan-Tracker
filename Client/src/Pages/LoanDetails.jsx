import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getLoan, updateLoan } from "../redux/loanSlice";
import SideNavbar from "../components/SideNavbar"



const Modal = ({setShowModal}) => {
  const navigate = useNavigate();
  
  return (
    <div 
    id="default-modal" 
    tabIndex="-1" 
    aria-hidden="true" 
    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    style={{marginLeft: "35%", marginTop: "5%"}}
    >

    <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-black rounded-lg shadow dark:bg-black">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-green-600 transition duration-75 dark:text-green-600 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-600">
                    Success! Loan Has been updated.
                </h3>
                <button 
                onClick={() => setShowModal(false)}
                type="button" 
                className="text-black bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-black dark:hover:text-black" 
                data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-white dark:text-white">
                   You have successfully updated this loan. 
                </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                onClick={() => navigate("/dashboard")}
                data-modal-hide="default-modal" 
                type="button" 
                className="text-black bg-green-600 font-semibold hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-400 dark:focus:ring-green-600">Close</button>
            </div>
        </div>
    </div>
</div>
  )
}


const LoanDetails = () => {
  const { id } = useParams();
  const { success, loan } = useSelector((state) => ({
    success: state.loan.success,
    loan: state.loan.loan,
  }));
  const { user } = useSelector((state) => state.auth);

  const [loanForm, setLoanForm] = useState({
    dateSubmitted: "",
    firstName: "",
    lastName: "",
    amount: 0,
    type: ["Purchase"],
    loanStatus: ["Submitted"],
    department: ["Processing"],
    loanManager: {},
    loanOfficer: {},
    loanProcessor: {},
    loanUnderwriter: {},
    tasks: [],
    estClosingDate: "",
    closingDate: "",
    notes: "",
  });

  const [newTaskForm, setNewTaskForm] = useState({
    taskName: "",
    startDate: "",
    completed: "",
    assignedTo: "Processing",
  });

  const [ showModal, setShowModal ] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewTaskForm = () => {
    setLoanForm({ ...loanForm, tasks: [...loanForm.tasks, newTaskForm] });
    setNewTaskForm({
      taskName: "",
      startDate: "",
      completed: "",
      assignedTo: "Processing",
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateLoan({ id, loan: loanForm }));
    console.log("loanForm", loanForm);
    setShowModal(true);
  };



  // Get loan on page load
  useEffect(() => {
    if (id) {
      dispatch(getLoan(id));
    }
  }, []);

  // When get loan is done, update form
  useEffect(() => {
    setLoanForm(loan)
  }, [loan]);


  useEffect(() => {
    console.log("loanForm", loanForm)
    }, [loanForm])

  return (
    <>
    <SideNavbar />
      <section className="ml-40">
        <div className=" m-auto w-8/12 py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Update Loan
              </h2>

              <div className="mb-4 pt-4">
                <label className="block text-gray-700  font-bold mb-2">
                  Submission Date
                </label>
                <input
                  type="date"
                  id="dateSubmitted"
                  name="dateSubmitted"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={loanForm.dateSubmitted.split("T")[0]}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, dateSubmitted: e.target.value })
                  }
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Borrowers First Name
                </label>
                <input
                  value={loanForm.firstName}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, firstName: e.target.value })
                  }
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="First Name"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Borrowers Last Name
                </label>
                <input
                  value={loanForm.lastName}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, lastName: e.target.value })
                  }
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Last Name"
                  required
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Loan Amount
                </label>
                <input
                  value={loanForm.amount}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, amount: e.target.value })
                  }
                  type="text"
                  id="amount"
                  name="amount"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Loan Amount"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  value={loanForm.type[0]}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, type: e.target.value })
                  }
                >
                  <option value="Purchase">Purchase</option>
                  <option value="Refinance">Refinance</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Loan Status
                </label>
                <select
                  id="loanStatus"
                  name="loanStatus"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={loanForm.loanStatus}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, loanStatus: e.target.value })
                  }
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={loanForm.department}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, department: e.target.value })
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Underwriting">Underwriting</option>
                  <option value="Docs Out">Docs Dept</option>
                  <option value="Funding">Funding</option>
                  <option value="Closing">Closing</option>
                
                </select>
              </div>

    <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div className="mb-4 ">
                  <label className="block text-gray-700 font-bold mb-2">
                    Loan Manager: First Name
                  </label>
                  <input
                    type="text"
                    id="loanManager"
                    name="loanManager"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Manager"
                    required
                    value={loanForm.loanManager.firstName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanManager: {
                          ...loanForm.loanManager,
                          firstName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="loanManagerLastName"
                    name="loanManager LastName"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Manager LastName"
                    required
                    value={loanForm.loanManager.lastName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanManager: {
                          ...loanForm.loanManager,
                          lastName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="mb-4 ">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="loanManagerEmail"
                    name="loanManager Email"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Manager Email"
                    required
                    value={loanForm.loanManager.email}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanManager: {
                          ...loanForm.loanManager,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                  <span className="underline">Loan Officer:</span> First Name
                  </label>
                  <input
                    type="text"
                    id="loanOfficer"
                    name="loanOfficer"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Officer"
                    required
                    value={loanForm.loanOfficer.firstName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanOfficer: {
                          ...loanForm.loanOfficer,
                          firstName: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="loanOfficer"
                    name="loanOfficer"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Officer"
                    required
                    value={loanForm.loanOfficer.lastName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanOfficer: {
                          ...loanForm.loanOfficer,
                          lastName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="loanOfficer"
                    name="loanOfficer"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Officer"
                    required
                    value={loanForm.loanOfficer.email}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanOfficer: {
                          ...loanForm.loanOfficer,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                  <span className="underline">Loan Processor: </span>First Name
                  </label>
                  <input
                    type="text"
                    id="loanProcessor"
                    name="loanProcessor"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Processor"
                    required
                    value={loanForm.loanProcessor.firstName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanProcessor: {
                          ...loanForm.loanProcessor,
                          firstName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="loanProcessor"
                    name="loanProcessor"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Processor"
                    required
                    value={loanForm.loanProcessor.lastName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanProcessor: {
                          ...loanForm.loanProcessor,
                          lastName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="loanProcessor"
                    name="loanProcessor"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Processor"
                    required
                    value={loanForm.loanProcessor.email}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanProcessor: {
                          ...loanForm.loanProcessor,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    <span className="underline">Loan Underwriter:</span> First Name
                  </label>
                  <input
                    type="text"
                    id="loanUnderwriter"
                    name="loanUnderwriter"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Underwriter"
                    required
                    value={loanForm.loanUnderwriter.firstName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanUnderwriter: {
                          ...loanForm.loanUnderwriter,
                          firstName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="loanUnderwriter"
                    name="loanUnderwriter"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Underwriter"
                    required
                    value={loanForm.loanUnderwriter.lastName}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanUnderwriter: {
                          ...loanForm.loanUnderwriter,
                          lastName: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="loanUnderwriter"
                    name="loanUnderwriter"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Loan Underwriter"
                    required
                    value={loanForm.loanUnderwriter.email}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        loanUnderwriter: {
                          ...loanForm.loanUnderwriter,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>


{/** Tasks being added for the first time */}
              <div className="grid gap-6 mb-6 md:grid-cols-5">
                <div>
                  <label
                    htmlFor="taskName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Add Task:
                  </label>
                  <input
                    value={newTaskForm.taskName}
                    onChange={(e) =>
                      setNewTaskForm({
                        ...newTaskForm,
                        taskName: e.target.value,
                      })
                    }
                    type="text"
                    id="taskName"
                    className="border rounded w-full py-2 px-4 mb-2"
                    placeholder="New Task"
                  />
                </div>
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Start Date:
                  </label>
                  <input
                    value={newTaskForm.startDate === null ? newTaskForm.startDate.split("T")[0] : ""}
                    onChange={(e) =>
                      setNewTaskForm({
                        ...newTaskForm,
                        startDate: e.target.value,
                      })
                    }
                    type="date"
                    id="startDate"
                    className="border rounded w-full py-2 px-3 mb-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="completed"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Completed:
                  </label>
                  <input
                    value={newTaskForm.completed === null ? newTaskForm.completed.split("T")[0] : ""}
                    onChange={(e) =>
                      setNewTaskForm({
                        ...newTaskForm,
                        completed: e.target.value,
                      })
                    }
                    type="date"
                    id="completed"
                    className="border rounded w-full py-2 px-3 mb-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="assignedTo"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Assigned To:
                  </label>
    
                  <select
                    value={loanForm.tasks.assignedTo}
                    onChange={(e) =>
                      setLoanForm({
                        ...loanForm,
                        assignedTo: e.target.value,
                      })
                    }
                    id="department"
                    name="department"
                    className="border rounded w-full py-2 px-3 mb-2"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Underwriting">Underwriting</option>
                    <option value="Docs Out">Docs Dept</option>
                    <option value="Funding">Funding</option>
                    <option value="Closing">Closing</option>
                  </select>
                </div>
                <button
                  onClick={addNewTaskForm}
                  type="button"
                  className="me-0 bg-green-600 ml-10 mt-9 w-8 h-8 p-0 hover:bg-green-400 border border-black"
                >
                  <svg
                    className="w-6 h-6 me-0 ml-1 text-gray-800 dark:text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                </button>
              </div>

{/** tasks already set that just need to be updated */}
              <h1 className="text-xl underline font-extrabold">
                Tasks To Be Completed:
              </h1>
              {loanForm.tasks.map((task, index) => (
                <div key={index} className="grid gap-6 mb-6 md:grid-cols-5">
                  <div>
                    <input
                      key={task.id}
                      value={task.taskName}
                      readOnly={true}
                      type="text"
                      id="taskName"
                      className=" w-full py-2 px-4 mb-2 mt-8 font-bold"
                      placeholder="New Task"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-gray-700  mb-2"
                    >
                      Start Date:
                    </label>
                    <input
                      value={task.startDate.split("T")[0]}
                      onChange={(e) =>
                        setLoanForm({
                          ...loanForm,
                          tasks: loanForm.tasks.map((tk) => {
                            console.log(task, tk)
                            return task.id === tk.id
                              ? { ...tk, startDate: e.target.value }
                              : tk
                        }),
                        })
                      }
                      type="date"
                      id="startDate"
                      className="border rounded w-full py-2 px-3 mb-2"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="completed"
                      className="block text-gray-700 mb-2"
                    >
                      Completed:
                    </label>
                    <input
                      value={task.completed ? task.completed.split("T")[0] : ""}
                      onChange={(e) =>
                        setLoanForm({
                          ...loanForm,
                          tasks: loanForm.tasks.map((tk) =>
                            task.id === tk.id
                              ? { ...tk, completed: e.target.value }
                              : tk
                          ),
                        })
                      }
                      type="date"
                      id="completed"
                      className="border rounded w-full py-2 px-3 mb-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="assignedTo"
                      className="block text-gray-700  mb-2"
                    >
                      Assigned To:
                    </label>
                    <select
                      value={task.assignedTo}
                      onChange={(e) =>
                        setLoanForm({
                          ...loanForm,
                          tasks: loanForm.tasks.map((tk) =>
                            task.id === tk.id
                              ? { ...tk, assignedTo: e.target.value }
                              : tk
                          ),
                        })
                      }
                      id="department"
                      name="department"
                      className="border rounded w-full py-2 px-3 mb-2"
                      required
                    >
                      <option value="Processing">Processing</option>
                      <option value="Underwriting">Underwriting</option>
                      <option value="Docs Out">Docs Dept</option>
                      <option value="Funding">Funding</option>
                      <option value="Closing">Closing</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="mb-4 pt-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Estimated Closing Date
                </label>
                <input
                  type="date"
                  id="estClosingDate"
                  name="estClosingDate"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value= {loanForm.estClosingDate.split("T")[0]}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, estClosingDate: e.target.value })
                  }
                />
              </div>

              <div className="mb-4 pt-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Notes:
                </label>
                <textarea
                  type="text"
                  id="notes"
                  name="notes"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Loan Notes"
                  value={loanForm.notes}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, notes: e.target.value })
                  }
                />
              </div>


              <div className="mb-4 pt-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Closing Date
                </label>
                <input
                  type="date"
                  id="closingDate"
                  name="closingDate"
                  className="border rounded w-full py-2 px-3 mb-2"
                  // value={loanForm.closingDate.split("T")[0]}
                  onChange={(e) =>
                    setLoanForm({ ...loanForm, closingDate: e.target.value })
                  }
                />
              </div>

              <div>
                <button
                  className="btn btn-primary bg-green-600 hover:bg-green-400 text-Black font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Loan
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {showModal && <Modal setShowModal={setShowModal} />}
    </>
  );
};

export default LoanDetails;