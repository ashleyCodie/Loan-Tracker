import MessageModel from "../../schemas/messageModel.js";

const messageGetOne = async (req, res) => {
  let { id } = req.params;

  try {
    const message = await MessageModel.findById(id);
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

export default messageGetOne;