import house from "../assets/moneyandhouse.jpg"

const Contact = () => {
  return (
    <div>
      <h1 className="text-center text-5xl mt-8 underline font-extrabold">
        Contact Us
      </h1>
        <img
                className="mx-auto h-60 w-auto mt-20 mb-10 border border-black"
                src={house}
                alt="Your Company"
              />
      <p className="text-center text-lg font-bold mt-10">Are you interested in signing up for a Loan Tracker Accout for your company?</p>
      <p className="text-center font-bold">Phone: 480-888-2222</p>
      <p className="text-center font-bold mb-20">Email: <span className="underline text-blue-600">loantrackeracct@loantracker.com</span></p>
      <p className="text-center text-lg font-bold mt-10">Already have an accout and need Technical Support?</p>
      <p className="text-center font-bold ">Tech Support: 480-888-4422</p>
      <p className="text-center font-bold mb-20">Email: <span className="underline text-blue-600">techsupport@loantracker.com</span></p>
    </div>
  );
};

export default Contact;