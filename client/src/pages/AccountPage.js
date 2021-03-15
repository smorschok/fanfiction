import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { FanficList } from "../components/FanficList";
import { Loader } from "../components/Loader";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export const AccountPage = () => {
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [fanfics, setFanfics] = useState([]);

  const fetchFanfics = useCallback(async () => {
    try {
      const fetched = await request("api/user", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setFanfics(fetched);
    } catch (e) {}
  }, [token, request]);
  useEffect(() => {
    fetchFanfics();
  }, [fetchFanfics]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className = 'center'>
      <NavLink
        className="waves-effect waves-light btn-large orange darken-1 card"
        to="/create"
      >
                    <FormattedMessage id="account-button.create" />

      </NavLink>
</div>
      {!loading && <FanficList fanfics={fanfics} />}
    </div>
  );
};
