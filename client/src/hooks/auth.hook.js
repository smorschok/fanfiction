import {useState,useCallback,useEffect} from 'react'
const storageName = 'userData'
export const useAuth = () =>{
    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)
    const [ready,setReady] = useState(false)
    const [email,setEmail] = useState(null)

    const login = useCallback((jwtToken,id,mail)=>{
        setToken(jwtToken)
        setUserId(id)
        setEmail(mail)
        localStorage.setItem(storageName,JSON.stringify({
            userId:id,token:jwtToken,email:mail
        }))
    },[])
    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        setEmail(null)
        localStorage.removeItem(storageName)
    },[])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            login(data.token,data.userId,data.email)
        }
        setReady(true)
    },[login])


    return {login,logout,token,userId,ready,email}

}