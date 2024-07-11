"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import Avatar from "@/components/Avatar/Avatar";
import { updateUser, getUserData } from "@/services/apiCalls";
import { UserType, PastOrder } from "@/types/user";
import "@/styles/shared-styles.scss";
import { Loading } from "@/components/Loading/Loading";
import { logoutUserThunk } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";

const Profile: React.FC = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userType, setUserType] = useState<string>("customer");
  const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);

  useEffect(() => {
    const fetchUserData = async (id: string) => {
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
          setUserType(userData.role);
          setPastOrders(userData.pastOrders || []);
          setProfilePic(userData.profilePic || null);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.id) {
        setUserId(user.id);
        fetchUserData(user.id);
      } else {
        console.error("User object in localStorage is missing 'id' property.");
        handleLogout();
      }
    } else {
      console.error("User object not found in localStorage.");
      handleLogout();
    }
  }, []);

  const handleAvatarUpload = async (url: string) => {
    try {
      if (userId) {
        await updateUser(userId, { profilePic: url });
        setProfilePic(url);
      } else {
        console.error("userId is null when updating profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUserThunk);
      localStorage.clear();
      router.replace("/");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      router.replace("/");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="profile-header">
        <h1>Welcome, {firstname}!</h1>
        <Avatar url={profilePic} size={150} onUpload={handleAvatarUpload} />
      </div>
      <div className="profile-details">
        <h2>Profile Details</h2>
        <p>
          <strong>First Name:</strong> {firstname}
        </p>
        <p>
          <strong>Last Name:</strong> {lastname}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dateOfBirth}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Zip Code:</strong> {zipcode}
        </p>
        <p>
          <strong>City:</strong> {city}
        </p>
        <p>
          <strong>Country:</strong> {country}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      </div>
      <div className="past-orders">
        <h2>Past Orders</h2>
        {pastOrders.length > 0 ? (
          <ul>
            {pastOrders.map((order) => (
              <li key={order.productId}>
                <p>
                  <strong>Order ID:</strong> {order.productId}
                </p>
                <p>
                  <strong>Order Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Order Total:</strong> {order.price}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-orders">No past orders found.</p>
        )}
      </div>
      <CustomButton
        text="Edit Profile"
        onClick={() => router.push(`/edit-profile?userId=${userId}`)}
      />
      <br />
      <CustomButton text="Logout" onClick={handleLogout} secondary={true} />
    </div>
  );
};

export default Profile;
