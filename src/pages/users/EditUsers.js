import {Box, Button, FormControl, FormGroup, FormLabel, Input, TextField, Typography} from "@mui/material";
import FileUpload from "react-material-file-upload";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


export default function EditUsers(){

    const {id} = useParams();

    const [dataUser, setDataUser] = useState()

    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(dataUser.profile_pict[0])

        const formData = new FormData();
        formData.append('name', dataUser.name)
        formData.append('email', dataUser.email)
        formData.append('password', dataUser.password)
        formData.append('profile_pict', dataUser.profile_pict, dataUser.profile_pict.name)
        formData.append('phone', dataUser.phone)
        formData.append('status', "admin")
        formData.append('address', dataUser.address)

        axios.post(`https://charity-backend.helpulstudio.com/api/users/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            navigate("/dashboard/user")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get(`https://charity-backend.helpulstudio.com/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setDataUser(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <Box sx={{
                width: "50%",
                marginX: "auto"
            }}>
                <Typography marginBottom={3}>Form Edit User</Typography>
                {dataUser ?
                    <form onSubmit={handleSubmit}>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField label={"nama"} variant={"outlined"} required value={dataUser.name} size={"small"} required onChange={(e) => {
                                    setDataUser({...dataUser, name: e.target.value})
                                    console.log(dataUser.name)
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField label={"email"} variant={"outlined"} required value={dataUser.email} size={"small"} required onChange={(e) => {
                                    setDataUser({...dataUser, email: e.target.value})
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField type={"password"} label={"password"} variant={"outlined"} value={dataUser.password} required size={"small"} onChange={(e) => {
                                    setDataUser({...dataUser, password: e.target.value})
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField label={"handphone"} variant={"outlined"} required value={dataUser.phone} size={"small"} onChange={(e) => {
                                    setDataUser({...dataUser, phone: e.target.value})
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <TextField label={"alamat"} variant={"outlined"} required value={dataUser.address} size={"small"} onChange={(e) => {
                                    setDataUser({...dataUser, address: e.target.value})
                                }}/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{marginBottom: 2}}>
                            <FormControl>
                                <FormLabel>
                                    <Typography>Foto</Typography>
                                </FormLabel>
                                <Input type={"file"} onChange={(e) => {
                                    setDataUser({...dataUser, profile_pict: e.target.files[0]})
                                }} required/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Button type={"submit"} variant={"contained"}>Input User</Button>
                        </FormGroup>
                    </form>
                    : ""
                }
            </Box>
        </>
    )
}