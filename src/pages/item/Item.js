import {useEffect, useState} from "react";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";

export default function Item(){
    const [item, setItem] = useState([])

    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const columns = [
        {field: 'id', headerName: 'ID', width: 50},
        {
            field: 'type_id',
            headerName: 'Tipe',
            width: 100,
            renderCell: (params) => {
                return params.row.types.name
            }
        },
        {
            field: 'donator_user',
            headerName: 'Donatur',
            width: 200,
            renderCell: (params) => {
                return params.row.users.name
            }
        },
        {field: 'name', headerName: 'Nama Barang', width: 100},
        {
            field: 'picture',
            headerName: "Foto",
            width: 150,
            renderCell: (params) => {
                return <Avatar src={`https://charity-backend.helpulstudio.com${params.row.picture}`}/>
            }
        },
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

                    navigate(`/dashboard/edit-item/${thisRow.id}`)
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

                    axios.delete(`https://charity-backend.helpulstudio.com/api/items/${thisRow.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        console.log(response)
                        setItem(item.filter((data, index) => data.id !== thisRow.id))
                    })
                }


                return <Box sx={{
                    flexDirection: 'row',
                    display: 'flex'
                }}>
                    {params.row.status === "distributed" ?
                     <Typography variant={'subtitle3'}>Telah terdistribusi</Typography> :
                     <>
                         <IconButton onClick={handleEdit}>
                             <Edit/>
                         </IconButton>
                         <IconButton onClick={handleDelete}>
                             <Delete/>
                         </IconButton>
                     </>
                    }
                </Box>;
            }
        }
    ]

    useEffect(() => {
        axios.get('https://charity-backend.helpulstudio.com/api/items', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data.data)
                setItem(response.data.data)
            })
    },[])

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
                    <Typography marginY={"auto"}>Data Barang Donasi</Typography>
                    <Link to={"/dashboard/add-item"} style={{textDecoration: "none"}}>
                        <Button variant={"contained"}>Tambah Data</Button>
                    </Link>
                </Box>
                {item ?
                    <DataGrid
                        rows={item}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                    /> : ""}
            </div>
        </>
    )
}