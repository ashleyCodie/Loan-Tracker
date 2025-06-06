import "dotenv/config"
import axios from "axios"

const users = [
        {
          firstName: 'Delores',
          lastName: 'Auer',
          email: 'Nico.Adams30@yahoo.com',
          username: 'Santino51',
          password: 'suIH'
        }
      ]

const loginUser = await axios.post(`${process.env.SERVER_URL}/users/login`, { email: users[0].email, password: users[0].password })
console.log("loginUser", loginUser)