"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { updateUserAPI } from "@/services/apiCalls";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import { useForm, Controller } from "react-hook-form";

import "./complete-registration.scss";

export default function CompleteRegistration() {
  const router = useRouter();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (user) {
        await updateUserAPI(user.id, data);
        router.push(`/profile?userId=${user.id}`);
      } else {
        console.log("Mandatory fields can't be empty");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const getErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if ("message" in error) return error.message;
    return "Invalid input";
  };

  return (
    <div className="registration-page">
      <h2>Please complete your registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-items-container">
          <div className="form-group">
            <label htmlFor="firstname">First Name*</label>
            <input
              type="text"
              id="firstname"
              {...register("firstname", { required: "First name is required" })}
              placeholder="Enter your first name"
            />
            {errors.firstname && (
              <p className="error-message">
                {getErrorMessage(errors.firstname)}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name*</label>
            <input
              type="text"
              id="lastname"
              {...register("lastname", { required: "Last name is required" })}
              placeholder="Enter your last name"
            />
            {errors.lastname && (
              <p className="error-message">
                {getErrorMessage(errors.lastname)}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth*</label>
            <input
              type="date"
              id="dateOfBirth"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              placeholder="Enter your date of birth"
            />
            {errors.dateOfBirth && (
              <p className="error-message">
                {getErrorMessage(errors.dateOfBirth)}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="error-message">{getErrorMessage(errors.address)}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code</label>
            <input
              type="text"
              id="zipcode"
              {...register("zipcode", { required: "Zip code is required" })}
              placeholder="Enter your zip code"
            />
            {errors.zipcode && (
              <p className="error-message">{getErrorMessage(errors.zipcode)}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              {...register("city", { required: "City is required" })}
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="error-message">{getErrorMessage(errors.city)}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              {...register("country", { required: "Country is required" })}
              placeholder="Enter your country"
            />
            {errors.country && (
              <p className="error-message">{getErrorMessage(errors.country)}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"es"}
                  placeholder="Enter your phone number"
                  inputClass="phone-input"
                  onChange={field.onChange}
                />
              )}
            />
            {errors.phone && (
              <p className="error-message">{getErrorMessage(errors.phone)}</p>
            )}
          </div>
        </div>
        <CustomButton text="Submit" type="submit" onClick={undefined} />
      </form>
    </div>
  );
}
