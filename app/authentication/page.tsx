"use client";

import React, { useState } from "react";
import "./authentication.scss";
import CustomButton from "@/components/CustomButton/CustomButton";
import { createUser, loginUser, getUserData } from "@/services/apiCalls";
import { useRouter } from "next/navigation";
import { useExodarFont } from "@/hooks/useExodarFont";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "@/store/slices/userSlice";

const Authentication: React.FC = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(true);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();
  const dispatch: any = useDispatch();

  useExodarFont();

  const toggleForms = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    setIsSignupFormVisible(!isSignupFormVisible);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    try {
      if (!validatePassword(signupPassword)) {
        setPasswordError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one number."
        );
        return;
      }

      const user: any = await createUser(signupEmail, signupPassword);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(
        loginUserThunk({ email: signupEmail, password: signupPassword })
      );
      router.push("/complete-registration");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const { user } = await loginUser(loginEmail, loginPassword);
      const fetchedUserData = await getUserData(user.id);
      localStorage.setItem("user", JSON.stringify(fetchedUserData));
      dispatch(loginUserThunk({ email: loginEmail, password: loginPassword }));
      router.push("/");
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
            <div className="inputbox">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <p className="lost-password-link">Forgot your password?</p>
            <CustomButton text={"Log In"} onClick={handleLogin} />
          </div>

          <div className={`signup ${isSignupFormVisible ? "" : "hide"}`}>
            <h2>Sign Up</h2>
            <div className="inputbox">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => {
                  setSignupPassword(e.target.value);
                  setPasswordError("");
                }}
              />
            </div>
            <div className="error-container">
              {passwordError && (
                <p className="password-error">{passwordError}</p>
              )}
            </div>
            <CustomButton text={"Sign Up"} onClick={handleSignup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
