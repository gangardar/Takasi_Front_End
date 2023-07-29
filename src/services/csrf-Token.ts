import axios from "axios";

const setCSRFCookie = async () => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/",
  });

  try {
    const cookie = await instance.get("/sanctum/csrf-cookie");
    console.log(cookie);
  } catch (error) {
    console.error("Error setting CSRF cookie:", error);
    // Handle any errors if necessary
  }
};

export default setCSRFCookie;
