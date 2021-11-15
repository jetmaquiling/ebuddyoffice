import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/table.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import moment from 'moment';
import { socket } from '@/config/web-sockets';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  label:{
    fontSize: "15px",
    fontWeight: 600
  },
  deleteIcon:{
    fontSize:'25px',
    cursor: 'pointer'
  },
  openIcon:{
    fontSize:'25px',
    cursor: 'pointer'
  }
});

function createData(status,number,clientId, date, service, roomId, data) {
  return {status,number,clientId, date, service, roomId , data};
}

function statusProcess(status){
  switch(status) {
    case "ONLINE":
      return "#008000"
      break;
    case "OFFLINE":
      return "#DC143C"
      break;
    case "PROCESSING":
      return "#FFA500"
      break;
    default:
      return "#DC143C"
      break;
  }
}





export default function MainTable({user, setConnection, connection}) {
  const [ data, setData] = React.useState([]);
  const [connect, setConnect] = React.useState();
  const classes = useStyles();


  function openConnection(id,data){

    setConnect(id)
    if(window.confirm("START CONNECTION")){
      setConnection(data)
    }else{
      return
    }
  }


  function deleteUser(username){

    if(window.confirm(`Are you sure you want to delete ${username} permanently?`)){
      if(connect === username){
        setConnection(null)
      }
      socket.emit('deleteUser',{username: username});
      
    }
  }


  React.useEffect(() => {
    setData([])
    user.map((d,i) => {
      setData(former => [...former, createData(statusProcess(d.status), i+1, d.username, moment(d.created_at).fromNow() , d.service, d.room, d) ]);
    })

    
  }, [user,connect])

  return (
    <div className={styles.main}>

        <div className={styles.titleContainer}>
            <h1 className={styles.title}>CUSTOMER SERVICE COMMUNICATION</h1>
            <h4 className={styles.label}><FiberManualRecordIcon style={{ color: "#008000", margin: '0px 5px' }}/> Online User - The device of a person is connected to the network and is waiting for an customer service representative.</h4>
            <h4 className={styles.label}><FiberManualRecordIcon style={{ color: "#DC143C", margin: '0px 5px' }}/> Offline User - The device of a person is disconnected to the network and exited the website, usually leaves a message in the chat box.</h4>
            <h4 className={styles.label}><FiberManualRecordIcon style={{ color: "#FFA500", margin: '0px 5px' }}/> Processing User - A customer service representative is currently attending/processing to the user concern. </h4>
            <h4 className={styles.label}><OpenInNewIcon style={{ color: "#000", margin: '0px 5px'}}/> Process User - By clicking the button, you will be redirected to the client chat box and can now attend to the client concerns.</h4>
            <h4 className={styles.label}><DeleteIcon style={{ color: "#000", margin: '0px 5px'}}/> Delete User - By clicking the button, the client request will be deleted.</h4>
            <h4 className={styles.label}><InfoIcon style={{ color: "#000", margin: '0px 5px'}}/> Keep the conversation positive! Listen, listen, listen! Be patient! Acknowledge the customer’s issue!</h4>
            
        </div>
        <div className={styles.mainContainer}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.label} align="center">No.</TableCell>
                  <TableCell className={classes.label} align="center">Open</TableCell>
                  <TableCell className={classes.label} align="center">Status</TableCell>
                  <TableCell className={classes.label} align="center">Client ID</TableCell>
                  <TableCell className={classes.label} align="center">Time</TableCell>
                  <TableCell className={classes.label} align="center">Concern</TableCell>
                  <TableCell className={classes.label} align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.clientId} style={{ backgroundColor: (row.number % 2 == 0 &&  '#fbeee4') }}>
                    <TableCell align="center" >{row.number}</TableCell>
                    <TableCell align="center"><OpenInNewIcon className={classes.openIcon} onClick={()=> openConnection(row.clientId,row.data)} /></TableCell>
                    <TableCell align="center" ><FiberManualRecordIcon style={{ color: row.status }}/></TableCell>
                    
                    <TableCell align="center" >{row.clientId}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.service}</TableCell>
                  
                    <TableCell align="center"><DeleteIcon className={classes.deleteIcon} onClick={()=> deleteUser(row.clientId)}/></TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
        </div>

        
    </div>
  )
}
