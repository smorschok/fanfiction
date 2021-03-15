import React from "react";
import MarkdownIt from "markdown-it";
import parse from "html-react-parser";
import { Image } from "cloudinary-react";
import { NavLink, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export const ChapterFanfic = ({ chapter }) => {
  const mdParser = new MarkdownIt();
  const chapterId = useParams().id;

  return (
    <>
      <div className="center">
        <NavLink
          className="btn card orange darken-1"
          to={`/chapterChange/${chapterId}`}
        >
          
          <FormattedMessage id="chapterFanfic-button.amendChapter" />
        </NavLink>
      </div>
      {chapter.map((e) => {
        return (
          <div key={e._id} className="container">
            <div className="center">
              {e.chapters[0].image &&<Image
                cloudName="dkqgboopg"
                publicId={`${e.chapters[0].image}`}
                width="200"
                height="200"
                crop="scale"
                className="card"
              />}
              
              <h3> {e.chapters[0].name}</h3>
            </div>
            {parse(mdParser.render(e.chapters[0].text))}
          </div>
        );
      })}
    </>
  );
};
