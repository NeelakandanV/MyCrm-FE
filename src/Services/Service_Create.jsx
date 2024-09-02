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
  Service_Name:yup.string().required("!Kindly Enter  Service Name"),
  Description:yup.string().required("!Kindly Enter  Description"),
  Status:yup.string().required("!Required Field")
})


function ServiceCreate() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Service_Name:"",
            Description:"",
            Status :"Created"
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifySignup(data)
            //console.log(data)
        }
    })

    // Creating New Service
    const verifySignup = async(data)=>{
        try{
            const verifyData = await axios.post(`${Url}/Services/create`,data,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            //console.log(verifyData)
            toast.success(verifyData.data.message)
            navigate('/Services/ServiceRequests')
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }

  return (
    <BaseApp PageTitle="Create Service Request">
        <div className="Backbtn">
            <Button onClick={()=>navigate("/Services/ServiceRequests")}>⬅️Back to Services data</Button>
        </div>
        <div className="CreateForm">
            <form className="UserFormCont" onSubmit={handleSubmit}>
                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Service Name"
                helperText = "Enter Service Name"
                name = "Service_Name"
                value = {values.Service_Name}
                onChange = {handleChange}
                onBlur = {handleBlur} /><br/>
                {errors.Service_Name && touched.Service_Name ? <p style={{color:"crimson"}}>{errors.Service_Name}</p>:""}
                        
                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Description"
                helperText = "Enter Description"
                name = "Description"
                value = {values.Description}
                onChange = {handleChange}
                onBlur = {handleBlur} /><br/>
                {errors.Description && touched.Description ? <p style={{color:"crimson"}}>{errors.Description}</p>:""}

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

export default ServiceCreate;