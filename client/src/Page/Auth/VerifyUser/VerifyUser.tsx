import { useMutation } from "@apollo/client";
import { Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import routes from "Lib/Routes/Routes";
import appConfig from "Lib/appConfig";
import { TokenConfirmationInput } from "gql/graphql";
import { LoginResponseWithToken } from "interfaces/interfaces";
import { GetConfirmToken } from "query/token";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function VerifyUser() {
  const query = useQuery();
  const navigate = useNavigate();
  const { height } = useViewportSize();
  const [token, setToken] = useState<TokenConfirmationInput>({
    token: "",
  });

  useEffect(() => {
    const tokenFromUrl = query.get("confirmation_token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [query]);

  const [fetch] = useMutation<
    LoginResponseWithToken,
    {
      tokenConfirmationInput: {
        token: TokenConfirmationInput;
      };
    }
  >(GetConfirmToken);

  const getTokenConfirm = async () => {
    try {
      const response = await fetch({
        variables: {
          tokenConfirmationInput: {
            token,
          },
        },
      });

      localStorage.setItem(
        appConfig.storage.accessToken,
        JSON.stringify(response.data?.tokenConfirmation.access_token)
      );
    } catch (error) {}
  };

  function switchScreen() {
    if (localStorage.getItem(appConfig.storage.accessToken)) {
      navigate(`${routes.dashboard.profile.path}`);
    }
  }

  useEffect(() => {
    getTokenConfirm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex justify-center items-center"
    >
      <div className="mx-auto text-center w-full max-w-md px-4 py-8 sm:px-6 md:px-8 lg:px-10">
        <h2 className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
          Welcome
        </h2>
        <p>Your account has been verified</p>
        <Button onClick={switchScreen}>Go to dashboard</Button>
      </div>
    </div>
  );
}
