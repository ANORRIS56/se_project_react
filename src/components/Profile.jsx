import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({
  items = [],
  currentUser,
  onCardClick,
  onAddItem,
  onLogout,
}) {
  return (
    <div className="profile">
      <SideBar user={currentUser} onLogout={onLogout} />
      <ClothesSection
        clothingItems={items}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
