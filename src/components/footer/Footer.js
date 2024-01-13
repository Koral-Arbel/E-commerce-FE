import React from "react";
import styles from "./Footer.module.css"; // ייצא קובץ סגנונות נפרד

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© All rights reserved to Koral Arbel</p>
    </footer>
  );
}

export default Footer;
