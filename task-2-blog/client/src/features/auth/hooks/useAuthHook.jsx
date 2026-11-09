import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../state/authAction";
import { useNavigate } from "react-router";

const useAuthHook = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = async (data) => {};
  const handleLogin = async (data) => {
    try {
      dispatch(loginUser(data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return {
    register,
    handleSubmit,
    watch,
    errors,
    handleRegister,
    handleLogin,
    handleLogout
  };
};

export default useAuthHook;
