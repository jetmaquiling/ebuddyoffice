import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/auth.module.css'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { socket } from '@/config/web-sockets';
import InfoIcon from '@material-ui/icons/Info';
import TextField from '@material-ui/core/TextField'
import config from '@/config/configuration.json'
import axios from 'axios';
import { LinearProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return ca;
}


export default function Auth({setAuth, auth}) {
    const [input, setInput] = React.useState("")



    function checkCookie() {
        let cookie = getCookie("cookie_authorized")
        console.log("cookie",cookie)
        if(cookie == "USER_ACCEPTED"){
            setAuth(true)
            
        }else{
            setAuth(false)
        }
    }



    const login = () => {
        if(input == "20210112"){
            setCookie("cookie_authorized", "USER_ACCEPTED", 1)
            setAuth(true)
        }else{
            setInput("")
        }
        
    }
    
    React.useEffect(() => {
        checkCookie()
    }, [])


  return (
    <div className={styles.main} >
        <div className={styles.container}>
            <img src='/MainLogo/EbuddyLogoBlack.png' className={styles.logo}/>
            <div className={styles.inputBox}>
                <h4 className={styles.label}>CSR PASSCODE</h4>
                <input value={input} onChange={(e)=>{setInput(e.target.value)}} className={styles.input} />
                <h4 className={styles.button} onClick={login}>CONFIRM</h4>
            </div>
        </div>
    </div>
  )
}
