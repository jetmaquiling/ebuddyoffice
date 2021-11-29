import React from 'react'
import MainTable from '@/components/maintable/table'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { socket } from '@/config/web-sockets';
import ChatBox from '@/components/chatbox/chatBox'
import Navigation1 from '@/components/navigation/navigation1'
import SiteUpdate from '@/components/siteupdate/siteupdate'
import Content from '@/components/redirect/content'



export default function Admin() {
  const [page, setPage] = React.useState("DASHBOARD");
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

  const activePage = () => {
    switch(page) {
      case "DASHBOARD":
        return <MainTable user={user} setConnection={setConnection} connection={connection} />
        break;
      case "SITE":
        return <SiteUpdate/>
        break;
      case "CONTENT":
        return <Content setMessage={setMessage}/>
        break;
      default:
        return <MainTable user={user} setConnection={setConnection} connection={connection} />
    }
  }


  

  React.useEffect(() => {
    socket.on('data', (data) => {
      setUser([...data.userData]);
      console.log("FROM INDEX DATA",data.userData)
    });
   
  }, [])

  return (
    <div className={styles.main}>
    
        <div className={styles.container}>
          <Navigation1 setPage={setPage} page={page}/>
          {activePage()}

        </div>
        {connection  && <ChatBox connection={connection} setConnection={setConnection} message={message} setMessage={setMessage} />}
        
        
    </div>
  )
}
