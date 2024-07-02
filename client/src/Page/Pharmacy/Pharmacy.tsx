import React from "react";
import { useAppSelector } from "../../Lib/Store/hooks";
import "./Pharmacy.scoped.scss";
import { Pharmacy } from "gql/graphql";
import { Link } from "react-router-dom";
import { PasswordInput, Select, TextInput } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import routes from "Lib/Routes/Routes";

export default function PharmacyPage() {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <section className="min-h-screen bg-gray-100 bg-opacity-50 pt-8">
      <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <h1 className="text-gray-600 text-center text-2xl">Pharmacy</h1>
        </div>
        <div className="space-y-6 bg-white p-4">
          <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
            <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
              <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="inline-flex items-center space-x-4">
                  <button
                    type="button"
                    className="block relative border-0"
                  ></button>
                  <h1 className="text-gray-600">
                    {/* {admin?.account?.user?.name
                      ? admin.account.user.name
                      : "Name"} */}
                  </h1>
                </div>
              </div>
            </div>
            <div className="space-y-6 bg-white">
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3">Account</h2>
                <div className="max-w-sm mx-auto md:w-2/3">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="user-info-email"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Email"
                      // value={admin?.account?.user?.email}
                      // onChange={handleChange("email")}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
                <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        id="user-info-name"
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Name"
                        // value={admin?.account?.user?.username}
                        // onChange={handleChange("username")}
                        // readOnly={isUserNameReadOnly}
                        // disabled={isUserNameDisabled}
                      />
                      <ButtonComponent
                        type="button"
                        className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                        // onClick={() => {
                        //   toggleEdit("username");
                        // }}
                      >
                        {/* {isUserNameEdit} */}Edit
                      </ButtonComponent>
                    </div>
                  </div>
                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        id="user-info-phone"
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Name"
                        // value={admin?.account?.user?.name}
                        // onChange={handleChange("name")}
                        // readOnly={isNameReadOnly}
                        // disabled={isNameDisabled}
                      />
                      <ButtonComponent
                        type="button"
                        className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                        // onClick={() => {
                        //   toggleEdit("name");
                        // }}
                      >
                        {/* {isNameEdit} */}
                        Edit
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-4/12">Change password</h2>
                <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                  <div className="w-full space-y-4">
                    <div className="relative">
                      <input
                        type="password"
                        id="current-password"
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Current Password"
                        // value={password.oldPassword}
                        // onChange={handlePasswordChange("oldPassword")}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="new-password"
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="New Password"
                        // value={password.newPassword}
                        // onChange={handlePasswordChange("newPassword")}
                      />
                    </div>
                    {/* <p>{resetPassError && "Wrong credentials"}</p> */}
                  </div>
                </div>
                <div className="text-center md:w-3/12 md:pl-6">
                  <ButtonComponent
                    type="button"
                    className="py-2 px-4 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    // onClick={() => {
                    //   handleResetPassword();
                    // }}
                    // loading={resetPassLoader}
                  >
                    Change
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
