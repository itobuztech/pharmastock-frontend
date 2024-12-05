import { useMutation } from "@apollo/client";
import { TokenConfirmationInput } from "gql/graphql";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { LoginResponseWithToken } from "interfaces/interfaces";
import { GetConfirmToken } from "query/token";
import useQueryParams from "Lib/customHooks/useQueryParams";

export default function useTokenConfirmation() {
  const query = useQueryParams();
  const hasExecuted = useRef(false);

  const [
    tokenConfirmation,
    { loading: loadingStateForTokenConfirmation, data: responseData },
  ] = useMutation<
    LoginResponseWithToken,
    {
      tokenConfirmationInput: {
        token: TokenConfirmationInput;
      };
    }
  >(GetConfirmToken, {
    onCompleted: (d) => {
      if (d) {
        localStorage.setItem("userData", JSON.stringify(d.tokenConfirmation));
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (!hasExecuted.current && query.confirmation_token) {
      hasExecuted.current = true;
      tokenConfirmation({
        variables: {
          tokenConfirmationInput: {
            token: query.confirmation_token,
          },
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.confirmation_token, tokenConfirmation]);

  return {
    loadingStateForTokenConfirmation,
    responseData,
  };
}
