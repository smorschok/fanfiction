import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { FormattedMessage } from "react-intl";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
    key: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    var elems = document.querySelector(".modal");
    window.M.Modal.init(elems);
    var instance = window.M.Modal.getInstance(elems);
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      instance.open();
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId, data.email);

      window.location.reload();
    } catch (e) {}
  };

  const keyHandler = async () => {
    try {
      const data = await request("api/auth/key", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center">
          <FormattedMessage id="autentification.title" />
        </h1>
        <div className="card white darken-1">
          <div className="card-content white-text">
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="color-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">
                  <FormattedMessage id="autentification-email.label" />
                </label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  minLength="6"
                  className="color-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">
                  <FormattedMessage id="autentification-password.label" />
                </label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              <FormattedMessage id="autentification-button.login" />
            </button>

            <a
              href="#!"
              className="waves-effect waves-light btn  "
              onClick={registerHandler}
              disabled={loading}
            >
              <FormattedMessage id="autentification-button.register" />
            </a>
          </div>
        </div>
      </div>

      <div id="modal1" className="modal">
        <div className="modal-content">
          <div className="input-field col s12">
            <input
              placeholder="Введите ключ"
              id="key"
              type="text"
              name="key"
              className="color-input"
              value={form.key}
              onChange={changeHandler}
              autoComplete={"off"}
            />
            <label htmlFor="key">Введите ключ, присланный вам на почту</label>
          </div>
        </div>
        <button
          className="modal-close waves-effect waves-green btn right"
          onClick={keyHandler}
        >
          ОК
        </button>
      </div>
    </div>
  );
};
