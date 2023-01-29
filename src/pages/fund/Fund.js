

import {useEffect, useState} from "react";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";

export default function Fund(){
    const [fund, setFund] = useState([])

    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const columns = [
        {field: 'id', headerName: 'ID', width: 50},
        {
            field: 'needy_people',
            headerName: 'Penerima',
            width: 100,
            renderCell: (params) => {
                return params.row.needy_people.name
            }
        },
        {
            field: 'items',
            headerName: 'Barang terdonasi',
            width: 200,
            renderCell: (params) => {
                return params.row.items.name
            }
        },
        {
            field: 'picture',
            headerName: "Foto",
            width: 150,
            renderCell: (params) => {
                return <Avatar src={`https://charity-backend.helpulstudio.com${params.row.items.picture}`}/>
            }
        },
        {
            field: 'action',
            headerName: 'Aksi',
            renderCell: (params) => {

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

                    axios.delete(`https://charity-backend.helpulstudio.com/api/donations/${thisRow.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        console.log(response)
                        setFund(fund.filter((data, index) => data.id !== thisRow.id))
                    })
                }


                return <Box sx={{
                    flexDirection: 'row',
                    display: 'flex'
                }}>
                    <>
                        <IconButton onClick={handleDelete}>
                            <Delete/>
                        </IconButton>
                    </>
                </Box>;
            }
        }
    ]

    useEffect(() => {
        axios.get('https://charity-backend.helpulstudio.com/api/donations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data.data)
                setFund(response.data.data)
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
                    <Typography marginY={"auto"}>Data Distribusi Donasi</Typography>
                    <Link to={"/dashboard/add-fund"} style={{textDecoration: "none"}}>
                        <Button variant={"contained"}>Tambah Data</Button>
                    </Link>
                </Box>
                {fund ?
                    <DataGrid
                        rows={fund}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                    /> : ""}
            </div>
        </>
    )
}