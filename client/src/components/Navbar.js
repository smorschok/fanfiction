import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/auth.hook";
import { FormattedMessage } from "react-intl";
import { LocalePicker } from "./LocalePicker";

export const Navbar = ({ currentLocale, onLocalChange }) => {
  const [search, setSearch] = useState({ name: "" });
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    window.location.reload();
  };

  useEffect(() => {
    var sidenav = document.querySelector(".sidenav");
    window.M.Sidenav.init(sidenav, {
      edge: "right",
    });
  });

  const changeHandler = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
  };

  const searchHandler = (event) => {
    event.preventDefault();
    history.push(`/search/${search.name || "search"}`);
    setSearch({ ...search, name: "" });
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper  orange darken-4">
          <div className="search-container">
            <div className="input-field container">
              <input
                id="search"
                type="search"
                value={search.name}
                name="name"
                onChange={changeHandler}
                className="color-input"
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
            </div>
            <button className="btn orange darken-1" onClick={searchHandler}>
            <FormattedMessage id="navigation-menu.search" />
            </button>
          </div>
          <a
            href="#!"
            data-target="mobile-demo"
            className="sidenav-trigger right"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down ">
            <li>
              <LocalePicker
                currentLocale={currentLocale}
                onLocalChange={onLocalChange}
              />
            </li>

            <li hidden={!isAuthenticated}>
              <NavLink to="/admin">
                <FormattedMessage id="navigation-menu.admin" />
              </NavLink>
            </li>
            <li className="waves-effect waves-light">
              <NavLink to="/">
                <FormattedMessage id="navigation-menu.home" />
              </NavLink>
            </li>
            <li hidden={!isAuthenticated}>
              <NavLink to="/account">
                <FormattedMessage id="navigation-menu.account" />
              </NavLink>
            </li>
            <li className="waves-effect waves-light">
              <NavLink to="/authenticated" hidden={isAuthenticated}>
                <FormattedMessage id="navigation-menu.auth" />
              </NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler} hidden={!isAuthenticated}>
                <FormattedMessage id="navigation-menu.exit" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
      <li>
              <LocalePicker
                currentLocale={currentLocale}
                onLocalChange={onLocalChange}
              />
            </li>

            <li hidden={!isAuthenticated}>
              <NavLink to="/admin">
                <FormattedMessage id="navigation-menu.admin" />
              </NavLink>
            </li>
            <li className="waves-effect waves-light">
              <NavLink to="/">
                <FormattedMessage id="navigation-menu.home" />
              </NavLink>
            </li>
            <li hidden={!isAuthenticated}>
              <NavLink to="/account">
                <FormattedMessage id="navigation-menu.account" />
              </NavLink>
            </li>
            <li  hidden={isAuthenticated} >
              <NavLink to="/authenticated" hidden={isAuthenticated}>
                <FormattedMessage id="navigation-menu.auth" />
              </NavLink>
            </li>
            <li  hidden={!isAuthenticated}>
              <a href="/" onClick={logoutHandler}>
                <FormattedMessage id="navigation-menu.exit" />
              </a>
            </li>
      </ul>
    </div>
  );
};
