
import LoanModel from "../../schemas/loanModel.js";

const loanGetOne = async (req, res) => {
  let { id } = req.params;

  try {
    const loan = await LoanModel.findById(id);
    res.status(200).json(loan);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

export default loanGetOne;