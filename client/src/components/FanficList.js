import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "../hooks/message.hook";
import { FormattedMessage } from "react-intl";

export const FanficList = ({ fanfics }) => {
  const { token } = useContext(AuthContext);
  const message = useMessage();
  const { request } = useHttp();
  const [dropFanfic, setDropFanfic] = useState(null);
  const [order, setOrder] = useState([]);
  const [submit, setSubmit] = useState(true);

  useEffect(() => {
    setDropFanfic(fanfics);
  }, [fanfics]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      dropFanfic,
      result.source.index,
      result.destination.index
    );
    setDropFanfic(items);
    const newOrder = items.map((e) => {
      return e._id;
    });
    setOrder([newOrder]);
  };

  const onDragUpdate = async (result) => {
    setSubmit(false);
  };

  const createFanficHandler = async (event) => {
    event.preventDefault();
    setSubmit(true);
    try {
      const data = await request(
        "api/user/updateOrder",
        "POST",
        { ...order },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message(data.message);
    } catch (e) {}
  };

  return (
    <div>
      <div className="center ">
        <button
          className="btn orange darken-1 card"
          onClick={createFanficHandler}
          disabled={submit}
        >
          <FormattedMessage id="account-button.save" />
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {dropFanfic &&
                dropFanfic.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="row"
                      >
                        <NavLink
                          to={`/fanfic/${item._id}`}
                          className="col s10 offset-s1"
                        >
                          <div
                            className="card deep-orange darken-1 hoverable row"
                            style={{ margin: "0" }}
                          >
                            <h5 className="card-content white-text col s1">
                              {index + 1}
                            </h5>

                            <div className="card-content white-text col s11">
                              <span className="card-title">{item.title}</span>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
