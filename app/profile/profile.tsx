import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { getUserData, updateUser, uploadProfilePic } from "@/services/apiCalls";
import { UserType, PastOrder } from "@/types";
import "./profile.scss";
import { useCart } from "@/context/cartContext";

const Profile: React.FC = () => {
  const router = useRouter();
  const { cartState } = useCart();
  const [user, setUser] = useState<UserType | null>(null);
  const [profilePic, setProfilePic] = useState<string>("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData: UserType = JSON.parse(userString);
      setUser(userData);
      setProfilePic(userData.profilePic || "default-profile-pic-url");
    } else {
      router.push("/authentication");
    }
  }, [router]);

  const handleProfilePicUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const profilePicUrl = await uploadProfilePic(file);
      setProfilePic(profilePicUrl);

      if (user) {
        const updatedUser = { ...user, profilePic: profilePicUrl };
        await updateUser(user.id, updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h2>Welcome, {user.firstname}</h2>
      <div className="profile-pic-section">
        <img src={profilePic} alt="Profile Picture" className="profile-pic" />
        <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
      </div>
      <div className="user-info">
        <h3>User Information</h3>
        <p>
          <strong>First Name:</strong> {user.firstname}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastname}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dateOfBirth}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Zip Code:</strong> {user.zipcode}
        </p>
        <p>
          <strong>City:</strong> {user.city}
        </p>
        <p>
          <strong>Country:</strong> {user.country}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
      {/* <div className="payment-info">
        <h3>Payment Methods</h3>
      </div> */}
      <div className="last-purchases">
        <h3>Last Purchases</h3>
        {user.pastOrders && user.pastOrders.length > 0 ? (
          <ul>
            {user.pastOrders.map((order, index) => (
              <li key={index}>
                Product ID: {order.productId}, Quantity: {order.quantity},
                Price: ${order.price}, Date: {order.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No purchases found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
