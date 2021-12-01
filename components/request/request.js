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
import LinearProgress from '@material-ui/core/LinearProgress';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import moment from 'moment';
import config from '@/config/configuration.json'
import axios from 'axios';
import { useRouter } from 'next/router'
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';


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

function createData(id, status, user_id, concern , created_at,data) {
  return {id, status, user_id, concern , created_at,data};
}


function createSite(id, URL, title , description) {
  return {id, URL, title , description};
}

const important_sites = [ 
  {URL : "https://www.youtube.com/channel/UCrCcVsRGOcJUt9P-gaF_v0w", title: 'Global Ebuddy Youtube Channel', description: 'All Live Videos, Testimonies, and Tutorials'},
  {URL : "https://www.facebook.com/groups/1343424559352164", title: 'Global eBuddy COMMUNITY', description: 'Group for updates throughout the Community.'},
  {URL : "https://www.facebook.com/globalebuddy", title: 'Official Facebook Page', description: 'This is our Official Facebook Page.'},
  {URL : "https://www.facebook.com/eBuddyph", title: 'ebuddy.ph Official Page', description: 'ebuddy ecommerce facebook page'},
  {URL : "https://beta.phb2020.com/", title: 'User Dashboard', description: 'User Dashboard'},
]


export default function Request({setMessage}) {
  const [site, setSite] = React.useState([]) 
  const [ data, setData] = React.useState([]);
  const [connect, setConnect] = React.useState();
  const [page, setPage] = React.useState(1)
  const [load, setLoad] = React.useState(false)
  const classes = useStyles();
  const router = useRouter()


  React.useEffect(() => {

    async function getBlog() { 
        try{
            setLoad(true)
            const newdata = await axios.get(`${config.SERVER_URL}/form-requests?_start=${page === 1 ? page -1 : (page -1)*8}&_limit=10`);
            console.log("nEw Data",newdata.data);
            newdata.data.map((d,i) => {
              setData(former => [...former, createData(d.id, d.status, d.user_id, d.concern, moment(d.created_at).fromNow(), d) ]);
            })
            setLoad(false)
        }catch(err){
            console.log("second request",err)
        }
    }
    setSite([])
    setData([])
    important_sites.map((d,i) => {
      setSite(former => [...former, createSite(i , d.URL, d.title, d.description) ]);
    })
    getBlog()
    

  }, [page])


  const dropdownComponent = (status) => {
      return (
        <div className={styles.dropdown}>
            <select id="Status" name="Status"  value={status}>
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="ACCOMPLISHED">ACCOMPLISHED</option>
            </select>
        </div>
      )
      
        
       
      
  }

  

  return (
    <div className={styles.main}>

         
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>REQUEST FORMS</h1>       
        </div>
        
          <div className={styles.mainContainer}>
          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.label} align="center">Status</TableCell>
                  <TableCell className={classes.label} align="center">Open</TableCell>
                  <TableCell className={classes.label} align="center">User_ID</TableCell>
                  <TableCell className={classes.label} align="left">Concern</TableCell>
                  <TableCell className={classes.label} align="center">Created At</TableCell>
                  <TableCell className={classes.label} align="center">Delete</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {!load && 
                  data.map((row) => (
                  <TableRow key={row.clientId} style={{ backgroundColor: (row.number % 2 == 0 &&  '#fbeee4') }}>
                    <TableCell align="center" >{dropdownComponent(row.status)}</TableCell>
                    <TableCell align="center"><OpenInNewIcon className={classes.openIcon} onClick={()=> window.open(`https://globalebuddy.com/info/article/${row.id}`, '_blank')}/></TableCell>
                    <TableCell align="center">{row.user_id}</TableCell>
                    <TableCell align="left" >{row.concern}</TableCell>
                    <TableCell align="center">{row.created_at}</TableCell>
                    <TableCell align="center"><DeleteIcon className={classes.deleteIcon} onClick={()=> deleteUser(row.clientId)}/></TableCell>
                  </TableRow>
                  ))
                 }
                 
              </TableBody>
              
            </Table>
          </TableContainer>
          <div className={styles.buttonContainer}>
            {page == 1 ? <h4></h4>  : <h5 onClick={()=>{setPage(page-1)}} className={styles.button} >back</h5>}
            {data.length < 8 ? <h4></h4>  :<h5 onClick={()=>{setPage(page+1)}} className={styles.button} >next</h5>}
          </div>
         
          {load && <LinearProgress />}
          
        </div>
       
       

        
    </div>
  )
}
