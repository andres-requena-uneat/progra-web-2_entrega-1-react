import axios from "axios";

export const signup = async (username, email, password, role) => {

  const payload = {
    username: username,
    email: email,
    password: password,
    role: [role],
  }

  try {
    return await axios.post(`${import.meta.env.VITE_BACK}/auth/signup`, payload)
    .then(response => {
      return {
        message:response?.data?.message,
        status: response?.status
      }
    })

  } catch (error) {
    return {
      message: error?.response?.data?.message,
      status: error?.response?.status
    }
  }

}