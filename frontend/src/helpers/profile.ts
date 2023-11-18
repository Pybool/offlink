import { UserAttributes } from "@/types";
import axios from "@/axios/auth";

const getUserProfileWithToken = async (
  token: string
): Promise<UserAttributes | undefined> => {
  try {
    const response = await axios().get("auth/user-profile");
    return response.data;
  } catch (err) {}
};

export default getUserProfileWithToken;
