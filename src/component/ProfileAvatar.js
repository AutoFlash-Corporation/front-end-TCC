import React from "react";

const ProfileAvatar = ({ avatarUrl }) => {
  return (
    <div>
      <img
        src={avatarUrl || "/default-avatar.png"} // Imagem padrão se não houver avatar
        alt="Avatar"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default ProfileAvatar;
