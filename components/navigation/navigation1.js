import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/navigation.module.css'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WebIcon from '@material-ui/icons/Web';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { ToggleOff } from '@material-ui/icons';
import SubjectIcon from '@material-ui/icons/Subject';


export default function Navigation1({setPage, page}) {
   
    const change = (input) =>{
        setPage(input)
    }
  return (
      <div className={styles.main}>
            <div className={styles.head}>
                <img alt="LOGO" src="/logo/EbuddyLogo.png" className={styles.logo}/>
                <h4 className={styles.title}>CSR OFFICE</h4>
            </div>
            

          <div className={styles.mainContainer}>

              <div className={page == "DASHBOARD" ? styles.buttonActive : styles.button} onClick={()=>{change("DASHBOARD")}}>
                <DashboardIcon style={{color: '#fff'}} />
                <h4 className={styles.buttonText}>Dashboard</h4>
              </div>

              <div className={page == "SERVICE" ? styles.buttonActive : styles.button} onClick={()=>{change("SERVICE")}}>
                <ContactSupportIcon  style={{color: '#fff'}}/>
                <h4 className={styles.buttonText}>Customer Service</h4>
              </div>

              <div className={page == "SITE" ? styles.buttonActive : styles.button} onClick={()=>{change("SITE")}}>
                <WebIcon  style={{color: '#fff'}}/>
                <h4 className={styles.buttonText}>Web Control Panel</h4>
              </div>

              <div className={page == "TASK" ? styles.buttonActive : styles.button} onClick={()=>{change("TASK")}}>
                <AssignmentTurnedInIcon  style={{color: '#fff'}}/>
                <h4 className={styles.buttonText}>Task/Assignment</h4>
              </div>

              <div className={page == "CONTENT" ? styles.buttonActive : styles.button} onClick={()=>{change("CONTENT")}}>
                <SubjectIcon  style={{color: '#fff'}}/>
                <h4 className={styles.buttonText}>Content Link</h4>
              </div>
            
          </div>
         

      </div>
  )
}
