// Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileForm from "./ProfileForm";
import BookingHistory from "./BookingHistory";
import { useProfile } from "../../hooks/useProfile";
import SideMenu from "./SideMenu";

const ProfilePage = () => {
  const { loading } = useContext(UserContext);
  const { activeTab, setActiveTab } = useProfile();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8">
        {activeTab === "profile" && <ProfileForm />}
        {activeTab === "bookings" && <BookingHistory />}
      </div>
    </div>
  );
};

export default ProfilePage;
