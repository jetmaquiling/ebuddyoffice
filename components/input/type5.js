/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Image from 'next/image';
import ReplayIcon from '@material-ui/icons/Replay';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    formItem:{
        alignContent: 'center',
        margin: 'auto auto 20px auto',
        
    },
  }));


export default function Type5({ label='Undefined', field='Undefined',previewfield='none' , type="none", dispatch , picture=null, preview=null }) {
    const classes = useStyles();
    
    return (
        <div className={classes.formItem} style={{textAlign:'center'}}>
            <Card>
                    <Typography variant="h6" style={{textAlign: 'center'}} >{!picture ? label : "Change Picture"}
                    <IconButton >
                        {
                        picture ? 
                        <ReplayIcon style={{fontSize:'25px'}} onClick={()=>{
                            dispatch({
                                type:"ONCHANGE",
                                field:  previewfield,
                                payload: null
                            });
                            dispatch({
                                type:"ONCHANGE",
                                field:  field,
                                payload:  null
                            });
                        }}/> : 
                        <HelpIcon style={{fontSize:'25px'}} />
                        }
                
                    </IconButton>
                    </Typography>

                    {!picture && 
                        <input
                        type="file"
                        multiple={ false }
                        onChange={(e) => {
                            const objectUrl = URL.createObjectURL(e.target.files[0]);
                            dispatch({
                                type:"ONCHANGE",
                                field:  previewfield,
                                payload: objectUrl
                            });
                            dispatch({
                                type:"ONCHANGE",
                                field:  field,
                                payload:  e.target.files[0]
                            });
                            URL.revokeObjectURL(e.target.files[0])
    
            

                            }}
                        />}
                    
            </Card>
            <Card  style={{display: (preview ? 'block' : 'none')}}>  
                <img style={{height: '50%', width: '100%', maxWidth: '300px', padding: '10px'}} src={preview} />
            </Card>
        
            
        </div>
        
    )
}
