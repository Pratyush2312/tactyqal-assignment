import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../state/authAction";
import { useNavigate } from "react-router";
import { generateToast } from "./../../../utils/toast.util";

const useAuthHook = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      generateToast("success", "User Registered");
      navigate('/');
    } catch (error) {
      generateToast("error", error.message || error || "Registration Failed");
      console.log(error);
    }
  };

  const handleLogin = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      generateToast("success", "Login Successful");
      navigate("/dashboard");
    } catch (error) {
      generateToast("error", error.message || error || "Login Failed");
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      generateToast("error", error.message || error || "Logout Failed");
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
    handleLogout,
  };
};

export default useAuthHook;
