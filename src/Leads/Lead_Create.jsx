import axios from 'axios';
import { Url } from "../App";
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BaseApp from '../BaseApp/Base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


const UserSchemaValidation = yup.object({
  First_Name:yup.string().required("!Kindly Enter  First Name"),
  Last_Name:yup.string().required("!Kindly Enter  Last Name"),
  Email: yup.string().email("!Invalid Email format").required("!Email required"),
  Password: yup.string().min(8,"!Password should be atleast 8 characters"),
  Status: yup.string()
})


function LeadCreate() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            First_Name:"",
            Last_Name:"",
            Email : "",
            Password : "12345678",
            Status : "New"
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifySignup(data)
            //console.log(data)
        }
    })

    // Creating New Employee credentilals
    const verifySignup = async(data)=>{
        try{
            const verifyData = await axios.post(`${Url}/Lead/create`,data,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            //console.log(verifyData)
            toast.success(verifyData.data.message)
            navigate('/Lead/LeadData')
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }

  return (
    <BaseApp PageTitle="Create Lead">
        <div className="Backbtn">
            <Button onClick={()=>navigate("/Lead/LeadData")}>⬅️Back to Lead data</Button>
        </div>
        <div className="CreateForm">
            <form className="UserFormCont" onSubmit={handleSubmit}>
                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "First Name"
                helperText = "Enter First Name"
                name = "First_Name"
                value = {values.First_Name}
                onChange = {handleChange}
                onBlur = {handleBlur} /><br/>
                {errors.First_Name && touched.First_Name ? <p style={{color:"crimson"}}>{errors.First_Name}</p>:""}
                        
                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Last Name"
                helperText = "Enter Last Name"
                name = "Last_Name"
                value = {values.Last_Name}
                onChange = {handleChange}
                onBlur = {handleBlur} /><br/>
                {errors.Last_Name && touched.Last_Name ? <p style={{color:"crimson"}}>{errors.Last_Name}</p>:""}

                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Email Id"
                helperText = "Enter Email"
                name = "Email"
                value = {values.Email}
                onChange = {handleChange}
                onBlur = {handleBlur} /><br/>
                {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}
    
                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Password"
                helperText = "Enter Password"
                name = "Password"
                value = {values.Password}
                onBlur = {handleBlur} /><br/>

                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Status"
                helperText = "Status of verification"
                name = "Status"
                value = {values.Status}
                onBlur = {handleBlur} /><br/>
                <br/>
                <div className="EmpCrtBtn">
                <Button type="submit" className="EmpCrt"><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button> 
                </div>
            </form>
        </div>
    </BaseApp>
  )
}

export default LeadCreate;