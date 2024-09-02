import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import { Url } from '../App';

const UserSchemaValidation = yup.object({
    Email: yup.string().email("!Invalid Email format").required("!Email required"),
    Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required")
})
function Lead_Login() {
    const navigate = useNavigate()

    // Clearing session storage
    useEffect(()=>{
        sessionStorage.clear()
    },[])

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Email : "",
            Password : ""
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifyLogin(data)
            //console.log(data)
        }
    })

    // Checking login credentilals
    const verifyLogin = async(data)=>{
        try{
            const verifyData = await axios.post(`${Url}/Lead/`,data,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            //console.log(verifyData)
            const token = verifyData.data.token;
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('Name',verifyData.data.user.First_Name)
            sessionStorage.setItem('Role',verifyData.data.user.Role)
            sessionStorage.setItem('Id',verifyData.data.user._id)
            toast.success(verifyData.data.message)
            navigate("/LeadDashboard")
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }


  return (
    <div className='MainParent'>
        <div className='LoginCont'>
            <a href="/" className='LoginNav'>Employee Login</a>
            <div className='FormCont'>
                <h3>Customer Login!!</h3>
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
    
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Password"
                        helperText = "Enter Your Password"
                        name = "Password"
                        value = {values.Password}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Password && touched.Password ? <p style={{color:"crimson"}}>{errors.Password}</p>:""}
                    <a href="/Lead/ForgotPassword">Forgot Password??</a><br/>
                    <Button type="submit" size="sm">Login</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Lead_Login;