import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import {
  deleteUser,
  getProfileUser,
  updateProfileUser,
} from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import UserProfileContext from "../context/UserProfileContext";
import styles from "./UserProfile.module.css";
import EditProfileForm from "./UserProfileFormEdit";

function UserProfile() {
  const { auth, setAuth } = useContext(AuthContext);
  const { userDetails, setUserDetails } = useContext(UserProfileContext);
  const [isUserDeleted, setUserDeleted] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
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

  const handleDeleteUserBtn = async () => {
    try {
      await deleteUser(userDetails.id, auth.token);
      setAuth((prevAuth) => ({
        ...prevAuth,
        isLoggedIn: false,
        userId: userDetails.id,
        token: auth.token,
        username: userDetails.username,
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

  const handleUpdateUser = async (updatedDetails) => {
    try {
      const token = auth.token;
      console.log("Updating user with details:", updatedDetails);
      const updatedUser = await updateProfileUser(
        userDetails.id,
        token,
        updatedDetails
      );
      console.log("Updated user:", updatedUser);
      setUserDetails(updatedUser);
      setEditing(false);
      setUpdated(true);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const handleRefreshUserProfile = async () => {
    try {
      const response = await getProfileUser(auth.username);
      setUserDetails(response);
    } catch (error) {
      console.error("Error refreshing user profile: ", error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setUpdated(false);
    handleRefreshUserProfile();
  };

  return (
    <div className={styles["user-profile-container"]}>
      <Typography variant="h4">User Profile</Typography>
      {userDetails ? (
        <>
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Profile Updated</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your profile has been updated successfully!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          {isEditing ? (
            <EditProfileForm
              userDetails={userDetails}
              onUpdate={handleUpdateUser}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <Paper elevation={1} className={styles["profile-details-paper"]}>
              <Breadcrumbs variant="body1">
                User ID: {userDetails.id}
              </Breadcrumbs>
              <Typography variant="body1">
                Username: {userDetails.username}
              </Typography>
              <Typography variant="body1">
                Email: {userDetails.email}
              </Typography>
              <Typography variant="body1">
                First Name: {userDetails.firstName}
              </Typography>
              <Typography variant="body1">
                Last Name: {userDetails.lastName}
              </Typography>
              <Typography variant="body1">
                Phone: {userDetails.phone}
              </Typography>
              <Typography variant="body1">
                Full Address: {userDetails.fullAddress}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={styles["profile-edit-btn"]}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>
              <br />
              <Button
                variant="contained"
                color="secondary"
                className={styles["profile-delete-btn"]}
                onClick={handleDeleteUserBtn}
              >
                Delete Account
              </Button>
            </Paper>
          )}
        </>
      ) : (
        <Typography variant="body1">Loading user profile...</Typography>
      )}
    </div>
  );
}

export default UserProfile;
