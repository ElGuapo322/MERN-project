import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {Loader} from "../components/Loader"
import { useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { LinksList } from "../components/LinkList"

export const LinksPage = ()=>{
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async()=>{
        try{
              const fetched = await request("http://localhost:5000/api/link", 'GET', null,{
                  Authorization: `Bearer ${token}`
              }, )
              setLinks(fetched)
        }catch(e){

        }
    },[token, request])
    useEffect(()=>{
        fetchLinks()
    }, [fetchLinks])
    if(loading){
        return <Loader/>
    }
    return(
        <>
            {!loading && <LinksList links={links}/>}
        </>
    )
}