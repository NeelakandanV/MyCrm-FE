import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Url } from "../App";
import BaseApp from "../BaseApp/Base";



export default function ServiceView(){
    const navigate = useNavigate();
    const {id} = useParams();
    const token = sessionStorage.getItem('token') 
    const [service,setService] = useState([]);


    useEffect(()=>{
        const getData = async()=>{
            try{
                const EmpResponse = await axios.get(`${Url}/Services/${id}`,{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                })
                setService([EmpResponse.data.user])
                //console.log(EmpResponse.data)
                toast.success(EmpResponse.data.message)
            }
            catch(err){
                toast.error(err.response.data.message)
            }
        }
        getData();
    },[])

    return(
        <BaseApp PageTitle="Service Detailed View">
            <div className="view-mainCon">
                {service.map((per,idx)=>(
                    <div className="view-user" key={idx}>
                        <p><b>Service Data</b></p>
                        <p>Service Id : {per._id}</p>
                        <p>Service_Name : {per.Service_Name}</p>
                        <p>Description : {per.Description}</p>
                        <p>Status : {per.Status}</p>
                        <p><b>Service Requested by</b></p>
                        <p>Lead Id : {per.Requested_By}</p>
                        <p><b>Employee Assigned</b></p>
                        <p>Employee Id : {per.Employee_Assigned}</p>
                        <br/>
                        <div className="view-stu-btn">
                            <Button onClick={()=>navigate("/Services/ServiceRequests")}><FontAwesomeIcon icon={faUser} />{" "}Back to Services Data</Button>
                        </div>
                    </div>
                ))}
            </div>
        </BaseApp>
    );
}