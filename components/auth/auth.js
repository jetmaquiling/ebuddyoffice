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




export default function Auth({setAuth, auth}) {
 
    const login = () => {
        setAuth(true)
    }
 

  return (
    <div className={styles.main} >
        <div className={styles.container}>
            <img src='/Logo/logo.png' className={styles.logo}/>
            <div className={styles.inputBox}>
                <h4 className={styles.label}>CSR PASSCODE</h4>
                <input className={styles.input} />
                <h4 className={styles.button} onClick={login}>CONFIRM</h4>
            </div>
        </div>
    </div>
  )
}
