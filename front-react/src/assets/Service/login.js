import axios from "axios";

export const login = async (username, password) => {
  try {
    await axios.post(`${import.meta.env.VITE_BACK}/auth/signin`, {
      username: username,
      password: password
    })
    .then(res => {
      document.cookie = `accessToken=${res.data.accessToken}; Max-Age=${1800}; path=/`
    })
  } catch (error) {
    return error?.response?.data?.message
  }

}