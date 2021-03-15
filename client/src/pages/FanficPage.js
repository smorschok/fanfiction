import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { Comments } from '../components/Comments'
import { DeleteFanfic } from '../components/DeleteFanfic'
import { FanficCard } from '../components/FanficCard'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const FanficPage = () =>{
    const {token} = useContext(AuthContext)
    const {request,loading} = useHttp()
    const [fanfic,setFanfic] = useState(null)
    const fanficId = useParams().id
    const getFanfic = useCallback(async()=>{

      try {
          const fetched =  await request(`/api/fanfic/${fanficId}`,'GET',null,{
          Authorization:`Beare ${token}`
        })
        setFanfic(fetched)
      } catch (e) {
      }

    },[token,fanficId,request])

    useEffect(()=>{
      getFanfic()
    },[getFanfic])

    if(loading){
      return <Loader/>
    }
  return (
    <div className = 'container'>
    {!loading && fanfic && <DeleteFanfic fanfic = {fanfic}/>}
    
      {!loading && fanfic && <FanficCard  fanfic = {fanfic}/>}
      {!loading && fanfic && <Comments comments = {fanfic.comments}/>}
      
    
    </div>
  )
}
