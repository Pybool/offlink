"use client";
import React, { useState, useEffect, useCallback } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { useRouter } from "next/navigation";
import useValidation from "@/hooks/useValidation";
import CustomInput from "./form/CustomInput";
import CustomButton from "./form/CustomButton";
import { validatePhone } from "@/helpers/validation";
import LoadingIcon from "./LoadingIcon";

const UpdateProfile = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhoneNo] = useState<string>("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [othername, setOtherName] = useState("");

  const phoneNoError = useValidation(phone, validatePhone)

  const isPhoneNumberValid = useCallback(() => {
    if (phoneNoError?.type === "error") {
      return false;
    }
    return true;
  }, [phoneNoError]);

  const { updateUserProfile, isLoading, notification} = useUpdateProfile({
    firstname,
    surname,
    othername,
    bankAccount,
    bankName,
    phone
  })

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isPhoneNumberValid()){
        return;
    }

    if(await updateUserProfile()) {
        router.push("/profile")
    }
  }


  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div>
        {/* update profile Button that opens the modal */}
        <button
          type="button"
          onClick={() => setToggle(true)}
          className="inline-block ml-4 px-6 py-2.5 border-[#7b64f2] text-white font-medium text-md leading-tight rounded-2xl shadow-md hover:border-[#7b64f2] focus:shadow-lg focus:outline-none focus:ring-0 bg-[#4461F2] transition duration-150 ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          Update Profile
        </button>

        {/* Modal */}
        {toggle && (
          <div
            className="fixed z-40 overflow-y-scroll top-0 w-full left-0"
            id="modal"
          >
            {/* Form with input fields for the profile, that triggers the function on submit */}
            <form onSubmit={handleSubmit} >
              <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-black opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                  &#8203;
                </span>
                <div
                  className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                  >
                  {/* Input fields for the product */}

                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <p className="text-red-900">{notification?.message}</p>
                    <label>First Name</label>
                    <CustomInput
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      error=""
                      required
                      type="text"
                      className="w-full bg-white p-2 mt-2 mb-3 border-2 border-[#7b64f2]  rounded-lg"
                    />
                    <label>Other Name</label>
                    <CustomInput
                      onChange={(e) => {
                        setOtherName(e.target.value);
                      }}
                      error=""
                      required
                      type="text"
                      className="w-full  p-2 mt-2 mb-3 border-2 border-[#7b64f2] rounded-lg"
                    />
                    <label>Surname</label>
                    <CustomInput
                    error=""
                      onChange={(e) => {
                        setSurname(e.target.value);
                      }}
                      required
                      type="text"
                      className="w-full bg-white p-2 mt-2 mb-3 border-2 border-[#7b64f2]  rounded-lg"
                    />

                    <label>Bank Name</label>
                    <CustomInput
                    error=""
                      onChange={(e) => {
                        setBankName(e.target.value);
                      }}
                      required
                      type="text"
                      className="w-full p-2 mt-2 mb-3 border-2 border-[#7b64f2] rounded-lg"
                    />

                    <label>Bank Account Number</label>
                    <CustomInput
                      onChange={(e) => {
                        setBankAccount(e.target.value);
                      }}
                      error=""
                      required
                      type="text"
                      className="w-full  p-2 mt-2 mb-3 border-2 border-[#7b64f2] rounded-lg"
                    />

                    <label>Phone Number </label>
                    <CustomInput
                      onChange={(e) => {
                        setPhoneNo(e.target.value);
                      }}
                      error={phoneNoError?.message ?? ""}
                      required
                      
                      type="text"
                      className="w-full  p-2 mt-2 mb-3 border-2 border-[#7b64f2] rounded-lg"
                    />
                    
                  </div>
                  {/* Button to close the modal */}
                  <div className="bg-blacl px-4 py-3 text-right">
                    <button
                      type="button"
                      className="py-2 px-4 bg-black text-white rounded hover:bg-black mr-2"
                      onClick={() => setToggle(false)}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                    {/* Button to add update the user profile */}
                    <button
                      type="submit"
                      className="py-2 px-4 bg-[#7b64f2] text-white rounded hover:bg-[#7e68ec] mr-2" disabled={isLoading}
                    >
                        {isLoading && <LoadingIcon />}
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
