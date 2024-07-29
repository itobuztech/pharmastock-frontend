import routes from "Lib/Routes/Routes";
import { logout, setPermission } from "Lib/Store/User/User.Slice";
import { useAppDispatch } from "Lib/Store/hooks";
import appConfig from "Lib/appConfig";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logOut() {
    dispatch(setPermission({}))
    dispatch(logout())
    localStorage.removeItem(appConfig.storage.store);
    localStorage.removeItem(appConfig.storage.accessToken);
    localStorage.removeItem("userData");
    navigate(`${routes.login.path}`);
  }

  useEffect(() => {
    logOut();
  });

  return <div>LogoutPage</div>;
}
