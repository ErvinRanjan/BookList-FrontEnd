import React from "react"
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import ShowBook from "./pages/Showbook"


export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/books/:id' element={<ShowBook></ShowBook>}/>
    </Routes>
  )
}