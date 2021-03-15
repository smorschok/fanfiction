import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useHttp } from "../hooks/http.hook";

export const SearchPage = () => {
  const search = useParams().keyword;
  const { request, loading } = useHttp();
  const [chapter, setChapter] = useState(null);

  const getChapter = useCallback(async () => {
    try {
      const fetched = await request(`/api/fanfic/search`, "POST", {
        search: search,
      });
      setChapter(fetched);
    } catch (e) {}
  }, [search, request]);

  useEffect(() => {
    getChapter();
  }, [getChapter, search]);

  if (loading) {
    return <Loader />;
  }

  if (chapter && !loading) {
    return (
      <div className="container">
        {chapter.map((e) => {
          return (
            <div className=" container  " key={e._id}>
              <NavLink style={{ display: "block" }} to={`/fanfic/${e._id}`}>
                <div className="col s12 m6">
                  <div className="card deep-orange darken-1 hover">
                    <div className="card-content white-text">
                      <span className="card-title">{e.title}</span>
                      <p>{e.description}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h1>По результатам запроса ничего не найдено</h1>
    </div>
  );
};
