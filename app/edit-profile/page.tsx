"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { getUserData, updateUser } from "@/services/apiCalls";
import { UserType } from "@/types/user";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./edit-profile.scss";

const EditProfile: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    } else {
      router.push(`/profile/${userId}`);
    }
  }, [userId, router]);

  async function fetchUserData(id: string) {
    try {
      const userData: UserType | null = await getUserData(id);

      if (userData) {
        setFirstname(userData.firstname);
        setLastname(userData.lastname);
        setDateOfBirth(userData.dateOfBirth);
        setAddress(userData.address);
        setZipcode(userData.zipcode);
        setCity(userData.city);
        setCountry(userData.country);
        setPhone(userData.phone);
        setProfilePic(userData.profilePic || null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await updateUser(userId!, {
        firstname,
        lastname,
        dateOfBirth,
        address,
        zipcode,
        city,
        country,
        phone,
        profilePic,
      });
      router.push("/profile");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }

  return (
    <div className="edit-profile-container">
      <h2>Edit Your Profile</h2>
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
              specialLabel=""
            />
          </div>
        </div>
        <CustomButton text="Save Changes" type="submit" onClick={undefined} />
      </form>
    </div>
  );
};

export default EditProfile;
