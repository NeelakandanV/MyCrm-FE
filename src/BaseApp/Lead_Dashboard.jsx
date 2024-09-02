import React, { useEffect } from 'react'
import BaseApp from './Base'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function LeadDashboard() {
  const navigate = useNavigate();
  const Role = sessionStorage.getItem('Role')

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    if(!token){
        toast.error("Unauthorized")
        navigate("/")
    }
    },[])
  return (
    <BaseApp PageTitle="Dashboard">
      <div className='DashboardCont'>
        <div className='AboutCont'>
          <h3 style={{color:"blue",textDecoration:"underline"}}>About </h3>
          <p>At MYCRM, we believe that building strong relationships with your customers is the key to unlocking growth and success. Founded in [Year] by a team of passionate [industry] experts, our mission is to empower businesses of all sizes with a CRM solution that is as intuitive as it is powerful.</p>
        </div>
        <div className='ServiceCont'>
          <h3 style={{color:"purple",textDecoration:"underline"}}>Why Our Service</h3>
          <ul>
            <li>Comprehensive Customer Management</li>
            <li>Customer Support Tools</li>
            <li>User-Friendly Interface</li>
            <li> Security and Compliance</li>
          </ul>
        </div>
      </div>
    </BaseApp>
  )
}

export default LeadDashboard