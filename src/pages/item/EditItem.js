import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
    Box, Button,
    FormControl,
    FormGroup,
    FormLabel, Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";


export default function EditItem(){
    const [dataItem, setDataItem] = useState({
        type_id: "",
        donator_user: "",
        name: "",
        picture: "",
    })

    const {id} = useParams()
    console.log(id)

    const [type, setType] = useState([])
    const [donatorUser, setDonatorUser] = useState([])

    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type_id', dataItem.type_id)
        formData.append('donator_user', dataItem.donator_user)
        formData.append('name', dataItem.name)
        formData.append('picture', dataItem.picture, dataItem.picture.name)
        formData.append('status', 'undistributed')

        axios.post(`https://charity-backend.helpulstudio.com/api/items/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            navigate("/dashboard/item")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.all([
            axios.get('https://charity-backend.helpulstudio.com/api/types', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            axios.get('https://charity-backend.helpulstudio.com/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            axios.get(`https://charity-backend.helpulstudio.com/api/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ]).then(axios.spread((types, users, item) => {
            setType(types.data.data)
            setDonatorUser(users.data.data)
            setDataItem(item.data.data)
        }))
    }, [])

    return (
        <>
            <Box sx={{
                width: "50%",
                marginX: "auto"
            }}>
                <Typography marginBottom={3}>Form Edit Barang Donasi</Typography>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <InputLabel id={'type-label'}>Tipe Barang</InputLabel>
                            <Select required labelId={'type-label'} value={dataItem.type_id} label={'Tipe Barang'} onChange={(e) => setDataItem({...dataItem, type_id: e.target.value})}>
                                {type ?
                                    type.map(((data) => (
                                        <MenuItem value={data.id}>{data.name}</MenuItem>
                                    ))) : ""
                                }
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <InputLabel id={'type-label'}>Donatur</InputLabel>
                            <Select required labelId={'type-label'} value={dataItem.donator_user} label={'Donatur'} onChange={(e) => setDataItem({...dataItem, donator_user: e.target.value})}>
                                {donatorUser ?
                                    donatorUser.map(((data) => (
                                        <MenuItem value={data.id}>{data.name}</MenuItem>
                                    ))) : ""
                                }
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <TextField type={"text"} label={"Nama Barang"} value={dataItem.name} variant={"outlined"} required onChange={(e) => {
                                setDataItem({...dataItem, name: e.target.value})
                            }}/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <FormLabel>
                                <Typography>Foto</Typography>
                            </FormLabel>
                            <Input type={"file"} onChange={(e) => {
                                setDataItem({...dataItem, picture: e.target.files[0]})
                            }} required/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Button type={"submit"} variant={"contained"}>Input Data Barang</Button>
                    </FormGroup>
                </form>
            </Box>
        </>
    )
}