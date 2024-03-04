import axios from "axios"

const getUsers = async (accessToken) => {
  return axios.get(`${import.meta.env.VITE_BACK}/getUsers`, {
    headers: {
      'x-access-token': accessToken
    }
  })
  .then((response) => {
    return response.data.users.length > 0 
      ? response.data.users
      : [{id: "-", username: "-", email: "-", roles: ["-"]}]
  })

}

export default getUsers