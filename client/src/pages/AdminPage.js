import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AdminList } from '../components/AdminList'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'


export const AdminPage = ()=>{
    const {token} = useContext(AuthContext)
  const {loading,request} = useHttp()
  const [users,setUsers] = useState([])
    const fetchUsers= useCallback(async() =>{
        try {
            
          const fetched = await request('api/admin',"GET",null,{
            Authorization:`Bearer ${token}`
          })
          setUsers(fetched)
        } catch (e) {
          
        }
      },[token,request])
    
      useEffect(()=>{
        fetchUsers()
    
      },[fetchUsers])
    
     
    if(loading){
        return <Loader/>
    }
    return(
        <div>
            <AdminList users = {users}/>
        </div>
    )
}