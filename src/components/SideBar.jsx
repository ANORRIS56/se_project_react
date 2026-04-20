import "../blocks/SideBar.css";
import terrenceAvatar from "../images/terrence.svg";

function SideBar() {
  return (
    <div className="profile__sidebar">
      <img
        src={terrenceAvatar}
        alt="Terrence Teggene"
        className="profile__avatar"
      />
      <p className="profile__name">Terrence Teggene</p>
    </div>
  );
}

export default SideBar;
