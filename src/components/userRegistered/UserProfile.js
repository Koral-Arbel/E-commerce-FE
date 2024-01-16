// UserProfile.js

import { Button, Paper, Typography } from "@mui/material";
import { deleteUser, getProfileUser } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import styles from "./UserProfile.module.css";

function UserProfile() {
  const { auth, setAuth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);
  const [isUserDeleted, setUserDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getProfileUser(auth.username);
        setUserDetails(response);
        setAuth((prevAuth) => ({
          ...prevAuth,
          userId: response.userId,
        }));
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserProfile();
  }, [auth.username, setAuth, setUserDetails]);

  const handleDeleteCustomerBtn = async () => {
    try {
      await deleteUser(userDetails.id, "Authorization = Bearer " + auth.token);
      setAuth((prevAuth) => ({
        ...prevAuth,
        isLoggedIn: false,
        userId: null,
        token: null,
        username: null,
      }));
      setUserDetails(null);
      setUserDeleted(true);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div className={styles["user-profile-container"]}>
      <Typography variant="h4" className={styles["user-profile-title"]}>
        User Profile
      </Typography>
      {userDetails ? (
        <Paper elevation={1} className={styles["profile-details-paper"]}>
          <div className={styles["profile-details-row"]}>
            <Typography variant="body1">
              <strong>User ID:</strong> {userDetails.id}
            </Typography>
          </div>
          <div className={styles["profile-details-row"]}>
            <Typography variant="body1">
              <strong>Username:</strong> {userDetails.username}
            </Typography>
          </div>
          <div className={styles["profile-details-row"]}>
            <Typography variant="body1">
              <strong>Email:</strong> {userDetails.email}
            </Typography>
          </div>
          <div className={styles["profile-details-row"]}>
            <Typography variant="body1">
              <strong>First Name:</strong> {userDetails.firstName}
            </Typography>
          </div>
          <div className={styles["profile-details-row"]}>
            <Typography variant="body1">
              <strong>Last Name:</strong> {userDetails.lastName}
            </Typography>
          </div>
          <div className={styles["profile-details-row"]}>
            <Typography variant="body1">
              <strong>Phone:</strong> {userDetails.phone}
            </Typography>
          </div>
          <div className={styles["profile-details-row"]}>
            <Typography variant="body1">
              <strong>Full Address:</strong> {userDetails.fullAddress}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className={styles["profile-delete-btn"]}
            onClick={handleDeleteCustomerBtn}
          >
            Delete Account
          </Button>
        </Paper>
      ) : (
        <Typography variant="body1">Loading user profile...</Typography>
      )}
    </div>
  );
}

export default UserProfile;
