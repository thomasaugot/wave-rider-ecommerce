"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { updateUser } from "@/services/apiCalls";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./complete-registration.scss";

export default function CompleteRegistration() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log("the user I get from localstorage ---->", user);
      setUserId(user.id);
    } else {
      router.push("/authentication");
    }
  }, [router]);

  const handleSubmit = async () => {
    try {
      const userData = {
        firstname,
        lastname,
        dateOfBirth,
        address,
        zipCode,
        city,
        country,
        phone,
      };

      if (firstname !== "" || lastname !== "" || dateOfBirth !== "") {
        await updateUser(userId, userData);
        router.push(`/`);
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
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
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
}
