"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { supabase } from "@/services/supabase";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import "./Avatar.scss";
import placeholder from "@/public/assets/img/profile-placeholder.png";

interface AvatarProps {
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}

const Avatar: React.FC<AvatarProps> = ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.error("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Please select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="avatar-container">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="avatar-img"
          width={size}
          height={size}
        />
      ) : (
        <div
          className="no-image"
          style={{
            width: size,
            height: size,
            backgroundImage: placeholder as any,
          }}
        />
      )}
      <div className="actions-container">
        <label className="button" htmlFor="single">
          {uploading ? "Uploading ..." : <FaEdit />}
        </label>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default Avatar;
