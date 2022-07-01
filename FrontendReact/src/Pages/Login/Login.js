import React from 'react';
import { getToken, setToken } from '../../Tools/auth-helper';
import { useNavigate  } from "react-router-dom";
import {Paper, Grid, Avatar, TextField, Button} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import { prefixURLBackend } from '../../Tools/URLs.js';
import "./Login.css"

export default function Admin()
{
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = React.useState(false);

    React.useEffect(()=>
    {
        if(getToken() != null)
            navigate("/admin", { replace: true })
    }, []);

    const submit=async(e)=>
    {
        e.preventDefault();
        setDisableButton(true);

        const data = {
            "username": document.getElementById("Username").value,
            "passwrd": document.getElementById("Password").value,
        };

        const URLToFetch = prefixURLBackend + "User/authenticate";
        await fetch((URLToFetch),
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        }).then(async(response)=> await response.text().then(token=>
        {
            if(response.status == 401) alert("User does not exist...");
            else if(response.status == 200)
            {   
                setToken("Bearer "+token);
                navigate("/admin", { replace: true });
            }
        })).catch(e => alert('Database connection error...'));
        
        setDisableButton(false);
    }

    const paperStyle=
    {
        padding: "30px", 
        height: "380px", 
        width: "25%", 
        margin: "100px auto"
    };
    const avatarStyle=
    {
        backgroundColor: "#1bbd7e"
    };
    const usernameTexFieldStyle = 
    {
        marginBottom: "10px"
    };
    const passwordTexFieldStyle = 
    {
        marginBottom: "35px"
    };

    return(
        <div className="mainDiv">
        <Grid>
            <Paper elevation={12} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockIcon/>
                    </Avatar>
                    <h2>Login</h2>
                </Grid>

                <form onSubmit={(e)=>submit(e)}>
                    <TextField id='Username' label='Username' placeholder="Enter username" variant="standard" 
                        style={usernameTexFieldStyle} fullWidth required/>
                    <TextField id="Password" label="Password" placeholder="Enter password" type="password" 
                        variant="standard" style={passwordTexFieldStyle} fullWidth required/>

                    <Button type='submit' color='primary' variant="contained" disabled={disableButton} fullWidth>
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Grid>
        </div>
    );
}