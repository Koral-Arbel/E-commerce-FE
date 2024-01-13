import React from "react";
import Navbar from "../Navbar";

function Header(props) {
  return (
    <header>
      <Navbar handleAddItemToCart={props.handleAddItemToCart} />
      <div className="header-main-banner"></div>
    </header>
  );
}

export default Header;
