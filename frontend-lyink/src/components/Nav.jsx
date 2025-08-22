import React, { useState } from 'react'
import './Nav.css'
import { LiaAngleDoubleUpSolid } from "react-icons/lia";
import { HiOutlineUser } from "react-icons/hi2";
import { RiMessage3Line } from "react-icons/ri";
import { BiBook } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";


const Nav = () => {

  const [activeNav, setActiveNav] = useState('#')
  return (
    <nav className='nav'>
      <a href='#' ><LiaAngleDoubleUpSolid /></a>

      {/* <a href='#' onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><IoChevronUpOutline /></a> */}


      {/* <a href='#about' onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><HiOutlineUser /></a> */}

      <a href="/edit-profile" onClick={() => setActiveNav('#edit-profile')} className={activeNav === '#edit-profile' ? 'active' : ''}>
        <CgAddR />
      </a>

      <a href='#newsletter' ><HiOutlineDocumentText /></a>

      <a href='#services'  ><RiServiceLine /></a>
      <a href='#chats' ><RiMessage3Line /></a>

    </nav>
  )
}

export default Nav