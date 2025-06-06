
import UserModel from "../../schemas/userModel.js"

const usersGetAll = async (req, res) => {
   try {
        const users = await UserModel.find()
        res.status(200).json({"success": true, "users": users})  
    
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
}
export default usersGetAll