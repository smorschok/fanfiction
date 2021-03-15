import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import Select from "@material-ui/core/Select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ImageUploading from "react-images-uploading";
import { FormattedMessage  } from "react-intl";
import { MenuItem } from "@material-ui/core";

export const CreatePage = () => {
  const { token } = useContext(AuthContext);
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const [tags, setTags] = useState(null);
  const [tagsList, setTagsList] = useState(null);
  const [fanfic, setFanfic] = useState({
    title: "",
    description: "",
    genre: "",
    tag: [],
    text: "",
    name: "",
    image: "",
  });

  const fetchTags = useCallback(async () => {
    try {
      const fetched = await request("api/user/tag", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setTags(fetched.tags);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    let obj = {};
    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        obj[tags[i]] = null;
      }
      setTagsList(obj);
    }
  }, [tags]);

  useEffect(() => {
    var modal = document.querySelectorAll(".modal");
    window.M.Modal.init(modal);
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    console.log(2)
    var chips = document.querySelector(".chips");
    let elem = window.M.Chips.init(chips, {
      autocompleteOptions: {
        data: tagsList,
        limit: Infinity,
        minLength: 1,
      },
      onChipAdd: function () {
        setFanfic(e=>({...e,tag:elem.chipsData}))
      },
    });
  }, [tagsList]);

  const changeHandler = (event) => {
    setFanfic({ ...fanfic, [event.target.name]: event.target.value });
    console.log(fanfic)
  };

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setFanfic({ ...fanfic, text: newValue });
  };

  const createFanficHandler = async (event) => {
          

    event.preventDefault();

    try {
     
      const data = await request(
        "api/user/newFanfic",
        "POST",
        { ...fanfic },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message(data.message);
    } catch (e) {}
  };

  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setFanfic({ ...fanfic, image: imageList[0] });
  };

  const mdParser = new MarkdownIt();
  
  

  return (
    <div className="row">
      <div className="container">
        <div className="row card orange lighten-3 z-depth-4">
          <div className="col s12  center">
            <h3>          <FormattedMessage id="fanfic-create.title-fanfic" />
</h3>
          </div>
          <div className="input-field col s12">
            <textarea
              id="title"
              name="title"
              type="text"
              className="materialize-textarea center"
              value={fanfic.title}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="row card orange lighten-3 z-depth-4">
          <div className="col s12  center">
            <h3>           <FormattedMessage id="fanfic-create.description" />
</h3>
          </div>
          <div className="input-field col s12">
            <textarea
              id="description"
              name="description"
              className="materialize-textarea"
              value={fanfic.description}
              onChange={changeHandler}
            ></textarea>
          </div>
        </div>

        <div className="row card orange lighten-3  z-depth-4">
          <div className="col s12  center">
            <h3>           <FormattedMessage id="fanfic-create.genre" />
</h3>
          </div>
          <div className="input-field col s12">
            <div>
              <Select
                className="input-field col s12"
                id="demo-controlled-open-select"
                name="genre"
                value={fanfic.genre}
                onChange={changeHandler}
              >
                <MenuItem value={""}> <FormattedMessage id={'fanfic-create.genre-0'} /></MenuItem>
                <MenuItem value={"Детектив"}><FormattedMessage id={'fanfic-create.genre-1'} /> </MenuItem>
                <MenuItem value={"Триллер"}><FormattedMessage id={'fanfic-create.genre-2'} /></MenuItem>
                <MenuItem value={"Роман"}><FormattedMessage id={'fanfic-create.genre-3'} /></MenuItem>
                <MenuItem value={"Приключения"}><FormattedMessage id={'fanfic-create.genre-4'} /></MenuItem>
                <MenuItem value={"Фантастика"}><FormattedMessage id={'fanfic-create.genre-5'} /></MenuItem>
                <MenuItem value={"Фольклор"}><FormattedMessage id={'fanfic-create.genre-6'} /></MenuItem>
                <MenuItem value={"Юмор"}><FormattedMessage id={'fanfic-create.genre-7'} /></MenuItem>
                <MenuItem value={"Прочее"}><FormattedMessage id={'fanfic-create.genre-8'} /></MenuItem>
              </Select>
            </div>
          </div>
        </div>

        <div className="row card orange lighten-3  z-depth-4">
          <div className="col s12  center">
            <h3>          <FormattedMessage id="fanfic-create.tags" />
</h3>
          </div>
          <div className="input-field col s12 ">
            <div className="chips">
              <input
                name="tag"
                className="custom-class chips-autocomplete"
                autoComplete={"off"}
              />
            </div>
          </div>
        </div>

        <div className="row card orange lighten-3  z-depth-4">
          <div className="col s12  center">
            <h3>           <FormattedMessage id="fanfic-create.title-chapter" />
</h3>
          </div>
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              name="name"
              className="materialize-textarea center"
              value={fanfic.name}
              onChange={changeHandler}
            ></textarea>
          </div>
        </div>

        <div className="row card orange lighten-3 z-depth-4">
          <div className="col s12  center">
            <h3>           <FormattedMessage id="fanfic-create.text-chapter" />
</h3>
          </div>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                <button
                  className="btn"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button className="btn" onClick={onImageRemoveAll}>
                  Remove all images
                </button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button
                        className="btn"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </button>
                      <button
                        className="btn"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <MdEditor
            name="text"
            value={fanfic.text}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>

        <button
          type="button"
          className="waves-effect right btn orange darken-1 card"
          onClick={createFanficHandler}
        >
          Создать фанфик
        </button>
      </div>
    </div>
  );
};
