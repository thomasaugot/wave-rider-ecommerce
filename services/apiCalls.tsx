import { Product } from "@/types";
import { supabase } from "./supabase";

// From here I centralize all my API call functions

// function to create user
export const createUser = async (email: string, password: string) => {
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Password length and complexity validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one number"
    );
  }

  // Attempt to sign up user
  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    // Check for existing user error
    if (error && error.message.includes("already exists")) {
      throw new Error("Email already exists");
    }

    // Return data if sign up successful
    return data;
  } catch (error) {
    // Throw error if sign up fails
    throw error;
  }
};

// Function to log in the user
export const loginUser = async (email: string, password: string) => {
  try {
    // Sign in user with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      return data;
    } else {
      throw new Error("Error signing in: " + error.message);
    }
  } catch (error) {
    throw error;
  }
};

// log the user out and redirects to login page
export const logoutUser = async () => {
  try {
    // Log out the user
    await supabase.auth.signOut();

    // Redirect the user to the login page
    window.location.href = "/login"; // Replace '/login' with the actual login page URL

    // Optionally, you can return a success message or perform other actions after logout
    return "User logged out successfully.";
  } catch (error: any) {
    throw new Error("Error logging out user: " + error.message);
  }
};

// Function to fetch additional user data after login
export const getUserData = async (userId: any) => {
  try {
    // Fetch user data from the users table using user's ID
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error) {
      return data;
    } else {
      throw new Error("Error fetching user data: " + error.message);
    }
  } catch (error) {
    throw error;
  }
};

// function to update user data
export const updateUser = async (userId: any, newData: any) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(newData)
      .eq("id", userId)
      .single();

    if (!error) {
      return data;
    } else {
      throw new Error("Error updating user data: " + error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: any) => {
  try {
    // Delete user data from the users table using user's ID
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    // Log out the user
    await supabase.auth.signOut();

    alert("User deleted successfully.");

    if (!error) {
      return;
    } else {
      throw new Error("Error deleting user: " + error.message);
    }
  } catch (error) {
    throw error;
  }
};

// function to fetch all the products
export const getProducts = async (): Promise<Product[]> => {
  try {
    let { data: products, error } = await supabase.from("products").select("*");

    // If there's no error, return all products
    if (!error) {
      console.log("my products: ", products);
      return products || [];
    } else {
      throw new Error("Error fetching all products: " + error.message);
    }
  } catch (error) {
    throw error;
  }
};

// function to add a product, only avail. for admin user
export const addProduct = async (productData: { [key: string]: any }) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([productData])
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// function to get all details of a product
export const getProductDetails = async (id: any) => {
  try {
    let { data: productDetails, error } = await supabase
      .from("products")
      .select("id");

    if (!error) {
      return productDetails;
    } else {
      throw new Error("Error fetching all products: " + error.message);
    }
  } catch (error) {
    throw error;
  }
};

// to add item in the cart
export const addToCart = async (
  cartContent: { [key: string]: any },
  userId: string
) => {
  try {
    const { data, error } = await supabase
      .from("cart")
      .insert([cartContent])
      .select("userId");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// fetching a user's cart if any and returning its data
export const getCart = async (userId: any) => {
  try {
    let { data: cartItems, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId);

    if (!error) {
      return cartItems;
    } else {
      throw new Error("Error retrieving cart: " + error.message);
    }
  } catch (error) {
    throw error;
  }
};
