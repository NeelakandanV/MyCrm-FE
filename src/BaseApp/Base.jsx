import React, { children } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaEnvelope } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import { IoMdPower } from "react-icons/io";
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function BaseApp({children,PageTitle}){
  const navigate = useNavigate();
  const Name = sessionStorage.getItem("Name")
  const Role = sessionStorage.getItem("Role")
  const Access = sessionStorage.getItem("Access")

  // For Logout
  const Logout = ()=>{
    sessionStorage.clear()
    navigate("/")
    toast.info("Logged Out!!")
  }

  return (
    <div className='BaseParent'>
        <div className='MainTitle'>
            <h3>MYCRM</h3>
            <p><b>One Stop Solution for your management needs</b></p>
        </div>
        <div className='Navigation'>
          <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand className="PageTitle" href="#">{PageTitle}</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${false}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                    Welcome,{Name}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {Role!="Lead" ? <a className='Navbars'  href="/Dashboard">Dashboard</a>:""}
                    { Role=="Admin" ? <a className='Navbars'  href="/manager">Manager</a>:""}
                    { Role=="Admin" || Role=="Manager" ? <a className='Navbars'  href="/users">Employee</a>:""}
                    {Role!="Lead" ? <a className='Navbars'  href="/Lead/LeadData">Leads</a>:""}
                    {Role!="Lead" ? <a className='Navbars'  href="/Contacts">Contacts</a>:""}
                    {Role=="Lead" ? <a className='Navbars'  href="/LeadDashboard">Dashboard</a>:""}
                    <a className='Navbars'  href="/Services/ServiceRequests">Services</a>
                    {Access!="Granted" && Role!="Lead" ? <a className='Navbars'  href="/verifyUser">Verify Account</a>:""}
                  </Nav>
                  <Button onClick={()=>Logout()} variant="danger"><IoMdPower/>{" "}Logout</Button>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
        <div className='Content'>
            {children}
        </div>
        <div className='Footer'>
            <a href="mailto:sales@mycorp.com"><FaEnvelope/>{" "}sales@mycorp.com</a>
            <p><FaRegCopyright/>Mycorp Pvt.Ltd</p>
            <p>All Rights Reserved@2024</p>
        </div>
    </div>
  )
}

export default BaseApp