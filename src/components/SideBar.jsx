import "../blocks/SideBar.css";

function SideBar({ user, onLogout }) {
  return (
    <div className="profile__sidebar">
      {user?.avatar ? (
        <img src={user.avatar} alt={user.name} className="profile__avatar" />
      ) : (
        <div className="profile__avatar-placeholder">
          {user?.name?.[0] || "U"}
        </div>
      )}

      <p className="profile__name">{user?.name || "User"}</p>

      <button type="button" className="profile__logout-btn" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
