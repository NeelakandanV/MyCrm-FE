import React, { useEffect, useState } from 'react'
import BaseApp from './Base'
import { toast } from 'react-toastify'
import { Url } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [data,setData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    if(token){
      const Count_Data = async()=>{
        try{
          const Data = await axios.get(`${Url}/Dashboard`,{
            headers:{
              "Content-Type":"application/json",
              "Authorization" : `Bearer ${token}`
            }
          })
          //console.log(Data)
          setData(Data.data)
          toast.success(Data.data.message)
        }
        catch(err){
          //console.log(err)
          toast.error("Unauthorized")
          navigate("/")
        }
      }
      Count_Data()
    }
    else{
      navigate("/")
    }
  },[])
  return (
    <BaseApp PageTitle="Dashboard">
      <div className='DashboardCont'>
        <div className='CountCont'>
          <p><b>Leads Generated{" "}--<span>{data.Lead}</span></b></p>
          <p><b>Service Requests{" "}--<span>{data.Service}</span></b></p>
          <p><b>Contacts Created{" "}--<span>{data.Contact}</span></b></p>
        </div>
        <hr/>
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

export default Dashboard