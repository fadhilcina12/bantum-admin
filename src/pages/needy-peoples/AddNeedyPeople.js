import {useEffect, useState} from "react";
import {Box, Button, FormControl, FormGroup, FormLabel, Input, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function AddNeedyPeople(){

    const [dataNeedyPeople, setDataNeedyPoeple] = useState({
        name: "",
        location: "",
        phone: ""
    })

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleSubmit  = (e) => {
        e.preventDefault();

        axios.post('https://charity-backend.helpulstudio.com/api/needy-people', dataNeedyPeople, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            navigate("/dashboard/needy-people")
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
                <Typography marginBottom={3}>Form Tambah Daftar Penerima</Typography>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <TextField label={"Nama"} variant={"outlined"} required size={"small"} required onChange={(e) => {
                                setDataNeedyPoeple({...dataNeedyPeople, name: e.target.value})
                            }}/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <TextField label={"Lokasi"} variant={"outlined"} required size={"small"} required onChange={(e) => {
                                setDataNeedyPoeple({...dataNeedyPeople, location: e.target.value})
                            }}/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <TextField type={"number"} label={"No Handphone"} variant={"outlined"} required size={"small"} required onChange={(e) => {
                                setDataNeedyPoeple({...dataNeedyPeople, phone: e.target.value})
                            }}/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Button type={"submit"} variant={"contained"}>Input Data Penerima</Button>
                    </FormGroup>
                </form>
            </Box>
        </>
    )
}