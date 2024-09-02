import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Url } from '../App';

const UserSchemaValidation = yup.object({
    Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required"),
    ConfirmPassword: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required")
})

function User_ResetPassword() {
    const navigate = useNavigate();

    // Clearing session storage
    useEffect(()=>{
        sessionStorage.clear()
    },[])

    // Getting the data from the link
    const{id,pin,token} = useParams();

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Password:"",
            ConfirmPassword:""
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            if(data.Password==data.ConfirmPassword){
                verifyPassword({Password:data.Password})
                //console.log(data)
            }
            else{
                toast.error("New Password and Confirm Password not matched.")
            }
        }
    })

    // Updating New Password via Reset Link
    const verifyPassword = async(data)=>{
        try{
            const verifyData = await axios.put(`${Url}/ResetPassword/${id}/${pin}/${token}`,data,{
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
        }
    }

  return (
    <div className='MainParent'>
        <div className='LoginCont'>
            <div className='ResetImageCont'>
            <img src="https://www.nicepng.com/png/detail/766-7669045_graphic-hands-giving-away-home-keys-handing-over.png"/>
            </div>
            <div className='FormCont'>
                <h4>Reset Your Password!</h4>
                <p><sub>(For Employees)</sub></p>
    
                <form onSubmit={handleSubmit}>
    
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "New Password"
                        helperText = "Enter New Password"
                        name = "Password"
                        value = {values.Password}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Password && touched.Password ? <p style={{color:"crimson"}}>{errors.Password}</p>:""}
    
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Confirm New Password"
                        helperText = "Confirm New Password"
                        name = "ConfirmPassword"
                        value = {values.ConfirmPassword}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.ConfirmPassword && touched.ConfirmPassword ? <p style={{color:"crimson"}}>{errors.ConfirmPassword}</p>:""}

                    <Button type="submit" size="sm">Reset Password</Button>
                    <hr></hr>
                </form>
            </div>
            <label>Login now :</label>
            <Link to="/">{" "}Login!!</Link>
        </div>
    </div>
  )
}

export default User_ResetPassword;