import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Type2 from '../input/type2';
import InfoIcon from '@material-ui/icons/Info';
import TextField from '@material-ui/core/TextField'
import Type1 from '@/components/input/type1'
import Type5 from '@/components/input/type5'
import styles from '@/styles/siteupdate.module.css'
import config from '@/config/configuration.json'
import axios from 'axios';




export default function CSR({state, dispatch, load, onReset, onUpdate}) {
  


  return <div className={styles.popupSection}>
      <div className={styles.csrdescriptionContainer}>
          <Type2 dispatch={dispatch} label="Activate CSR" field="onlineCSR" value={state.onlineCSR} placeholder="OPTIONAL" />
          <h3 className={styles.titleLabel}>CSR COMMUNICATION</h3>
          <p className={styles.subTitle}>On start-up everytime a user visits after 5 seconds this pop up will appear. Add link in order to redirect the users when they get interested.</p>
      </div>
      <div  className={styles.buttonContainer}>
          <h3 className={styles.csrButton} onClick={onReset}><RotateLeftIcon />Reset</h3>
          <h3 className={styles.csrButton} onClick={onUpdate}><SaveIcon />Save</h3>
      </div>
  </div>;
}