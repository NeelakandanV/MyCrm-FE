import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Url } from "../App";
import BaseApp from "../BaseApp/Base";



export default function ManagerView(){
    const navigate = useNavigate();
    const {id} = useParams();
    const token = sessionStorage.getItem('token') 
    const [user,setUser] = useState([]);
    const [lead,setLead] = useState([]);
    const [contact,setContact] = useState([]);
    const [service,setService] = useState([]);

    useEffect(()=>{
        const getData = async()=>{
            try{
                const EmpResponse = await axios.get(`${Url}/manager/${id}`,{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                })
                setUser([EmpResponse.data.user])
                setLead(EmpResponse.data.user.Leads_Generated)
                setContact(EmpResponse.data.user.Contacts_Created)
                setService(EmpResponse.data.user.Service_Requests)
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
        <BaseApp PageTitle="Manager Detailed View">
            <div className="view-mainCon">
                {user.map((per,idx)=>(
                    <div className="view-user" key={idx}>
                        <p><b>Manager Data</b></p>
                        <p>Manager Id : {per._id}</p>
                        <p>First_Name : {per.First_Name}</p>
                        <p>Last Name : {per.Last_Name}</p>
                        <p>Email Id : <a href={`mailto:${per.Email}`}>{per.Email}</a></p>
                        <p>Access : {per.Access}</p>
                        <p><b>Leads Generated</b></p>
                        {lead.map((cus,ind)=>(
                            <p key={ind}>Id : {cus},{" "}</p>
                        ))}
                        <p><b>Contacts Created</b></p>
                        {contact.map((con,ids)=>(
                            <p key={ids}>Id : {con},{" "}</p>
                        ))}
                        <p><b>Tasks Assigned-Services</b></p>
                        {service.map((ser,inds)=>(
                            <p key={inds}>Id : {ser},{" "}</p>
                        ))}
                        <div className="view-stu-btn">
                            <Button onClick={()=>navigate("/manager")}><FontAwesomeIcon icon={faUser} />{" "}Back to Managers Data</Button>
                        </div>
                    </div>
                ))}
            </div>
        </BaseApp>
    );
}