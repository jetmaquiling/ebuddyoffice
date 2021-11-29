import React from 'react'
import MainTable from '@/components/maintable/table'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { socket } from '@/config/web-sockets';
import ChatBox from '@/components/chatbox/chatBox'




export default function Admin({}) {
  const [ user, setUser] = React.useState([]);
  const [ connection, setConnection] = React.useState(null);
  const [message, setMessage] =  React.useState('');

  React.useEffect(() => {
    console.log("STARTING LOG WORK")
    console.log(socket)
    socket.emit('admin', { msg : "TAKE 23!" }, (error) => {
      if(error) {
          setError(error)
          alert(error);
      } else {
       
      }
  }); 
   
  }, [])

  

  React.useEffect(() => {
    socket.on('data', (data) => {
      setUser([...data.userData]);
      console.log("FROM INDEX DATA",data.userData)
    });
   
  }, [])

  return (
    <div className={styles.main}>
        <div className={styles.head}>
          <h2 className={styles.titleLabel}>DASHBOARD CSR</h2>
        </div>
        <div className={styles.container}>
          
          <MainTable user={user} setConnection={setConnection} connection={connection} />
          {connection  && <ChatBox connection={connection} setConnection={setConnection} message={message} setMessage={setMessage} />}
        </div>
        
        
        
    </div>
  )
}
