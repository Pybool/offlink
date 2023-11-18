import { BASE_URL } from "@/helpers/constants";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const authAxios = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  });
};

export default authAxios;
