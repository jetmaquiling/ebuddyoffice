import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch';


export default function Type2({ label='Undefined',value="", field='Undefined', type="none", autoComplete="none", dispatch, placeholder }) {

    
    return (
        <div style={{margin: '0px 0px', display: "flex", alignItems: "center", justifyContent: 'end'}}>
                 <h5 style={{fontSize: '20px', margin: "0px 0px", fontWeight: '400' , color: '#fff'}} >{value ? "Online" : "Offline"}</h5>
                <Switch
                    checked={value}
                    name="Activate Popup"
                    onChange={(e)=> 
                        dispatch({
                        type:"ONCHANGE",
                        field: field,
                        payload: !value
                    })}
                />
               
        </div>
    )
}
