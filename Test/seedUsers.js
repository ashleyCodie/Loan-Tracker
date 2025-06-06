import "dotenv/config"
import axios from "axios"
import { generateFakeUsers } from "./generateFakeUsers.js";

const seedUsers = generateFakeUsers(1)
console.log("seedUsers", seedUsers)

seedUsers.forEach(async (user) => {
    const addUser = await axios.post(`${process.env.SERVER_URL}/users`, user)
    console.log("addUser", addUser.data)
})

// seedUsers [
//     {
//       firstName: 'Delores',
//       lastName: 'Auer',
//       email: 'Nico.Adams30@yahoo.com',
//       username: 'Santino51',
//       password: 'suIH'
        // roles: "Loan Manager"
//     }
//   ]

// seedUsers [
//     {
//       firstName: 'Ismael',
//       lastName: 'Schmeler-Renner',
//       email: 'Belle_Oberbrunner@gmail.com',
//       username: 'Zander_Jakubowski',
//       password: 'JQgp',
//       roles: 'Loan Processor'
//     }
//   ]

// seedUsers [
//     {
//       firstName: 'Gerda',
//       lastName: 'Green',
//       email: 'Derrick.Pacocha@gmail.com',
//       username: 'Tanya54',
//       password: 'ZZPS',
//       roles: 'Loan Officer'
//     }
//   ]

// seedUsers [
//     {
//       firstName: 'Mary',
//       lastName: 'Satterfield',
//       email: 'Ivy_Rowe@gmail.com',
//       username: 'Fausto59',
//       password: 'weCW',
//       roles: 'Underwritter'
//     }
//   ]