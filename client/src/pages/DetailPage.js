import React, {useContext, useEffect, useState, useCallback} from "react"
import { useParams } from "react-router"
import { useHttp } from "../hooks/http.hook"
import { Loader } from "../components/Loader"
import {LinkCard} from "../components/LinkCard"
import { AuthContext } from "../context/AuthContext"


export const DetailPage = ()=>{
    const {token} = useContext(AuthContext)
    const {request, loading}= useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getlink = useCallback(async()=>{
      try { 
          const fetched = await request(`http://localhost:5000/api/link/${linkId}`, 'GET', null,{
              Authorization: `Bearer ${token}`
          })
          setLink(fetched)
      } catch (e) {
          console.log("не идет запрос")
      }
    }, [token, linkId, request])
useEffect(()=>{
    getlink()
}, [getlink])
if(loading){
    return <Loader/>
}
    return(
        <div>
            {!loading && link && <LinkCard link={link}/>}
        </div>
    )
}