// For Managers.

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



function Manager_Read(){
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const {manager,setManager} = Appstate();
    const Access = sessionStorage.getItem('Access')
    const Role = sessionStorage.getItem('Role')

    useEffect(()=>{
        if(token){
            const getData = async()=>{
                try{
                    const Employee = await axios.get(`${Url}/manager`,{
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization" : `Bearer ${token}`
                        }
                    })
                    setManager(Employee.data.user)
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
    
    // For delete a Manager
    const delData = async(Emp_Id)=>{
        try{
            const response = await axios.delete(`${Url}/manager/delete/${Emp_Id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            //console.log(response);
            toast.success(response.data.message)
            const data = manager.filter((emp)=>emp.Email!=Emp_Id)
            setManager(data)
        }
        catch(err){
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

        // For Pagination

        const [CurrPage,setCurrPage] = useState(1);
        let DataPerPage = 5;
        let TotalPage = Math.ceil(manager.length/DataPerPage);
        const LastIndex = CurrPage*DataPerPage;
        const FirstIndex = LastIndex-DataPerPage;
        const PageData = manager.slice(FirstIndex,LastIndex);
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
        <BaseApp PageTitle="Manager">
            <div className="EmpReadCont">
                <div className="EmpTableCont">
                    <Table responsive striped bordered hover variant="dark">
                      <thead className="tableHead">
                        <tr>   
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Access</th>
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
                                <td>{emp.Access}</td>
                                {Access=="Granted" && Role == "Admin"  ? <td><Button  className="view-btn" variant="outline-info" onClick={()=>navigate(`/manager/${emp._id}`)}>View</Button></td>:<td><Button  className="view-btn" variant="outline-info" disabled>View</Button></td>}
                                {Access=="Granted" && Role == "Admin"  ? <td><Button className="edit-btn" variant="outline-primary" onClick={()=>navigate(`/manager/update/${emp._id}`)} >Edit</Button></td>:<td><Button className="edit-btn" variant="primary" disabled >Edit</Button></td>}
                                {Access=="Granted" && Role == "Admin"  ? <td><Button className="delete-btn" variant="outline-danger" onClick={()=>{delData(emp.Email)}}>Delete</Button></td>:<td><Button  className="delete-btn" variant="outline-danger" disabled>Delete</Button></td>}
                            </tr>
                        ))}    
                            <tr>
                                {Access=="Granted" && Role == "Admin" ? <td colSpan={8}><Button  onClick={()=>navigate("/manager/Create")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button></td>:<td colSpan={8}><Button  disabled><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button></td>}
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

export default Manager_Read;