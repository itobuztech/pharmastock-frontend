import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import messagesData from "Lib/messages";
import { GetResetPassword } from "query/profile/resetPassword";
import routes from "Lib/Routes/Routes";
import { ResetPasswordInput } from "gql/graphql";

const passwordSchema = yup
  .object({
    oldPassword: yup
      .string()
      .required(messagesData.profile.password.required)
      .trim(messagesData.profile.password.required),
    newPassword: yup
      .string()
      .required(messagesData.profile.password.newPassword)
      .test(
        "not-same-as-old-password",
        messagesData.profile.password.setNewPassword,
        function (value) {
          return value !== this.parent.oldPassword;
        }
      )
      .trim(messagesData.profile.password.newPassword),
    confirmPassword: yup
      .string()
      .required(messagesData.profile.password.confirmPassword)
      .test(
        "passwords-match",
        messagesData.profile.password.passwordMatch,
        function (value) {
          return value === this.parent.newPassword;
        }
      )
      .trim(messagesData.profile.password.confirmPassword),
  })
  .required();
export default function useChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSetPasswordPage = location.pathname.includes("set-password");

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [editPassForm, setEditPassForm] = useState(
    isSetPasswordPage ? true : false
  );
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { loading: resetPassLoader }] = useMutation(
    GetResetPassword,
    {
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: () => {
        toast.success(messagesData.profile.passwordChangeSuccess);
        setEditPassForm(false);
        reset();
        if (isSetPasswordPage) {
          navigate(routes.login.path);
        }
      },
    }
  );

  const handleChangePassword = (data: ResetPasswordInput) => {
    resetPassword({
      variables: {
        resetPasswordInput: data,
      },
    });
  };

  const handlePasswordValidityChange = (valid: boolean) => {
    setIsPasswordValid(valid);
  };

  return {
    isPasswordValid,
    handleChangePassword,
    handlePasswordValidityChange,
    resetPassLoader,
    errors,
    control,
    handleSubmit,
    register,
    editPassForm,
    setEditPassForm,
    reset,
  };
}
