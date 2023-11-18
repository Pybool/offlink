import React, { ReactElement } from 'react'
import AuthMiddleware from '@/middlewares/auth/AuthMiddleware';


type Props = {}

const New = (): JSX.Element => {
  return (
      <>
     
<div className="m-2 space-y-2">
  <div
    className="group flex flex-col gap-2 rounded-lg bg-black p-5 text-white"
    tabIndex={1}
  >
    <div className="flex cursor-pointer items-center justify-between">
      {/* <span> HTML </span> */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
        className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
      />
    </div>
    <div
      className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
  </div>

</div>
    <div>
    <div className="p-4">
      <div className="bg-white p-4 rounded-md">
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-700">Admin & User</h2>
          <div>
            <div>
              <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                <div>
                  <span>Name</span>
                </div>
                <div>
                  <span>Email</span>
                </div>
                <div>
                  <span>Role</span>
                </div>
                <div>
                  <span>Time</span>
                </div>
                <div>
                  <span>Edit</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between border-t text-sm font-normal mt-4 space-x-4">
                  <div className="px-2 flex">
                    <span>John Deo</span>
                  </div>
                  <div>
                    <span>johndeo@gmail.com</span>
                  </div>
                  <div className="px-2">
                    <span>Admin</span>
                  </div>
                  <div className="px-2">
                    <span>28/12/2021</span>
                  </div>
                  <div className="px-2">
                    <select>
                      <option>Admin</option>
                      <option>User</option>
                    </select>
                  </div>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
              </>
  )
}

New.getLayout = function getLayout(page: ReactElement) {
    return (
      <AuthMiddleware>
        {/* <Auth login="Register" accountStatus="Already have an account? " urlName="Login" url="login"> */}
        {page}
        {/* </Auth> */}
      </AuthMiddleware>
    );
  };
  

export default New