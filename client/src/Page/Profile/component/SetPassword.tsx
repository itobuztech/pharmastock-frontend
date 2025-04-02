import { useViewportSize } from "@mantine/hooks";

import ChangePassword from "./ChangePassword";
import useTokenConfirmation from "Page/Auth/VerifyUser/Hooks/useTokenConfirmation";

export default function SetPassword() {
  const { height } = useViewportSize();

  useTokenConfirmation();

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto flex flex-col w-full max-w-md px-4 py-8 rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
        <ChangePassword />
      </div>
    </div>
  );
}
