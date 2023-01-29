import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Input,
    InputLabel,
    MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";


export default function AddFund(){
    const [dataDonation, setDataDonation] = useState({
        needy_people: "",
        donator_user: "",
        item_id: "",
    })

    const [needyPeople, setNeedyPeople] = useState([])
    const [donatorUser, setDonatorUser] = useState([])
    const [item, setItem] = useState([])

    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('needy_people', dataDonation.needy_people)
        formData.append('donator', dataDonation.donator_user)
        formData.append('item_id', dataDonation.item_id)
        formData.append('status', 'distributed')

        axios.post('https://charity-backend.helpulstudio.com/api/donations', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            navigate("/dashboard/fund")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.all([
            axios.get('https://charity-backend.helpulstudio.com/api/needy-people', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            axios.get('https://charity-backend.helpulstudio.com/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            axios.get('https://charity-backend.helpulstudio.com/api/items', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ]).then(axios.spread((needyPeoples, users, items) => {
            setNeedyPeople(needyPeoples.data.data)
            setDonatorUser(users.data.data)
            setItem(items.data.data.filter((data, index) => data.status !== "distributed"))
        }))
    }, [])

    return (
        <>
            <Box sx={{
                width: "50%",
                marginX: "auto"
            }}>
                <Typography marginBottom={3}>Form Tambah Barang Donasi</Typography>
                <form onSubmit={handleSubmit}>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <InputLabel id={'type-label'}>Penerima</InputLabel>
                            <Select required labelId={'type-label'} label={'Penerima'} onChange={(e) => setDataDonation({...dataDonation, needy_people: e.target.value})}>
                                {needyPeople ?
                                    needyPeople.map(((data) => (
                                        <MenuItem value={data.id}>{data.name}</MenuItem>
                                    ))) : ""
                                }
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <FormGroup sx={{marginBottom: 2}}>
                        <FormControl>
                            <InputLabel id={'type-label'}>Donatur</InputLabel>
                            <Select required labelId={'type-label'} label={'Donatur'} onChange={(e) => setDataDonation({...dataDonation, donator_user: e.target.value})}>
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
                            <InputLabel id={'type-label'}>Barang Donasi</InputLabel>
                            <Select required labelId={'type-label'} label={'Barang Donasi'} onChange={(e) => setDataDonation({...dataDonation, item_id: e.target.value})}>
                                {item ?
                                    item.map(((data) => (
                                        <MenuItem value={data.id}>{data.name}</MenuItem>
                                    ))) : ""
                                }
                            </Select>
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