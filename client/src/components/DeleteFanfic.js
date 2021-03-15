import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { FormattedMessage } from "react-intl";

export const DeleteFanfic = ({ fanfic }) => {
  const { request } = useHttp();
  const fanficId = useParams().id;
  const history = useHistory();
  const auth = useContext(AuthContext);
  const access = auth.userId === fanfic.owner;
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    window.M.Modal.init(elems);
  });
  const removeFanfic = async () => {
    try {
      await request(`/api/user/delete/${fanficId}`, "POST", null, {
        Authorization: `Beare ${auth.token}`,
      });
      history.push("/account");
    } catch (e) {}
  };

  return (
    <div className="center">
      <div hidden={!access}>
        <a
          className="waves-effect waves-light btn modal-trigger card orange darken-1"
          href="#modal1"
        >
          {" "}
          <FormattedMessage id="fanficCard-button.deleteFanfic" />
        </a>
      </div>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Вы уверены,что хотите удалить фанфик ?</h4>
        </div>
        <div className="modal-footer ">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={removeFanfic}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
