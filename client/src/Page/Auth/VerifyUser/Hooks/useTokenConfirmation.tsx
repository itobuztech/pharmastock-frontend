import { useMutation } from "@apollo/client";
import { TokenConfirmationInput } from "gql/graphql";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { LoginResponseWithToken } from "interfaces/interfaces";
import { GetConfirmToken } from "query/token";
import appConfig from "Lib/appConfig";
import useQueryParams from "Lib/CustomHooks/useQueryParams";

export default function useTokenConfirmation() {
  const query = useQueryParams();
  const token = localStorage.getItem(appConfig.storage.userData);

  const [tokenConfirmation, {loading: loadingStateForTokenConfirmation, data: responseData }] = useMutation<
    LoginResponseWithToken,
    {
      tokenConfirmationInput: {
        token: TokenConfirmationInput;
      };
    }
  >(GetConfirmToken, {
    variables: {
      tokenConfirmationInput: {
        token: query.confirmation_token,
      },
    },
    onCompleted: (d) => {
      if (d) {
        localStorage.setItem(
          "userData",
          JSON.stringify(d.tokenConfirmation)
        );
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (query.confirmation_token && !token) {
      tokenConfirmation();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.confirmation_token]);

  return {
    loadingStateForTokenConfirmation,
    responseData
  };
}
