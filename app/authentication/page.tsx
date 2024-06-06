"use client";

import React, { useState, useEffect } from "react";
import "./authentication.scss";
import CustomButton from "@/components/CustomButton/CustomButton";

const AuthenticationPage: React.FC = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(true);

  useEffect(() => {
    setIsLoginFormVisible(false);
    setIsSignupFormVisible(true);
  }, []);

  const toggleForms = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    setIsSignupFormVisible(!isSignupFormVisible);
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
              <p className="title">Don&apos;t have an account?</p>
              <p>Sign up and join the tribe!</p>
              <CustomButton
                text={"Sign Up"}
                onClick={toggleForms}
                disabled={undefined}
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
              <p className="title">Have an account?</p>
              <p>Welcome back!</p>
              <CustomButton
                text={"Log in"}
                onClick={toggleForms}
                disabled={undefined}
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
              <input type="text" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
            </div>
            <p className="lost-password-link">Forgot your password?</p>
            <CustomButton text={"Log In"} onClick={() => {}} />
          </div>

          <div className={`signup ${isSignupFormVisible ? "" : "hide"}`}>
            <h2>Sign Up</h2>
            <div className="inputbox">
              <input type="text" name="fullname" placeholder="Fullname" />
              <input type="text" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
            </div>
            <CustomButton
              text={"Sign Up"}
              onClick={() => {}}
              disabled={undefined}
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
