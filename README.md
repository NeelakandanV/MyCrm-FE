# MyCrm - An CRM website

## Login Credentials
### For Admin
**Email - hari0709venkatesan@gmail.com**
**Password - 12345678**

### For Lead
**Email - lead@gmail.com**
**Password - 12345678**

## URL - https://mycrmportal.netlify.app/

## This documentaion provides details about the CRM site with user Authentication with role based validations(Roles - Admin, Manager , Employee and Lead)and Authorization, implemented using vite + React. This APP allows you to manage Create,Read, Manage or Update Data and delete Data based on their roles(Authorizations-Only verified users can modify data).Site functionalities also include Login(Two step Authentication - verify with Email link) , Forgot Password , Reset Password and Delete operations.Admins has access to all data including manager data except creating service requests.Verified Manager has access to modify all data except creating service requests.Verified Employees has access to modify lead,contact and services data.Managers and Employees who are not verified can only able to view data cannot able to modify it.After verifying their email with email verification link their access will be granted.Service Requests can only be created by Leads.


## Features:-
### yup and Formik - For form validations<br/>
### Axios - To manage API calls<br/>
### React Bootstrap and Material Ui - For component stylings.<br/>

### Since I'm deployed the apis in render's free tier, The initial request is taking time, Please wait little longer for initial request.Inconvenience Regretted.

### For Further Details,visit my Backend Source Code repo.

# Backend Source Code -[Github Link](https://github.com/NeelakandanV/MyCrm-BE)
