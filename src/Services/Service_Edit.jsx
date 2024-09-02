import React from 'react'
import BaseApp from '../BaseApp/Base';
import { useParams } from 'react-router-dom';
import { Url } from "../App";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, InputLabel, MenuItem, Select,FormHelperText , TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Appstate } from '../Appcontext/AppProvider';

const UserSchemaValidation = yup.object({
  Service_Name:yup.string().required("!Kindly Enter  Service Name"),
  Description :yup.string().required("!Kindly Enter Description"),
  Status: yup.string().required("Required Field!")
})

function ServiceEdit() {
    const {id} = useParams();
    const {service} = Appstate();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const EmplView = service.filter((ele)=>ele._id==id)
    const {Service_Name,Description,Status} = EmplView[0]

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Service_Name,
            Description,
            Status
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifySignup(data)
            //console.log(data)
        }
    })

    // Updating Service credentilals
    const verifySignup = async(data)=>{
        try{
            const verifyData = await axios.put(`${Url}/Services/update/${id}`,data,{
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
    <BaseApp PageTitle="Update Details">
        <div className="Backbtn">
            <Button onClick={()=>navigate("/Services/ServiceRequests")}>⬅️Back to Service data</Button>
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

                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="Status"
                    value={values.Status}
                    label="Status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="Created">Created</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In Process">In Process</MenuItem>
                    <MenuItem value="Released">Released</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                  <FormHelperText>Current Status</FormHelperText>
                </FormControl>
                {errors.Status && touched.Status ? <p style={{color:"crimson"}}>{errors.Status}</p>:""}
                <br/>
                <div className="EmpCrtBtn">
                <Button type="submit" className="EmpCrt"><FontAwesomeIcon icon={faArrowUp} style={{color: "#74C0FC",}} />Update</Button> 
                </div>
            </form>
        </div>
    </BaseApp>
  )
}

export default ServiceEdit;