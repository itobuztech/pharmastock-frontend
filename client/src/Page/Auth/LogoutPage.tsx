import { userSliceActions } from "Lib/Store/User/User.Slice";
import { useAppDispatch } from "Lib/Store/hooks";
import appConfig from "Lib/appConfig";
import React, { useEffect } from "react";

export default function LogoutPage() {
  const dispatch = useAppDispatch();

  function logOut() {
    dispatch(userSliceActions.logout());
  }

  useEffect(() => {
    logOut();
    localStorage.removeItem(appConfig.storage.store);
  });

  return <div>LogoutPage</div>;
}
