// For Contacts.

import { Button,Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Url } from "../App";
import BaseApp from "../BaseApp/Base";
import { Appstate } from "../Appcontext/AppProvider";



function Contact_Read(){
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const {contact,setContact} = Appstate();
    const Access = sessionStorage.getItem('Access')
    const Role = sessionStorage.getItem('Role')

    useEffect(()=>{
        if(token){
            const getData = async()=>{
                try{
                    const Employee = await axios.get(`${Url}/Contacts`,{
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization" : `Bearer ${token}`
                        }
                    })
                    setContact(Employee.data.user)
                    toast.success(Employee.data.message)
                }
                catch(err){
                    toast.error(err.response.data.message)
                }
            }
            getData();
        }
        else{
            navigate("/")
        }
    },[])
    
    // For delete a Lead
    const delData = async(Emp_Id)=>{
        try{
            const response = await axios.delete(`${Url}/Contacts/delete/${Emp_Id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            //console.log(response);
            toast.success(response.data.message)
            const data = contact.filter((emp)=>emp.Email!=Emp_Id)
            setContact(data)
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }

        // For Pagination

        const [CurrPage,setCurrPage] = useState(1);
        let DataPerPage = 5;
        let TotalPage = Math.ceil(contact.length/DataPerPage);
        const LastIndex = CurrPage*DataPerPage;
        const FirstIndex = LastIndex-DataPerPage;
        const PageData = contact.slice(FirstIndex,LastIndex);
        const PageNumbers = [...Array(TotalPage+1).keys()].slice(1);
    
    
        const PrevPage = ()=>{
            if(CurrPage!==1){
                setCurrPage(CurrPage-1);
            }
        }
        
        const NextPage = ()=>{
            if(CurrPage !== TotalPage){
                setCurrPage(CurrPage+1);
            }
        }
        
        const PageNav = (PageNo)=>{
            setCurrPage(PageNo)
        }
    


    return(
        <BaseApp PageTitle="Contacts">
            <div className="EmpReadCont">
                <div className="EmpTableCont">
                    <Table responsive striped bordered hover variant="dark">
                      <thead className="tableHead">
                        <tr>   
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>    
                        {PageData.map((emp,index)=>(
                            <tr key={index}>
                                <td>{FirstIndex + index +1}</td>
                                <td>{emp.First_Name}</td>
                                <td>{emp.Last_Name}</td>
                                <td>{emp.Email}</td>
                                {Access=="Granted" && Role != "Lead"  ? <td><Button  className="view-btn" variant="outline-info" onClick={()=>navigate(`/Contacts/${emp._id}`)}>View</Button></td>:<td><Button  className="view-btn" variant="outline-info" disabled>View</Button></td>}
                                {Access=="Granted" && Role != "Lead"  ? <td><Button className="edit-btn" variant="outline-primary" onClick={()=>navigate(`/Contacts/update/${emp._id}`)} >Edit</Button></td>:<td><Button className="edit-btn" variant="primary" disabled >Edit</Button></td>}
                                {Access=="Granted" && (Role == "Admin" || "Manager")  ? <td><Button className="delete-btn" variant="outline-danger" onClick={()=>{delData(emp.Email)}}>Delete</Button></td>:<td><Button  className="delete-btn" variant="outline-danger" disabled>Delete</Button></td>}
                            </tr>
                        ))}    
                            <tr>
                                {Access=="Granted" && Role != "Lead" ? <td colSpan={7}><Button  onClick={()=>navigate("/Contacts/create")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button></td>:<td colSpan={7}><Button  disabled><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button></td>}
                            </tr>
                      </tbody>
                    </Table>
                </div>
                <div className="EmpPagiCont">
                    <p>Page : {CurrPage} of {TotalPage}</p>
                    <nav className="Pagination">
                        <a href="#" onClick={PrevPage}>Prev</a>
                        {PageNumbers.map((num,ind)=>(
                            <a href="#" key={ind}
                            onClick ={()=>PageNav(num)}
                            >
                                {num}
                            </a>
                        ))}
                        <a href="#" onClick={NextPage}> Next</a>
                    </nav>
                </div>
            </div>
        </BaseApp>
    );
}

export default Contact_Read;