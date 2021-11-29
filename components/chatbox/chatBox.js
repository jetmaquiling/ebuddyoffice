import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/chatbox.module.css'
import { socket } from '@/config/web-sockets'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import Message from './message'
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
   


  }));

  function scrollToBottom (id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
 }


export default function ChatBox({connection, setConnection, setMessage, message}) {
    const [open, setOpen] = React.useState(true)
    const [messages, setMessages] =  React.useState([]);
    const classes = useStyles();


    const handleChange = (e) => {
      setMessage(e.target.value);
    }

    const handleEnter = (e) => {
     
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage(message)
      }
      
    }

    
    const handleClick = (e) => {
      sendMessage(message);
    }


    const sendMessage = (message) => {
      console.log(message)
      if(message && connection.conversation.id) {
          socket.emit('adminMessage',{ userId: connection.id,conversationId: connection.conversation.id , room: connection.room, message, messages }, (error) => {
              if(error) {
                  alert(error)
                  history.push('/join');
              }
          });
          
          setMessage('')
      } else {
          alert("Message can't be empty")
      }
}


  React.useEffect(() => {
    if(connection){
      socket.emit('getConversation',{connection}, (data) => { 

      });
    }
        
      // if(true) {
      //     setMessages(JSON.parse(connection.conversation.messages))    
      //     socket.on('message', (newmessage, error) => {
      //         setMessages(msgs => [ ...msgs, newmessage ]);
      //     });
      // } 
      
   }, [connection])


   const offConnection = () => {
     if(confirm("Are you sure you want to end chat?")){
      setConnection(false)
      console.log(connection)
     }else{
       return
     }
      
  }

  const toggle =  function() {
    setOpen(!open)
}

   React.useEffect(() => {
      socket.on('deliverAdminMessages', (data) => {
        console.log("Get Delivery from Server" , data)
        try{
          if(typeof data.conversation.messages == "string"){
            setMessages(JSON.parse(data.conversation.messages))
          }else{
              setMessages(data.conversation.messages)
          }
          scrollToBottom("messageBox")
          socket.removeAllListeners("details");
        }catch(err){console.log(err)}
        
      });
    
    }, [])
  

  return (
    <div>
      <div className={open ? styles.main : styles.offmain}>
          <div className={styles.head}>
              <h1 className={styles.title}>You are now connected to customer</h1>
              <div>
                <RemoveIcon  style={{fontSize:'25px', cursor: 'pointer', color: '#000'}} onClick={toggle}/>
                <CloseIcon style={{fontSize:'25px', cursor: 'pointer', color: '#000'}} onClick={offConnection}/>
               
              </div>
              
          </div>

          <div className={styles.messageBox} id="messageBox">
              <Message conversation={messages}/>
          </div>

          <div className={styles.inputBox}>
              <TextField
              multiline
              placeholder="Aa.."
              variant="outlined"
              className={classes.root}
              value={message}
              onKeyPress={handleEnter}
              onChange={handleChange}
              />
              <div className={styles.sendButton} onClick={handleClick} ><SendIcon style={{fontSize:'20px'}} /></div>
          </div>

          <div className={open ? styles.closeFloatButton : styles.floatButton} onClick={toggle}>
            {connection.username}
          </div>

          
      </div>
    </div>
    
  )
}
