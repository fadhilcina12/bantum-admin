import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";




export default function NeedyPeoplesPages(){

    const [dataNeedyPeople, setDataNeedyPeople] = useState([])

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Nama', width: 300 },
        { field: 'location', headerName: 'Lokasi', width: 300 },
        { field: 'phone', headerName: 'No Handphone', width: 200 },
        {
            field: 'action',
            headerName: 'Aksi',
            renderCell: (params) => {

                const handleEdit = (e) => {
                    e.preventDefault();

                    const api = params.api
                    const thisRow = {}

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => {(thisRow[c.field] = params.getValue(params.id, c.field))},
                        );

                    navigate(`/dashboard/edit-needy-people/${thisRow.id}`)
                }

                const handleDelete = (e) => {
                    e.preventDefault();

                    const api = params.api
                    const thisRow = {}

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => {(thisRow[c.field] = params.getValue(params.id, c.field))},
                        );

                    axios.delete(`https://charity-backend.helpulstudio.com/api/needy-people/${thisRow.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        console.log(response)
                        setDataNeedyPeople(dataNeedyPeople.filter((data, index) => data.id !== thisRow.id))
                    })
                }


                return <Box sx={{
                    flexDirection: 'row',
                    display: 'flex'
                }}>
                    <IconButton onClick={handleEdit}>
                        <Edit/>
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <Delete/>
                    </IconButton>
                </Box>;
            }
        }
    ];





    useEffect(() => {
        if(!token){
            navigate("/login")
        }

        axios.get('https://charity-backend.helpulstudio.com/api/needy-people', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            setDataNeedyPeople(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <div style={{ height: 600, width: '75%', marginLeft: "auto", marginRight: "auto" }}>
                <Box sx={{
                    marginBottom: 3,
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Typography marginY={"auto"}>Data Daftar Penerima</Typography>
                    <Link to={"/dashboard/add-needy-people"} style={{textDecoration: "none"}}>
                        <Button variant={"contained"}>Tambah Daftar Penerima</Button>
                    </Link>
                </Box>
                {dataNeedyPeople ?
                    <DataGrid
                        rows={dataNeedyPeople}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                        components={{Toolbar: GridToolbar}}
                    /> : ""}
            </div>
        </>
    )
}