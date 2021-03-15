import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FormattedMessage } from "react-intl";

export const FanficCard = ({ fanfic }) => {
  const auth = useContext(AuthContext);
  const access = auth.userId === fanfic.owner;
  return (
    <>
      <h3 className="center">{fanfic.title}</h3>
      <div className="center tag-container">
        {fanfic.tag.map((e, index) => {
          return (
            <span className="chip  deep-orange accent-1" key={index}>
              {e.tag}
            </span>
          );
        })}
      </div>

      <div className="container row">
        <p>
          <strong>Краткое описание:</strong> {fanfic.description}
        </p>
        <p>
          <strong>Жанр:</strong> {fanfic.genre}
        </p>
        <div hidden={!access}>
          <NavLink
            className="btn row orange darken-1 card"
            to={`/chapterAdd/${fanfic._id}`}
          >
            {" "}
            <FormattedMessage id="fanficCard-button.addFanfic" />
          </NavLink>
        </div>
        <div className="collection">
          {fanfic.chapters.map((e) => {
            return (
              <NavLink
                className="collection-item orange lighten-1"
                style={{ color: "#fff" }}
                to={`/chapter/${e._id}`}
                key={e._id}
              >
                {e.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};
