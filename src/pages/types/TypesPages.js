import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";




export default function TypesPages(){

    const [dataType, setDataType] = useState([])

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const columns = [
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'name', headerName: 'Nama', width: 500 },
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

                    navigate(`/dashboard/edit-type/${thisRow.id}`)
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

                    axios.delete(`https://charity-backend.helpulstudio.com/api/types/${thisRow.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        console.log(response)
                        setDataType(dataType.filter((data, index) => data.id !== thisRow.id))
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

        axios.get('https://charity-backend.helpulstudio.com/api/types', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            setDataType(response.data.data)
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
                    <Typography marginY={"auto"}>Data Tipe Barang</Typography>
                    <Link to={"/dashboard/add-type"} style={{textDecoration: "none"}}>
                        <Button variant={"contained"}>Tambah Tipe</Button>
                    </Link>
                </Box>
                {dataType ?
                    <DataGrid
                        rows={dataType}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                    /> : ""}
            </div>
        </>
    )
}