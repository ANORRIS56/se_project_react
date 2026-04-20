import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({ items = [], currentUser, onCardClick, onAddItem }) {
  return (
    <div className="profile">
      <SideBar user={currentUser} />
      <ClothesSection
        clothingItems={items}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
