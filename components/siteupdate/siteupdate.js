import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/siteupdate.module.css'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { socket } from '@/config/web-sockets';
import { LinearProgress } from '@material-ui/core';
import config from '@/config/configuration.json'
import axios from 'axios';
import Popup from './popup';
import CSR from './csr';



const initialState = {
    title:"",
    link:"",
    popupImage: null,
    popupImagePreview: null,
    imageId: '',
    openPopup: true,
    onlineCSR: true
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
          openPopup: action.payload.is_popup_open,
          onlineCSR: action.payload.is_csr_online
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
          is_popup_open: state.openPopup,
          is_csr_online: state.onlineCSR
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
            <h1 className={styles.title}>Web Control Panel</h1>
        </div>
        <div style={{ display: (load && "none") }} className={styles.mainContainer}>
            <Popup state={state} dispatch={dispatch} load={load} onReset={onReset} onUpdate={onUpdate}/>
            <CSR state={state} dispatch={dispatch} load={load} onReset={onReset} onUpdate={onUpdate}/>
        </div>
        <LinearProgress style={{ display: (!load && "none") }} />
        
    </div>
  )

    
}
