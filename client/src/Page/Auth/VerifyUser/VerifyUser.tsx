import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import routes from "Lib/Routes/Routes";
import appConfig from "Lib/appConfig";
import useTokenConfirmation from "./Hooks/useTokenConfirmation";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { height } = useViewportSize();

  const token = localStorage.getItem(appConfig.storage.userData);

  const { loadingStateForTokenConfirmation, responseData } =
    useTokenConfirmation();

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto text-center w-full max-w-md px-4 py-8 sm:px-6 md:px-8 lg:px-10">
        {token && (
          <h2 className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
            Welcome
          </h2>
        )}

        <p>
          {loadingStateForTokenConfirmation
            ? "Verifying your account..."
            : responseData
            ? "Your account has been verified!"
            : "Your account already verified!"}
        </p>
        {token && (
          <Button onClick={() => navigate(routes.dashboard.profile.path)}>
            Go to dashboard
          </Button>
        )}
      </div>
    </div>
  );
}
