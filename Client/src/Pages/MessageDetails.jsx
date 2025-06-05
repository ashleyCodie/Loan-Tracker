import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getMessage, addMessage } from "../redux/messageSlice";
import SideNavbar from "../components/SideNavbar";
import { usersList } from "../redux/usersSlice";
import { deleteMessage } from "../redux/messageSlice";

const Modal = ({ setShowModal }) => {
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [messageForm, setMessageForm] = useState({
    messageDate: "",
    messageFor: message.messageSender,
    messageSubject: "",
    messageSender: user.email,
    messageBody: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(usersList());
  }, []);

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  const submitMessage = (e) => {
    e.preventDefault();
    dispatch(addMessage({ ...messageForm }));
    setShowModal(false);
    navigate("/inbox")
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
    //   aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      style={{marginLeft: "35%"}}
    >
      <div className="absolute p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-yellow-300 rounded-lg shadow dark:bg-yellow-300">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 text-black transition duration-75 dark:text-black group-hover:text-gray-900 dark:group-hover:text-white"
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
            <h3 className="text-xl font-semibold text-black dark:text-black">
              Send New Message
            </h3>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="text-black bg-transparent hover:bg-white hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-white dark:hover:text-black"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* <!-- Modal body --> */}
          <form onSubmit={submitMessage}>
            <div className="p-4 md:p-5 space-y-4">
              <div className="mb-4 pt-4">
                <label className="block text-black font-bold mb-2">
                  Message Date
                </label>
                <input
                  type="date"
                  id="messageDate"
                  name="messageDate"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={messageForm.messageDate}
                  onChange={(e) =>
                    setMessageForm({
                      ...messageForm,
                      messageDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-black  font-bold mb-2"
                >
                  Send To:
                </label>
                <input
                  value={message.messageSender}
                  // onChange={(e) =>
                  //   setMessageForm({
                  //     ...messageForm,
                  //     messageFor: message.messageSender,
                  //   })
                  // }
                  id="messageFrom"
                  name="messageFrom"
                  className="border rounded w-full text-black py-2 px-3 mb-2"
                  readOnly
                >
                  {/* <option value="default">Select Recipiant</option>
                    {users.map((user, id) => 
                      <option key={id} value={user.email}>{user.email}</option>)} */}
                </input>
              </div>
              <div>
                <label
                  htmlFor="messageSubject"
                  className="block text-black font-bold mb-2"
                >
                  Subject:
                </label>
                <input
                  type="text"
                  id="messageSubject"
                  name="messageSubject"
                  className="border rounded text-black w-full py-2 px-3 mb-2"
                  placeholder="Subject"
                  value={message.messageSubject}
                  // onChange={(e) =>
                  //   setMessageForm({
                  //     ...messageForm,
                  //     messageSubject: message.messageSubject,
                  //   })
                  // }
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-black  font-bold mb-2"
                >
                  Message:
                </label>
                <textarea
                  type="text"
                  id="messageBody"
                  name="messageBody"
                  className="border text-black rounded w-full py-2 px-3 mb-2"
                  placeholder="Type your message here...."
                  value={messageForm.messageBody}
                  onChange={(e) =>
                    setMessageForm({
                      ...messageForm,
                      messageBody: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="messageSender"
                  className="block text-black  font-bold mb-2"
                >
                  From:
                </label>
                <input
                  value={user.email}
                  //   onChange={(e) =>
                  //     setMessageForm({ ...messageForm, messageSender: user.email })
                  // }
                  id="messageSender"
                  name="messageSender"
                  className="border rounded w-full py-2 px-3 mb-2"
                  readOnly
                />
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
                data-modal-hide="default-modal"
                type="submit"
                className="text-green-600 bg-black font-semibold hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-black dark:hover:bg-green-600 dark:focus:ring-green-600 dark:hover:text-black"
              >
                Send
              </button>
              <button
                onClick={() => setShowModal(false)}
                data-modal-hide="default-modal"
                type="button"
                className="text-red-600 ml-2 bg-black font-semibold hover:bg-red-600 dark:hover:text-black focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-black dark:hover:bg-red-600 dark:focus:ring-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const MessageDetails = () => {
  const { success, message } = useSelector((state) => ({
    success: state.message.success,
    message: state.message.message,
  }));
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    console.log("message", message);
  }, [message]);

  useEffect(() => {
    if (id) {
      dispatch(getMessage(id));
    }
  }, []);

  const removeMessage = () => {
    dispatch(deleteMessage(id));
    toast.success("Message Deleted Successfully")
    navigate("/inbox")
    ;
  };

  return (
    <>
      <SideNavbar />
      <div className="text-center mt-10 mb-10 underline text-2xl font-bold">
        Message Details
      </div>
      <div className="bg-white ml-80 me-20 mb-10 pt-10">
        <p className="ml-72">
          <span className="font-bold">Date Sent:</span>{" "}
          {new Date(message.messageDate).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
        <p className="ml-72">
          <span className="font-bold">Message To:</span> {message.messageFor}
        </p>
        <p className="ml-72">
          <span className="font-bold">Message From:</span>{" "}
          {message.messageSender}
        </p>
        <p className="ml-72">
          <span className="font-bold">Subject:</span> {message.messageSubject}
        </p>
        <p className="ml-72">
          <span className="font-bold">Message :</span> {message.messageBody}
        </p>
        <div className="mt-10 ml-72">
          <button
            onClick={() => setShowModal(true)}
            data-modal-hide="default-modal"
            type="button"
           className="text-green-600 mb-10 ml-4 bg-black font-semibold hover:bg-green-600 hover:text-black focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-black dark:hover:bg-green-600 dark:focus:ring-green-600"
          >
            Reply
          </button>

          <button
            onClick={removeMessage}
            type="button"
            className="text-red-600 mb-10 ml-4 bg-red-600 font-semibold hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg  px-5 py-2.5 text-center hover:text-black dark:bg-black dark:hover:bg-red-600 dark:focus:ring-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && <Modal setShowModal={setShowModal} />}
    </>
  );
};

export default MessageDetails;
