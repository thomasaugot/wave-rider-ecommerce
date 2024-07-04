import { Product, UserType } from "@/types";
import { supabase } from "./supabase";

export const createUser = async (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one number"
    );
  }

  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error && error.message.includes("already exists")) {
      throw new Error("Email already exists");
    }

    console.log("new user created! --> ", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
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

export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
    window.location.href = "/login";
    return "User logged out successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const getUserData = async (userId: string): Promise<UserType | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data || null;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  newData: Partial<UserType>
): Promise<UserType> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(newData)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      throw new Error("Error updating user data: " + error.message);
    }

    if (!data) {
      throw new Error("No user found with the provided ID.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: any) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

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

export const getProducts = async (): Promise<Product[]> => {
  try {
    let { data: products, error } = await supabase.from("products").select("*");

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

export const fetchLastPurchases = async (
  userId: string
): Promise<Product[]> => {
  try {
    const { data: purchases, error } = await supabase
      .from("purchases")
      .select("product_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      throw new Error("Error fetching last purchases: " + error.message);
    }

    const productIds = purchases.map((purchase) => purchase.product_id);

    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productError) {
      throw new Error(
        "Error fetching product details: " + productError.message
      );
    }

    return products || [];
  } catch (error) {
    throw error;
  }
};
