import "../blocks/SideBar.css";

function SideBar({ user, onLogout, onEditProfile }) {
  return (
    <div className="profile__sidebar">
      <div className="profile__user">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="profile__avatar" />
        ) : (
          <div className="profile__avatar-placeholder">
            {user?.name?.[0] || "U"}
          </div>
        )}

        <p className="profile__name">{user?.name || "User"}</p>
      </div>

      <button
        type="button"
        className="profile__edit-btn"
        onClick={onEditProfile}
      >
        Change profile data
      </button>

      <button type="button" className="profile__logout-btn" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
