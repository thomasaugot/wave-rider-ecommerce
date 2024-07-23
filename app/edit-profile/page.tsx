"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { getUserDataAPI, updateUserAPI } from "@/services/apiCalls";
import { UserType } from "@/types/user";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";

import "./edit-profile.scss";

export default function EditProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [profilePic, setProfilePic] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    } else {
      router.push(`/profile/${userId}`);
    }
  }, [userId, router]);

  const goBack = () => {
    router.back();
  };

  async function fetchUserData(id: string) {
    try {
      const userData: UserType | null = await getUserDataAPI(id);

      if (userData) {
        setValue("firstname", userData.firstname);
        setValue("lastname", userData.lastname);
        setValue("dateOfBirth", userData.dateOfBirth);
        setValue("address", userData.address);
        setValue("zipcode", userData.zipcode);
        setValue("city", userData.city);
        setValue("country", userData.country);
        setValue("phone", userData.phone);
        setProfilePic(userData.profilePic || null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function onSubmit(formData: any) {
    try {
      await updateUserAPI(userId!, {
        ...formData,
        profilePic,
      });
      router.push("/profile");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }

  const getErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if ("message" in error) return error.message;
    return "Invalid input";
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-items-container">
          <div className="form-group">
            <label htmlFor="firstname">First Name*</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              {...register("firstname", { required: "First name is required" })}
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
              placeholder="Enter your last name"
              {...register("lastname", { required: "Last name is required" })}
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
              placeholder="Enter your date of birth"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
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
              placeholder="Enter your address"
              {...register("address", { required: "Address is required" })}
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
              placeholder="Enter your zip code"
              {...register("zipcode", { required: "Zip code is required" })}
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
              placeholder="Enter your city"
              {...register("city", { required: "City is required" })}
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
              placeholder="Enter your country"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && (
              <p className="error-message">{getErrorMessage(errors.country)}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <PhoneInput
              country={"es"}
              value=""
              placeholder="Enter your phone number"
              inputClass="phone-input"
              specialLabel=""
              {...register("phone", { required: "Phone number is required" })}
              onChange={(value) => setValue("phone", value)}
            />
            {errors.phone && (
              <p className="error-message">{getErrorMessage(errors.phone)}</p>
            )}
          </div>
        </div>
        <div className="actions-container">
          <CustomButton
            text={"Cancel"}
            type="button"
            onClick={goBack}
            secondary={true}
          />
          <CustomButton
            text="Save Changes"
            type="submit"
            disabled={isSubmitting}
            onClick={undefined}
          />
        </div>
      </form>
    </div>
  );
}
