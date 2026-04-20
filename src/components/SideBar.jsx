function Profile({ items, onCardClick }) {
  return (
    <div className="profile">
      {/* LEFT SIDEBAR */}
      <div className="profile__sidebar">
        <img src={avatar} alt="Avatar" className="profile__avatar" />
        <p className="profile__name">Terrence Teggene</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="profile__content">
        <div className="profile__header">
          <h2 className="profile__title">Your items</h2>
          <button className="profile__add-btn">+ Add new</button>
        </div>

        <ul className="cards__list">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </div>
  );
}
