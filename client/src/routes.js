import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {AuthPage} from './pages/AuthPage'
import {DetailPage} from './pages/DetailPage'
import {CreatePage} from './pages/CreatePage'

export const useRoutes = isAuthenticated =>{
  if (isAuthenticated){
      return(
      
        
        //   <Routes>
        //       <Route path="/links" exact>
        //           <LinksPage/>
        //       </Route>
        //       <Route path="/create" exact>
        //           <CreatePage/>
        //       </Route>
        //       <Route path="/detail/:id" exact>
        //           <DetailPage/>
        //       </Route>
        //       <Navigate to="/create"/>

        //   </Routes>
        <>
        
      
    
        <Routes>
        <Route exact path="/" element={<CreatePage/>}/>
        <Route path="/links"  element={<LinksPage/>}/>
        <Route path="/detail/:id" element={<DetailPage/>}/>
        
    </Routes>
    {/* <Navigate to="/create" /> */}
    </>
      )
  }
  return(
    <>
    
      <Routes>
          <Route path="/" exact element={<AuthPage/>}/>   
      </Routes>
      </>
  )
}