import React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import {Button, Modal, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Paper} from '@mui/material';
import { deleteToken, getToken } from '../../Tools/auth-helper';
import { useNavigate  } from "react-router-dom";

import { prefixURLBackend } from '../../Tools/URLs.js';
import './CRUD.css';

export default function CRUD()
{
    const [departments, setDepartments] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);

    const [modalNewDepartment, setModalNewDepartment] = React.useState(false);
    const switchModalNewDepartment = ()=>
    {
        setModalNewDepartment(!modalNewDepartment);
    }
    const [newDepartment, setNewDepartment] = React.useState(
    {
        dName: "",
    });
    const newDepartmentHandleChange= e=>
    {
        const {name,value} = e.target;
        setNewDepartment(prevstate=>(
        {
            ...prevstate,
          [name]: value
        }))
    }

    const [modalNewEmployee, setModalNewEmployee] = React.useState(false);
    const switchModalNewEmployee = ()=>
    {
        setModalNewEmployee(!modalNewEmployee);
    }
    const templateNewEmployee = 
    {
        dName: "",
        nationalNumber: -1,
        fname: "",
        mname: null,
        lname: "",
        adress: null,
        salary: -1,
        sex: "",
        bDate: "",
    };
    const [newEmployee, setNewEmployee] = React.useState(templateNewEmployee);
    const newEmployeeHandleChange= e=>
    {
        const {name,value} = e.target;
        setNewEmployee(prevstate=>(
        {
            ...prevstate,
          [name]: value
        }))
    }
    const openModalEditEmployee = (data)=>
    {
        setNewEmployee(data);
        newEmployee.id = data.id
        setModalNewEmployee(!modalNewEmployee);
    }

    const navigate = useNavigate();
    const logoutAndGoMain = ()=>
    {
        deleteToken();
        navigate("/", { replace: true })
    }

    React.useEffect(()=>
    {
        loadAllAPIData();
    }, []);

    const loadAllAPIData = async()=>
    {
        try
        {
            await loadDepartments();
            await loadEmployees();
        }
        catch(err)
        {
            alert("Database connection error...");
            logoutAndGoMain();
        }
    }

    const APIheaders = {
        'Content-Type': "application/json",
        'Authorization': getToken()
    };

    const loadDepartments=async()=>
    {
        const URLToFetch = prefixURLBackend + "Department";

        await fetch(URLToFetch,
        {
            method: "GET",
            headers: APIheaders
        }).then(async(response)=>
        { 
            await response.text().then(data=>
            {
                if(response.status == 401)
                    logoutAndGoMain();
                else if(response.status != 200)
                    alert(data);
                else
                {
                    const json=JSON.parse(data);
                    setDepartments(json);
                }
            })
        })
    };

    const loadEmployees = async() =>
    {
        const URLToFetch = prefixURLBackend + "Employee";

        await fetch(URLToFetch,
        {
            method: "GET",
            headers: APIheaders
        }).then(async(response)=>
        { 
            await response.text().then(data=>
            {
                if(response.status == 401)
                    logoutAndGoMain();
                else if(response.status != 200 )
                    alert(data);
                else
                {
                    const json=JSON.parse(data);
                    setEmployees(json);
                }
            })
        });
    }

    const deleteDepartment=async(dName)=>
    {
        const URLToFetch = prefixURLBackend + "Department/" + dName;

        await fetch((URLToFetch),
        {
            method: "DELETE",
            headers: APIheaders
        }).then(async(response)=>{await response.text().then((result)=>
        {
            if(response.status == 401)
                    logoutAndGoMain();
            else if(response.status != 200 )
                alert(result);
            else
                loadAllAPIData();
        })});      
    };

    const postDepartment=async()=>
    {
        const URLToFetch = prefixURLBackend + "Department/";

        await fetch((URLToFetch),
        {
            method: "POST",
            headers: APIheaders,
            body: JSON.stringify(newDepartment),
        }).then(async(response)=>{await response.text().then((result)=>
        {
            if(response.status == 401)
                logoutAndGoMain();
            else if(response.status != 200)
                alert(result);
            else
            {
                loadAllAPIData();
                switchModalNewDepartment();
            }
        })});      
    };

    const deleteEmployee=async(id)=>
    {
        const URLToFetch = prefixURLBackend + "Employee/" + id.toString();

        await fetch((URLToFetch),
        {
            method: "DELETE",
            headers: APIheaders,
        }).then(async(response)=>{await response.text().then((result)=>
        {
            if(response.status == 401)
                logoutAndGoMain();
            else if(response.status != 200)
                alert(result);
            else
                loadAllAPIData();
        })});      
    };

    const postOrPutEmployee=async()=>
    {
        const URLToFetch = prefixURLBackend + "Employee/";

        await fetch((URLToFetch),
        {
            method: newEmployee.hasOwnProperty("id") ? "PUT" : "POST",
            headers: APIheaders,
            body: JSON.stringify(newEmployee),
        }).then(async(response)=>{await response.text().then((result)=>
        {
            if(response.status == 401)
                logoutAndGoMain();
            else if(response.status != 200)
                alert(result);
            else
            {
                loadAllAPIData();
                switchModalNewEmployee();
            }
        })});      
    };

    const modalFormStyle = 
    {
        position: 'absolute',
        width: "40%",
        border: '4px #000',
        backgroundColor: "white",
        padding: "30px",
        top: "50%",
        left: '50%',
        transform: 'translate(-50%,-50%)'
    };

    const bodyModalNewDepartment =(
        <div style={modalFormStyle}>
            <h3>New Department</h3>
            <form action='#' onSubmit={(event)=>{postDepartment(); event.preventDefault();}} >
                <TextField name="dName" label="Name" onChange={newDepartmentHandleChange} 
                    variant="standard" fullWidth inputProps={{ minLength: 2, maxLength: 120}} required/>
                <br /><br />
                <div align="right">
                    <Button type='submit' color="primary">Insert</Button>
                    <Button onClick={switchModalNewDepartment}> Cancel</Button>
                </div>
            </form>
        </div>
    )

    const deleteButtonStyle = 
    {
        backgroundColor: "#e8605d",
        width:"100%",
        padding: "3px 35px",
    };

    const newButtonStyle = 
    {
        backgroundColor: "#0c7d06",
        width:"2%",
        height: "27px",
        padding: "3px 35px",
        marginTop:"10px",
    };

    const editButtonStyle = 
    {
        backgroundColor: "#ffcc00",
        width:"48%",
        marginRight: "4%",
        padding: "3px 35px"
    };
    
    const paperStyle=
    {
        padding: "30px", 
        height: 600,
        margin: "0px auto"
    };

    const crudDataGridStyle = 
    {
        height: 420,
        width: '100%',  
        marginBottom:"40px",
    };

    const crudDataGridPageSize = 5;

    const departmentsSection = ()=>
    {
        return(
            <Grid>
                <Paper elevation={12} style={paperStyle}>
                    <h1 className='crudTitle'> Departments</h1>
                    <DataGrid style={crudDataGridStyle} components={{ Toolbar: GridToolbar }}
                        columns={
                        [
                            {field:"dName", headerName:"Name", hideable:false, flex:1},
                            {field: "action", headerName:"Action", sortable:false, hideable:false, filterable:false, flex:0.3,
                                renderCell: (department) => 
                                (
                                    <>
                                        <Button style={deleteButtonStyle} onClick={() => deleteDepartment(department.id)}
                                            variant="contained" type="submit">
                                            Delete
                                        </Button>
                                    </>
                                )
                            }
                        ]}
                        getRowId={(row) => row.dName} rows={departments} pageSize={crudDataGridPageSize} />

                    <Button
                        style={newButtonStyle} onClick={switchModalNewDepartment} variant="contained" type="submit">
                        NEW
                    </Button>

                <Modal open={modalNewDepartment} onClose={switchModalNewDepartment}>
                    {bodyModalNewDepartment}
                </Modal>
                </Paper>
            </Grid>
        );
    }

    const bodyModalNewEmployee =(
        <div style={modalFormStyle}>
            <h3>New Employee</h3>
            <form action='#' onSubmit={(event)=>{postOrPutEmployee(); event.preventDefault();}} >
                <Grid container spacing={2}>
                    <Grid container item xs={6} direction="column" >
                        <FormControl variant='filled'>
                            <InputLabel htmlFor="department">Department</InputLabel>
                            <Select name ="dName" defaultValue={newEmployee.dName != '' ? newEmployee.dName : null}
                                onChange={newEmployeeHandleChange} required>
                                {
                                    departments.map((department) => 
                                    (
                                        <MenuItem key={department.dName} value={department.dName}>
                                            {department.dName}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <br />

                        <TextField name="fname" onChange={(e)=>newEmployeeHandleChange(e)} 
                            defaultValue={ newEmployee.fname != ""  ? newEmployee.fname : null}
                            label="First Name" type='text' variant="outlined" 
                            inputProps={{ minLength: 3, maxLength: 50}} required/>
                        <br />

                        <TextField name="mname" onChange={(e)=>newEmployeeHandleChange(e)} 
                            defaultValue={ newEmployee.mname != ""  ? newEmployee.mname : null}
                            label="Middle Name" type='text' variant="outlined" 
                            inputProps={{ maxLength: 50}}/>
                        <br />

                        <TextField name="lname" onChange={(e)=>newEmployeeHandleChange(e)} 
                            defaultValue={ newEmployee.lname != ""  ? newEmployee.lname : null}
                            label="Last Name" type='text' variant="outlined" 
                            inputProps={{ minLength: 3, maxLength: 50}} required/>
                        <br />

                        <TextField  name="bDate" onChange={(e)=>newEmployeeHandleChange(e)} 
                            defaultValue={ newEmployee.bDate != ''  ? newEmployee.bDate.substring(0,10) : null} 
                            label="Birthdate" type="date" 
                            InputLabelProps={{ shrink: true,}} inputProps={{ min: "1930-01-01"}} required/>
                    </Grid>

                    <Grid container item xs={6} direction="column">
                        <TextField name="nationalNumber" onChange={(e)=>newEmployeeHandleChange(e)} 
                            defaultValue={ newEmployee.nationalNumber >0  ? newEmployee.nationalNumber : null}
                            label="National Number" type='number' variant="outlined" 
                            inputProps={{ min: 0}} required/>
                        <br />

                        <TextField name="salary" onChange={(e)=>newEmployeeHandleChange(e)} 
                            defaultValue={ newEmployee.salary >-1  ? newEmployee.salary : null}
                            label="Salary" type='number' variant="outlined" inputProps={{ min: 0}} required/>
                        <br />

                        <TextField name="adress" onChange={(e)=>newEmployeeHandleChange(e)} 
                            defaultValue={ newEmployee.adress != ""  ? newEmployee.adress : null}
                            label="Address" type='text' variant="outlined" />
                        <br />
                        
                        <FormControl variant='filled'>
                            <InputLabel>Sex</InputLabel>
                            <Select name ="sex" labelId='sex' label="Sex" onChange={(e)=>newEmployeeHandleChange(e)}
                                defaultValue={ newEmployee.sex != ''  ? newEmployee.sex : null} required>
                                    <MenuItem value={'F'}> Female </MenuItem>
                                    <MenuItem value={'M'}> Male </MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>    
            
            <br /><br />
            <div align="right">
                <Button type='submit' color="primary">Insert</Button>
                <Button onClick={switchModalNewEmployee}> Cancel</Button>
            </div>
            </form>
        </div>
    )

    const employeesTable = ()=>
    {
        return(
            <Grid>
                <Paper elevation={12} style={paperStyle}>
                    <h1 className='crudTitle'> Employees</h1>
                    <DataGrid style={crudDataGridStyle} components={{ Toolbar: GridToolbar }}
                        columns={
                        [
                            {field:"id", headerName:"ID", hideable:false, flex:0.6},
                            {field:"dName", headerName:"Department", flex:1},
                            {field:"nationalNumber", headerName:"NIN", flex:0.7},
                            {field:"fname", headerName:"First Name", flex:1},
                            {field:"mname", headerName:"Middle Name", flex:1},
                            {field:"lname", headerName:"Last Name", flex:1},
                            {field:"adress", headerName:"Address", flex:0.7},
                            {field:"salary", headerName:"Salary", flex:0.6},
                            {field:"sex", headerName:"Sex", flex:0.3},
                            {field:"bDate", headerName:"Birthdate", flex:0.7},
                            {field: "action", headerName:"Action", sortable:false, hideable:false, filterable:false, flex:1,
                                renderCell: (employee) => 
                                (<>
                                        <Button style={editButtonStyle} onClick={()=>openModalEditEmployee(employee.row)}
                                            variant="contained" type="submit">
                                            Edit
                                        </Button>

                                        <Button style={deleteButtonStyle} onClick={() => deleteEmployee(employee.id)}
                                            variant="contained" type="submit">
                                            Delete
                                        </Button>
                                </>)
                            }
                        ]}
                        getRowId={(row) => row.id}
                        rows={employees}
                        pageSize={crudDataGridPageSize}
                    />

                    <Button style={newButtonStyle} onClick={()=>{setNewEmployee(templateNewEmployee); switchModalNewEmployee();}}
                        variant="contained" type="submit">
                        NEW
                    </Button>

                    <Modal
                        open={modalNewEmployee}
                        onClose={switchModalNewEmployee}>

                        {bodyModalNewEmployee}
                    </Modal>
                </Paper>
            </Grid>
        );
    }

    return(
       <div>
            <ul className='navigationBar'>
                <li>
                    <a href="" onClick={()=>logoutAndGoMain()}>Logout</a>
                </li>
            </ul>
            
            <div className='crudContentDiv'>
                <br/><br/>
                {departmentsSection()}
                <br/><br/><br/>
                {employeesTable()}
                <br/><br/>
            </div>
       </div>
    );
}