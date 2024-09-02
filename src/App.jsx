import { createBrowserRouter as Router,RouterProvider } from 'react-router-dom';
import './App.css';
import './BaseApp/Base.css';
import './Users/Users.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ErrorPage from './Auth/ErrorPage';
import User_Login from './Auth/User_Login';
import Dashboard from './BaseApp/Dashboard';
import Lead_Login from './Auth/Lead_Login';
import User_ForgotPassword from './Auth/User_ForgotPassword';
import Lead_ForgotPassword from './Auth/Lead_ForgotPassword';
import VerifyUser from './Auth/VerifyUser';
import UserVerification from './Auth/UserVerification';
import User_ResetPassword from './Auth/User_ResetPassword';
import Lead_ResetPassword from './Auth/Lead_ResetPassword';
import User_Read from './Users/User_Read';
import UserView from './Users/User_View';
import UserCreate from './Users/User_Create';
import UserEdit from './Users/UserEdit';
import Manager_Read from './Users/Manager_Read';
import ManagerCreate from './Users/Manager_Create';
import ManagerView from './Users/Manager_View';
import ManagerEdit from './Users/Manager_Edit';
import LeadDashboard from './BaseApp/Lead_Dashboard';
import Lead_Read from './Leads/Lead_Read';
import LeadView from './Leads/Lead_View';
import LeadCreate from './Leads/Lead_Create';
import LeadEdit from './Leads/Lead_Edit';
import Contact_Read from './Contacts/Contact_Read';
import ContactCreate from './Contacts/Contact_Create';
import ContactEdit from './Contacts/Contact_Edit';
import ContactView from './Contacts/Contact_View';
import ContactToLead from './Contacts/Contact_to_Lead';
import Service_Read from './Services/Service_Read';
import ServiceCreate from './Services/Service_Create';
import ServiceView from './Services/Service_View';
import ServiceEdit from './Services/Service_Edit';


export const Url = "https://mycrm-d2t8.onrender.com"

//Creating routes
const routes = Router([
  {
    path:"/",
    element:<User_Login/>
  },{
    path:"/Lead/",
    element:<Lead_Login/>
  },{
    path:"/ForgotPassword",
    element:<User_ForgotPassword/>
  },{
    path:"/Lead/ForgotPassword",
    element:<Lead_ForgotPassword/>
  },{
    path:"/ResetPassword/:id/:pin/:token",
    element:<User_ResetPassword/>
  },{
    path:"/Lead/ResetPassword/:id/:pin/:token",
    element:<Lead_ResetPassword/>
  },{
    path:"/verifyUser",
    element:<VerifyUser/>
  },{
    path:"/verifyUser/:id/:pin/:token",
    element:<UserVerification/>
  },{
    path:"/Dashboard",
    element:<Dashboard/>
  },{
    path:"/LeadDashboard",
    element:<LeadDashboard/>
  },{
    path:"/users",
    element:<User_Read/>
  },{
    path:"/users/Create",
    element:<UserCreate/>
  },{
    path:"/users/:id",
    element:<UserView/>
  },{
    path:"/users/update/:id",
    element:<UserEdit/>
  },{
    path:"/manager",
    element:<Manager_Read/>
  },{
    path:"/manager/Create",
    element:<ManagerCreate/>
  },{
    path:"/manager/:id",
    element:<ManagerView/>
  },{
    path:"/manager/update/:id",
    element:<ManagerEdit/>
  },{
    path:"/Lead/LeadData",
    element:<Lead_Read/>
  },{
    path:"/Lead/:id",
    element:<LeadView/>
  },{
    path:"/Lead/create",
    element:<LeadCreate/>
  },{
    path:"/Lead/update/:id",
    element:<LeadEdit/>
  },{
    path:"/Contacts",
    element:<Contact_Read/>
  },{
    path:"/Contacts/create",
    element:<ContactCreate/>
  },{
    path:"/Contacts/update/:id",
    element:<ContactEdit/>
  },{
    path:"/Contacts/:id",
    element:<ContactView/>
  },{
    path:"/Contacts/changeToLead/:id",
    element:<ContactToLead/>
  },{
    path:"/Services/ServiceRequests",
    element:<Service_Read/>
  },{
    path:"/Services/create",
    element:<ServiceCreate/>
  },{
    path:"/Services/update/:id",
    element:<ServiceEdit/>
  },{
    path:"/Services/:id",
    element:<ServiceView/>
  },{
    path:"*",
    element:<ErrorPage/>
  }
])

function App() {
 
  return (
    <>
    <RouterProvider router={routes}/>
    <ToastContainer autoClose={2500}/>
    </>
  )
}

export default App
