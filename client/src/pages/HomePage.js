import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AllFanfics } from '../components/AllFanfics'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const HomePage = () =>{
  const {token} = useContext(AuthContext)
  const {loading,request} = useHttp()
  const [fanfics,setFanfics] = useState([])
    const fetchFanfics= useCallback(async() =>{

        try {
          const fetched = await request('api/fanfic',"GET",null,{
            Authorization:`Bearer ${token}`
          })
          setFanfics(fetched)
        } catch (e) {
        }
      },[token,request])
    
      useEffect(()=>{
        fetchFanfics()
      },[fetchFanfics])

      if(loading){
        return <Loader/>
      }
  
      return (
        <div>
        {!loading && <AllFanfics fanfics = {fanfics}/>}
        </div>
      )
}
