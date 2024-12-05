import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading/Loading";
import ProfileAvatar from "./ProfileGroup/ProfileAvatar";

const ProfileForm = ({ profileData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState(profileData);
  const router = useRouter();

  useEffect(() => {
    setUpdatedData(profileData); // Atualiza os dados quando o perfil muda
  }, [profileData]);

  // Atualizar perfil
  const handleUpdate = async () => {
    try {
      await onUpdate(updatedData);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  if (!updatedData) return <Loading />;

  return (
    <div>
      <h1>Editar Perfil</h1>
      <ProfileAvatar avatarUrl={updatedData.avatar} />
      <input
        type="text"
        value={updatedData.username}
        onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
      />
      <input
        type="email"
        value={updatedData.email}
        onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
      />
      <button onClick={handleUpdate}>Salvar alterações</button>
    </div>
  );
};

export default ProfileForm;
