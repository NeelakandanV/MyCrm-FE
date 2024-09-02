import React from 'react'
import BaseApp from '../BaseApp/Base';
import { useParams } from 'react-router-dom';
import { Url } from "../App";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
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
})

function ContactToLead() {
    const {id} = useParams();
    const {contact} = Appstate();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const EmplView = contact.filter((ele)=>ele.Email==id)
    const {First_Name,Last_Name,Email} = EmplView[0]

    // Form Validation
    const{values,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            First_Name,
            Last_Name,
            Email
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifySignup(data)
            //console.log(data)
        }
    })

    // Updating New Employee credentilals
    const verifySignup = async(data)=>{
        try{
            const verifyData = await axios.put(`${Url}/Contacts/changeToLead/${id}`,data,{
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
    <BaseApp PageTitle="Promote Contact to Lead">
        <div className="Backbtn">
            <Button onClick={()=>navigate("/Contacts")}>⬅️Back to Contact data</Button>
        </div>
        <div className="CreateForm">
            <form className="UserFormCont" onSubmit={handleSubmit}>
                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "First Name"
                helperText = "Enter First Name"
                name = "First_Name"
                value = {values.First_Name}
                onBlur = {handleBlur} /><br/>
                {errors.First_Name && touched.First_Name ? <p style={{color:"crimson"}}>{errors.First_Name}</p>:""}
                        
                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Last Name"
                helperText = "Enter Last Name"
                name = "Last_Name"
                value = {values.Last_Name}
                onBlur = {handleBlur} /><br/>
                {errors.Last_Name && touched.Last_Name ? <p style={{color:"crimson"}}>{errors.Last_Name}</p>:""}

                <TextField fullWidth margin="dense" 
                id = "outlined-helperText"
                label = "Email Id"
                helperText = "Enter Email"
                name = "Email"
                value = {values.Email}
                onBlur = {handleBlur} /><br/>
                {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}
                <br/>
                <div className="EmpCrtBtn">
                    <p><sub>(!Verify details before changing to lead)</sub></p>
                    <Button type="submit" className="EmpCrt"><FontAwesomeIcon icon={faArrowUp} style={{color: "#74C0FC",}} />Promote now!</Button> 
                </div>
            </form>
        </div>
    </BaseApp>
  )
}

export default ContactToLead;