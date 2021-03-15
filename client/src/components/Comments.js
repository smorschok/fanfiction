import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { GetComments } from "./GetComments";
// import io from "socket.io-client";
import { useMessage } from "../hooks/message.hook";
import { FormattedMessage } from "react-intl";

// const socket = io();

export const Comments = ({ comments }) => {
  const message = useMessage();
  const auth = useContext(AuthContext);
  const fanficId = useParams().id;
  const { request } = useHttp();
  const [state, setState] = useState([]);
  const [form, setform] = useState({ name: auth.email, comment: "" });
  // useEffect(() => {
  //   socket.on("message", ({ name, comment }) => {
  //     setState([...state, { name, comment }]);
  //   });
  //   return () => {
  //     socket.off("message");
  //   };
  // });

  const addComment = async () => {
    if (form.comment) {
      try {
        await request(
          `/api/user/comment/${fanficId}`,
          "POST",
          { ...form },
          {
            Authorization: `Beare ${auth.token}`,
          }
        );
        // socket.emit("message", form);
      } catch (e) {
        message("Вы не авторизованы");
      }
      setform({ ...form, name: auth.email, comment: "" });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div>
        <textarea
          className="materialize-textarea white"
          id="textarea1"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder={"Комментарий"}
        ></textarea>
      </div>

      <div className="row">
        <button className="btn orange darken-1" onClick={addComment}>
          <FormattedMessage id="fanficCard-button.addComment" />
        </button>
      </div>

      <ul
        className="collection card"
        style={{ border: "2px solid #000", borderRadius: "10px" }}
      >
        <GetComments comments={comments} />
        {state &&
          state.map((comment, i) => (
            <li className="collection-item" key={i}>
              <strong>{comment.name}: </strong>
              {comment.comment}
            </li>
          ))}
      </ul>
    </div>
  );
};
