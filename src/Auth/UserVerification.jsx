import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Url } from '../App';

function UserVerification(){
    const {id,pin,token} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const verify = async()=>{
            try{
                const verifyUser = await axios.get(`${Url}/verifyUser/${id}/${pin}/${token}`)
                toast.success(verifyUser.data.message)
                navigate("/")
            }
            catch(err){
                toast.error(err.response.data.message)
                navigate("/verifyUser")
            }
        }
        verify()
    },[])
    
  return (
    <div className='MainParent'></div>
  )
}

export default UserVerification;