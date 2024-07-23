"use client";

import React, { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton/CustomButton";
import { createUserAPI } from "@/services/apiCalls";
import { useRouter } from "next/navigation";
import { useExodarFont } from "@/hooks/useExodarFont";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk, selectUser } from "@/store/slices/userSlice";
import { useForm } from "react-hook-form";

import "./authentication.scss";

export default function Authentication() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();
  const dispatch: any = useDispatch();
  const user = useSelector(selectUser);

  useExodarFont();

  useEffect(() => {
    if (user) {
      router.push(`/profile?userId=${user.id}`);
    }
  }, [user, router]);

  const toggleForms = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    setIsSignupFormVisible(!isSignupFormVisible);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  const handleSignup = async (data: any) => {
    const { email, password } = data;
    try {
      if (!validatePassword(password)) {
        setPasswordError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one number."
        );
        return;
      }

      const user = await createUserAPI(email, password);

      await dispatch(loginUserThunk({ email, password }));

      router.push("/complete-registration");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async (data: any) => {
    const { email, password } = data;
    try {
      await dispatch(loginUserThunk({ email, password }));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="backbox">
          <div
            className={`login-message ${
              isLoginFormVisible ? "" : "visibility"
            }`}
          >
            <div className="textcontent">
              <p>Don&apos;t have an account?</p>
              <p>Sign up and join the tribe!</p>
              <CustomButton
                text={"Sign Up"}
                onClick={toggleForms}
                secondary={true}
                type="button"
              />
            </div>
          </div>
          <div
            className={`signup-message ${
              isSignupFormVisible ? "" : "visibility"
            }`}
          >
            <div className="textcontent">
              <p>Have an account?</p>
              <p>Welcome back!</p>
              <CustomButton
                text={"Log in"}
                onClick={toggleForms}
                secondary={true}
                type="button"
              />
            </div>
          </div>
        </div>
        <div className={`frontbox ${isLoginFormVisible ? "" : "moving"}`}>
          <div className={`login ${isLoginFormVisible ? "" : "hide"}`}>
            <h2>Log In</h2>
            <form onSubmit={handleSubmitLogin(handleLogin)}>
              <div className="inputbox">
                <input
                  type="text"
                  placeholder="Email"
                  {...registerLogin("email", { required: true })}
                />
                {errorsLogin.email && (
                  <p className="error-message">Email is required.</p>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  {...registerLogin("password", { required: true })}
                />
                {errorsLogin.password && (
                  <p className="error-message">Password is required.</p>
                )}
              </div>
              <p className="lost-password-link">Forgot your password?</p>
              <CustomButton text={"Log In"} type="submit" onClick={undefined} />
            </form>
          </div>
          <div className={`signup ${isSignupFormVisible ? "" : "hide"}`}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmitSignup(handleSignup)}>
              <div className="inputbox">
                <input
                  type="text"
                  placeholder="Email"
                  {...registerSignup("email", { required: true })}
                />
                {errorsSignup.email && (
                  <p className="error-message">Email is required.</p>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  {...registerSignup("password", { required: true })}
                  onChange={() => setPasswordError("")}
                />
                {errorsSignup.password && (
                  <p className="error-message">Password is required.</p>
                )}
              </div>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <br />
              <CustomButton
                text={"Sign Up"}
                type="submit"
                onClick={undefined}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
