import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { usersList } from "../redux/usersSlice";
import SideNavbar from "../components/SideNavbar"

const Directory = () => {
    const { users } = useSelector((state) => state.users);
  

    const dispatch = useDispatch();

      useEffect(() => {
        dispatch(usersList());
      }, []);

      useEffect(() => {
        console.log("users", users);
      }, [users]);
      

  return (
    <>
    <SideNavbar />
    
    <h1 className="text-4xl underline text-center p-10 ml-40 font-bold">Office Directory</h1>
    <table className="p-10 ml-96">
        <thead className="p-10 ">
            <tr className="">
            <th className="">  
               
                </th>
                <th className="">  
                    <span className="flex p-2 ml-4 items-center text-2xl underline border-solid border-2 border-black">
                Name</span>
                </th>
                <th>  
                    <span className="flex p-2 items-center text-2xl underline border-solid border-2 border-black">
                Username</span>
                </th>
                <th>  
                    <span className="flex p-2 items-center text-2xl underline border-solid border-2 border-black">
                Email</span>
                </th>
                <th>  
                    <span className="flex p-2 items-center text-2xl underline border-solid border-2 border-black">
                Number</span>
                </th>
                <th>  
                    <span className="flex p-2 items-center text-2xl underline border-solid border-2 border-black">
                Position</span>
                </th>
            </tr>
        </thead>
      
     <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                  
                  <img
              className="w-16 h-16 rounded-full mb-2"
              src={
                new URL(
                  `../assets/${user.avatar}`,
                  import.meta.url
                ).href
              }
              alt="user photo"
            />
                  <td className="p-4">{user.firstName} {user.lastName}</td>
                  <td className="p-4 ">{user.username}</td>
                  <td className="p-4  underline text-blue-600">{user.email}</td>
                  <td className="p-4 ">{user.contactNumber}</td>
                  <td className="p-4 ">{user.roles[0]}</td>
                </tr>
              ))}
          </tbody>
    </table>
   </>  
  )
}

export default Directory