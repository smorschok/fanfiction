import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { ChapterFanfic } from '../components/ChapterFanfic'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const FanficChapterPage = ()=>{
    const {token} = useContext(AuthContext)
  const {request,loading} = useHttp()
  const [chapter,setChapter] = useState(null)
  const chapterId = useParams().id

  const getChapter= useCallback(async()=>{
    try {
    const fetched =  await request(`/api/fanfic/chapter/${chapterId}`,'GET',null,{
        Authorization:`Beare ${token}`
      })
      setChapter(fetched)
    } catch (e) {
      
    }
  },[token,chapterId,request])

  useEffect(()=>{
    getChapter()
  },[getChapter])

  if(loading){
      return <Loader/>
  }
    
  return(
      <div>
        {!loading && chapter && <ChapterFanfic chapter = {chapter}/>}
      </div>
  )
}