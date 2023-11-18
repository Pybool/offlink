import { useCallback } from "react";
import useLoading from "./useLoading";
import axios from "@/axios/auth";
import useNotification from "./useNotification";
import type { Profile } from '@/types';

const useUpdateProfile = ({ firstname, surname, othername, bankAccount, bankName, phone }: Profile) => {
    const { isLoading, startLoading, stopLoading} = useLoading()

    const { notification, setErrorNotification, setSuccessNotification, clearNotification } = useNotification()
    
    const updateUserProfile = useCallback(async () => {
        startLoading();
        clearNotification();

        const data = {
            firstname,
            surname,
            othername,
            phone,
            bankName,
            bankAccount
        }

        try {
            await axios().put("/auth/user-profile", data)
            setSuccessNotification("Profile Successfully Updated")
            stopLoading()
            return true;
        } catch (error: any) {
            if (error.response) {
                setErrorNotification(error?.response?.data?.error?.message);
              } else if (error.request) {
                setErrorNotification("no response from server");
              } else {
                setErrorNotification("unexpected error");
              }
        }
        stopLoading()
        return false;
    }, [firstname, surname, phone, bankName, bankAccount]);

    return { updateUserProfile, isLoading, notification}
}

export default useUpdateProfile