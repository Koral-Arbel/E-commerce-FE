import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { faAppleAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignInAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import SearchBar from "./SearchBar";

function Navbar({ user }) {
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.siteTitle}>
        <FontAwesomeIcon icon={faAppleAlt} /> Original Devices
      </Link>
      <SearchBar />
      <ul>
        <CustomLink to="/login">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </CustomLink>
        <CustomLink to="/signUp">
          <FontAwesomeIcon icon={faUser} /> Sign-Up
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
