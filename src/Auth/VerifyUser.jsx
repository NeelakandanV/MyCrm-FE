import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Url } from '../App';


const UserSchemaValidation = yup.object({
  Email: yup.string().email("!Invalid Email format").required("!Email required"),
})


function VerifyUser() {
  const navigate = useNavigate();  

  // Clearing session storage
  useEffect(()=>{
      sessionStorage.clear()
  },[])

  // Form Validation
  const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
      initialValues:{
          Email : ""
      },
      validationSchema : UserSchemaValidation,
      onSubmit:(data)=>{
          verifyEmail(data)
          //console.log(data)
      }
  })

  // Creating Password Reset Link
  const verifyEmail = async(data)=>{
      try{
          const verifyData = await axios.put(`${Url}/verifyUser`,data,{
              headers:{
                  "Content-Type":"application/json",
              }
          })
          //console.log(verifyData)
          toast.success(verifyData.data.message)
          navigate("/")
      }
      catch(err){
          //console.log(err)
          toast.error(err.response.data.message)
          navigate("/")
      }
  }

  return (
    <div className='MainParent'>
        <div className='LoginCont'>
            <div className='FormCont'>
                <h4>Verify Your Account</h4>
                <p>Kindy verify your account to get access to MYCRM.We will send you a verification Link</p>

                <form onSubmit={handleSubmit}>

                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Email Id"
                        helperText = "Enter Your Email"
                        name = "Email"
                        value = {values.Email}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}
    

                    <Button type="submit" size="sm">Verify Account</Button>
                    <hr></hr>
                </form>
            </div>
            <label>Already Verified User! :{" "}</label>
            <Link to="/">Login!!</Link><br/>
        </div>
    </div>
  )
}

export default VerifyUser;