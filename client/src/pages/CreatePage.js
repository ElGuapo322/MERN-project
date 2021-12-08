import React, {useState, useEffect, useContext} from "react"
import { useHttp } from "../hooks/http.hook"
import M from "materialize-css"
import { AuthContext } from "../context/AuthContext"
import {useNavigate} from "react-router-dom"

export const CreatePage = ()=>{
    const navigate = useNavigate()
 const auth = useContext(AuthContext)
const [link, setLink] = useState('')
const {request} = useHttp()
useEffect(()=>{
    M.updateTextFields()
 },[])

const pressHandler=async event =>{
    if(event.key ==='Enter'){
        try {
            const data = await request('http://localhost:5000/api/link/generate', 'POST', {from: link},{
                Authorization: `Bearer ${auth.token}`
            })
            navigate(`/detail/${data.link._id}`)
            console.log(data)
        } catch (e) {
            
        }
    }
}

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop:"2rem"}}>
            <div className="input-field ">
          <input placeholder="Вставьте ссылку" value={link} id="link" type="text"  onChange={e=>setLink(e.target.value)} onKeyPress={pressHandler} />
          <label htmlFor="password">Введите ссылку</label>
        </div>
            </div>
        </div>
    )
}