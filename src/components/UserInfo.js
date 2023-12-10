import React from "react";

function UserInfo({ user }) {
  return (
    <div>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Full Address: {user.fullAddress}</p>
      {/* וכל מידע נוסף שאתה רוצה להציג */}
    </div>
  );
}

export default UserInfo;
