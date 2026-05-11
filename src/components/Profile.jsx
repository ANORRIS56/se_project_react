import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({
  items = [],
  currentUser,
  onCardClick,
  onAddItem,
  onLogout,
  onEditProfile,
}) {
  const currentUserItems = items.filter((item) => {
    const ownerId =
      typeof item.owner === "object" ? item.owner?._id : item.owner;

    return ownerId === currentUser?._id;
  });

  return (
    <div className="profile">
      <SideBar
        user={currentUser}
        onLogout={onLogout}
        onEditProfile={onEditProfile}
      />

      <ClothesSection
        clothingItems={currentUserItems}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
