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
  First_Name:yup.string().required("!Kindly Enter  First Name"),
  Last_Name:yup.string().required("!Kindly Enter  Last Name"),
  Email: yup.string().email("!Invalid Email format").required("!Email required"),
  Status: yup.string().required("Required Field!")
})

function LeadEdit() {
    const {id} = useParams();
    const {lead} = Appstate();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const EmplView = lead.filter((ele)=>ele._id==id)
    const {First_Name,Last_Name,Email,Status} = EmplView[0]

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            First_Name,
            Last_Name,
            Email,
            Status
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifySignup(data)
            //console.log(data)
        }
    })

    // Updating New Lead credentilals
    const verifySignup = async(data)=>{
        try{
            const verifyData = await axios.put(`${Url}/Lead/update/${id}`,data,{
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
    <BaseApp PageTitle="Update Details">
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
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Contacted">Contacted</MenuItem>
                    <MenuItem value="Qualified">Qualified</MenuItem>
                    <MenuItem value="Lost">Lost</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
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

export default LeadEdit;