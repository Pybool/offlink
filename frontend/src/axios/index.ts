import { BASE_URL } from "@/helpers/constants";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
