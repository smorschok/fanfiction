import React from "react";
import { NavLink } from "react-router-dom";

export const AllFanfics = ({ fanfics }) => {
  return (
    <div className="row">
      {fanfics &&
        fanfics.map((item,index) => (
          <NavLink to={`/fanfic/${item._id}`} key={item._id} 
          className="col s8 offset-s2"

          >
            <div
              className="card deep-orange darken-1 hoverable row"
              
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
        ))}
    </div>
  );
};
