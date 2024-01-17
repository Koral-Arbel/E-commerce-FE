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
      <Typography variant="h4">User Profile</Typography>
      {userDetails ? (
        <Paper elevation={1} className={styles["profile-details-paper"]}>
          <Typography variant="body1">User ID: {userDetails.id}</Typography>
          <Typography variant="body1">
            Username: {userDetails.username}
          </Typography>
          <Typography variant="body1">Email: {userDetails.email}</Typography>
          <Typography variant="body1">
            First Name: {userDetails.firstName}
          </Typography>
          <Typography variant="body1">
            Last Name: {userDetails.lastName}
          </Typography>
          <Typography variant="body1">Phone: {userDetails.phone}</Typography>
          <Typography variant="body1">
            Full Address: {userDetails.fullAddress}
          </Typography>
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
