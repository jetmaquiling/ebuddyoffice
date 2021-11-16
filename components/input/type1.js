import TextField from '@material-ui/core/TextField'



export default function Type1({ label='Undefined',value="", field='Undefined', type="none", autoComplete="none", dispatch, placeholder }) {

    
    return (
        <div style={{margin: '10px 0px'}}>
                <h5 style={{fontSize: '20px', margin: "0px 10px", fontWeight: '400'}} >{label}</h5>
                <TextField
                    multiline
                    variant="outlined"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=> 
                        dispatch({
                        type:"ONCHANGE",
                        field: field,
                        payload: String(e.target.value)
                    })}
                />
        </div>
    )
}
