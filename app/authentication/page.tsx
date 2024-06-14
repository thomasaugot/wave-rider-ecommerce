"use client";

import React, { useState, useEffect } from "react";
import "./authentication.scss";
import CustomButton from "@/components/CustomButton/CustomButton";
import { createUser, loginUser } from "@/services/apiCalls";
import { useRouter } from "next/navigation";
import { useExodarFont } from "@/hooks/useExodarFont";

export default function Authentication() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(true);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();

  useExodarFont();

  useEffect(() => {
    setIsLoginFormVisible(false);
    setIsSignupFormVisible(true);
  }, []);

  const toggleForms = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    setIsSignupFormVisible(!isSignupFormVisible);
  };

  const handleSignup = async () => {
    try {
      const user = await createUser(signupEmail, signupPassword);
      console.log("authenticated user --->", user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/complete-registration");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser(loginEmail, loginPassword);
      router.back();
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
                type="submit"
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
                type="submit"
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
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <CustomButton text={"Sign Up"} onClick={handleSignup} />
          </div>
        </div>
      </div>
    </div>
  );
}
