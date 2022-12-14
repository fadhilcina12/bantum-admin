import {useState} from "react";
import {Box, Button, FormControl, FormGroup, FormLabel, Input, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function AddTypes(){

    const [dataType, setDataType] = useState({
        name: ""
    })

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleSubmit  = (e) => {
        e.preventDefault();

        axios.post('https://charity-backend.helpulstudio.com/api/types', dataType, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            navigate("/dashboard/type")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Box sx={{
                width: "50%",
                marginX: "auto"
            }}>
                <Typography marginBottom={3}>Form Tambah Tipe</Typography>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <TextField label={"nama"} variant={"outlined"} required size={"small"} required onChange={(e) => {
                                setDataType({...dataType, name: e.target.value})
                            }}/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Button type={"submit"} variant={"contained"}>Input Tipe</Button>
                    </FormGroup>
                </form>
            </Box>
        </>
    )
}