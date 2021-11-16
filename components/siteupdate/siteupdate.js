import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/siteupdate.module.css'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import moment from 'moment';
import { socket } from '@/config/web-sockets';
import InfoIcon from '@material-ui/icons/Info';
import TextField from '@material-ui/core/TextField'
import Type1 from '@/components/input/type1'
import Type5 from '@/components/input/type5'
import config from '@/config/configuration.json'
import axios from 'axios';
import { LinearProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';


const initialState = {
    title:"",
    link:"",
    popupImage: null,
    popupImagePreview: null,
    imageId: ''
}


function reducer(state, action) {
    switch (action.type) {
      case 'ONCHANGE':
        return {
            ...state,
            [action.field]: action.payload
        };
      case 'ONINIT':
        return {
          title: action.payload.popup_title,
          link: action.payload.popup_link,
          popupImage: null,
          popupImagePreview: action.payload.popup_image && action.payload.popup_image.url,
          imageId: action.payload.popup_image && action.payload.popup_image.id,
      };
      default:
        return;
    }
  }


export default function SiteUpdate() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [load, setLoad] = React.useState(false)

  React.useEffect(() => {
    onReset()
  }, [])


  const onReset = () => {
    setLoad(true)
    axios.get(`${config.SERVER_URL}/csr`).then(res => {
      console.log(res.data.popup_image.url)
      dispatch({
        type:"ONINIT",
        payload: res.data
      });
      setLoad(false)
    }).catch(error=> {
      console.log(error)
      setLoad(false)
    })
  }


  const onUpdate = ()  => {
    setLoad(true)
    let one = `${config.SERVER_URL}/csr`
    let two = `${config.SERVER_URL}/upload/`
    let three = `${config.SERVER_URL}/upload/files/${state.imageId}`


 
    const formData = new FormData()
    formData.append('files', state.popupImage);
    formData.append('ref','CSR')
    formData.append('refId', 1)
    formData.append('field', 'popup_image')

    const pack = {
      popup_title: state.title,
      popup_link: state.link,
    }

    const requestOne = axios.put(one,pack);
    const requestTwo = state.popupImage ? axios.post(two,formData) : null;
    const requestThree = state.popupImage ? axios.delete(three) : null;

    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      const responesThree = responses[2]
      if(responseOne || responseTwo || responesThree){
        alert("SUCCESS IN UPDATING")
        onReset()
      }
      
    })).catch(errors => {
        alert("Error IN UPDATING")
       console.log(errors)
       onReset()
    })

   
  }

 

  return (
    <div className={styles.main} >

        <div className={styles.titleContainer}>
            <h1 className={styles.title}>EBUDDY SITE UPDATE</h1>
        </div>
        <div className={styles.mainContainer}>
         <div className={styles.popupSection}>
            <div className={styles.descriptionContainer}>
              <h3 className={styles.titleLabel}>PopUp On Start Up</h3>
              <p className={styles.subTitle}>I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. </p>
            </div>

            <div style={{display: (load && "none")}} className={styles.form}>
                <Type1 dispatch={dispatch} label="Title" field="title" value={state.title} placeholder="OPTIONAL"/>
                <Type1 dispatch={dispatch} label="Link" field="link" value={state.link} placeholder="https://globalebuddy.netlify.app/info/join"/>
                <Type5 label="Upload Image Here" type="image" field="popupImage" previewfield="popupImagePreview" dispatch={dispatch} picture={state.popupImage}  preview={state.popupImagePreview}/>
            </div>
            <div style={{display: (load && "none")}} className={styles.buttonContainer}>
              <h3 className={styles.button} onClick={onReset}><RotateLeftIcon/>Reset</h3>
              <h3 className={styles.button} onClick={onUpdate}><SaveIcon/>Save</h3>
            </div>
            <LinearProgress style={{display: (!load && "none")}}/>
         </div>
        
        </div>

        
    </div>
  )
}
