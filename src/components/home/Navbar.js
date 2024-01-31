import React, { useContext, useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {
  faAppleAlt,
  faHeart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignInAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import SearchBar from "../SearchBar";
import AuthContext from "../context/AuthProvider";

function Navbar({ updateResults }) {
  const { auth } = useContext(AuthContext);
  const [isLoggedIn, setLoggedIn] = useState(auth.isLoggedIn);

  useEffect(() => {
    if (auth.isLoggedIn !== isLoggedIn) {
      setLoggedIn(auth.isLoggedIn);
    }
  }, [auth.isLoggedIn]);

  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.siteTitle}>
        <FontAwesomeIcon icon={faAppleAlt} /> Original Devices
      </Link>
      <SearchBar updateResults={updateResults} />
      <ul>
        {auth.isLoggedIn ? (
          <>
            <li className={classes.greeting}>Hello, {auth.username}!</li>
            <CustomLink to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </CustomLink>
            <CustomLink to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </CustomLink>
            <CustomLink to="/favorite">
              <FontAwesomeIcon icon={faHeart} /> Favorite
            </CustomLink>
            <CustomLink to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </CustomLink>
          </>
        ) : (
          <>
            <CustomLink to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </CustomLink>
            <CustomLink to="/signUp">
              <FontAwesomeIcon icon={faUser} /> Sign-Up
            </CustomLink>
          </>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li
      className={
        isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
      }
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
