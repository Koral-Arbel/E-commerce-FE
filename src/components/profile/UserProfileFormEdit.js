import { useState, useEffect } from "react";
import styles from "./UserProfileFormEdit.module.css";

function UserProfileFormEdit({ userDetails, onUpdate, onCancel }) {
  const [editedDetails, setEditedDetails] = useState(userDetails);

  useEffect(() => {
    setEditedDetails(userDetails);
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleUpdateClick = () => {
    onUpdate(editedDetails);
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <div className={styles.editProfileForm}>
      <div className={styles.inputContainer}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={editedDetails.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={editedDetails.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={editedDetails.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={editedDetails.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Full Address:</label>
        <input
          type="text"
          name="fullAddress"
          value={editedDetails.fullAddress}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
}

export default UserProfileFormEdit;
