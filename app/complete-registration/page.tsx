"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { updateUser } from "@/services/apiCalls";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./complete-registration.scss";

const CompleteRegistration: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.user && user.user.id) {
        console.log("user id -->", user.user.id);
        setUserId(user.user.id);
      } else {
        console.error(
          "User object in localStorage is missing 'user' or 'id' property."
        );
        router.push("/authentication");
      }
    } else {
      router.push("/authentication");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = {
        firstname,
        lastname,
        dateOfBirth,
        address,
        zipcode,
        city,
        country,
        phone,
      };

      if (userId && firstname !== "" && lastname !== "" && dateOfBirth !== "") {
        await updateUser(userId, userData);
        router.push(`/profile?userId=${userId}`);
      } else {
        console.log("Mandatory fields can't be empty");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="registration-page">
      <h2>Please complete your registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-items-container">
          <div className="form-group">
            <label htmlFor="firstname">First Name*</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name*</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth*</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder="Enter your date of birth"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code</label>
            <input
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder="Enter your zip code"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter your country"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <PhoneInput
              country={"es"}
              value={phone}
              onChange={setPhone}
              placeholder="Enter your phone number"
              inputClass="phone-input"
            />
          </div>
        </div>
        <CustomButton text="Submit" type="submit" onClick={undefined} />
      </form>
    </div>
  );
};

export default CompleteRegistration;
