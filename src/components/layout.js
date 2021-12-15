import * as React from "react";
import { Link } from "gatsby";
import {
  container,
  navLinks,
  navLinkText,
  navLinkItem,
  siteTitle,
} from "./layout.module.css";

const Layout = ({ pageTitle, children }) => {
  return (
    <div className={container}>
      <title>
        {pageTitle} | Brennan Manning 
      </title>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinks}>
            <Link to="/blog" className={navLinkText}>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <header className={siteTitle}>Brennan Manning</header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
