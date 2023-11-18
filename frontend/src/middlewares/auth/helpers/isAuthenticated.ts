import getUserProfileWithToken from "../../../helpers/profile";

const isAuthenticated = async (): Promise<boolean> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const userProfile = await getUserProfileWithToken(token);

    return userProfile ? true : false;
  }
  return false;
};

export default isAuthenticated;
