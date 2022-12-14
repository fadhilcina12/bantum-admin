import {useEffect, useState} from "react";
import {Box, Button, FormControl, FormGroup, FormLabel, Input, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


export default function EditNeedyPeople(){

    const {id} = useParams()

    const [dataNeedyPeople, setDataNeedyPoeple] = useState({
        name: "",
        location: "",
        phone: ""
    })

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleSubmit  = (e) => {
        e.preventDefault();

        axios.put(`https://charity-backend.helpulstudio.com/api/needy-people/${id}`, dataNeedyPeople, {
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

    useEffect(() => {
        axios.get(`https://charity-backend.helpulstudio.com/api/needy-people/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data.data)
            setDataNeedyPoeple(response.data.data)
        }).catch((error)=> {
            console.log(error)
        })
    }, [])

    return (
        <>
            <Box sx={{
                width: "50%",
                marginX: "auto"
            }}>
                <Typography marginBottom={3}>Form Edit Daftar Penerima</Typography>
                {dataNeedyPeople ?
                    <form onSubmit={handleSubmit}>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField label={"nama"} value={dataNeedyPeople.name} variant={"outlined"} required size={"small"} required onChange={(e) => {
                                    setDataNeedyPoeple({...dataNeedyPeople, name: e.target.value})
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField label={"Lokasi"} value={dataNeedyPeople.location} variant={"outlined"} required size={"small"} required onChange={(e) => {
                                    setDataNeedyPoeple({...dataNeedyPeople, location: e.target.value})
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField type={"number"} value={dataNeedyPeople.phone} label={"No Handphone"} variant={"outlined"} required size={"small"} required onChange={(e) => {
                                    setDataNeedyPoeple({...dataNeedyPeople, phone: e.target.value})
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Button type={"submit"} variant={"contained"}>Edit Data Penerima</Button>
                        </FormGroup>
                    </form> : ""
                }
            </Box>
        </>
    )
}