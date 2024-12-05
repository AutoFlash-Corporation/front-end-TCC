import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../utils/profile"; // Importa as funções de perfil
import Loading from "../component/Loading/Loading";
import ProfileForm from "../component/ProfileForm";
import ProfileAvatar from "../component/ProfileGroup/ProfileAvatar";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(); // Usando a função separada para buscar o perfil
        setProfileData(data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (updatedData) => {
    try {
      const data = await updateProfile(updatedData); // Usando a função separada para atualizar o perfil
      setProfileData(data);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1>Perfil</h1>
      {editing ? (
        <ProfileForm profileData={profileData} onUpdate={handleUpdate} />
      ) : (
        <div>
          <ProfileAvatar avatarUrl={profileData.avatar} />
          <h2>{profileData.username}</h2>
          <p>{profileData.email}</p>
          <button onClick={() => setEditing(true)}>Editar Perfil</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
