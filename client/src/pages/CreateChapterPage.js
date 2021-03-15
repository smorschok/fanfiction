import React, { useContext, useEffect, useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { useHttp } from '../hooks/http.hook'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
export const CreateChapterPage = ()=>{
    const {token} = useContext(AuthContext)
  const {request,error,clearError} = useHttp()
  const message = useMessage()

    const[chapter,setChapter] = useState(
        {name:'',text:''}
    )

    useEffect(()=>{
        window.M.updateTextFields()

    })
    useEffect(()=>{
        message(error)
        clearError()
      },[error,message,clearError])
    const chapterId = useParams().id

    const changeHandler = event =>{
        setChapter({...chapter,[event.target.name]:event.target.value})
      }

    const handleEditorChange = ({ html, text }) => {
        const newValue = text.replace(/\d/g, "");
        setChapter({...chapter,text:newValue})      };
  
      const createChapterHandler = async (event) =>{
          event.preventDefault()
          try {
        const data = await request(`/api/user/addChapter/${chapterId}`,'POST',{...chapter},{
            Authorization:`Beare ${token}`

        })
        message(data.message)
          } catch (e) {
              
          }
      }

      const mdParser = new MarkdownIt();

      return(
          <div className = 'container z-depth-5 '>
               <div className="row container orange lighten-3  z-depth-4">
          <div className="col s12  center"><h3> Название главы</h3></div>
            <div className="input-field col s12">
              <textarea 
              id="textarea1" 
              name = 'name'
              className="materialize-textarea center"
              value = {chapter.name}
              onChange = {changeHandler}
              ></textarea>
            </div>
          </div>
            <MdEditor
                name = 'text'
                value={chapter.text}
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />

            <button className = 'btn right'
            onClick = {createChapterHandler}
            >Добавить главу</button>
          </div>
      )

}