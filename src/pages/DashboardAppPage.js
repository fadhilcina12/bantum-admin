import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const [statistic, setStatistic] = useState({})

  useEffect(() => {
      if(!token){
        navigate("/login")
          console.log("Ada")
      } else {
        axios.get('https://charity-backend.helpulstudio.com/api/statistic')
            .then(response => {
                console.log(response.data)
                setStatistic(response.data)
            })
      }
  }, [])

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
            {!loading ?
                <>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Data Penerima" total={statistic.needy_people > 0 ? statistic.needy_people : 'Tidak ada'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Data Penyumbang" total={statistic.user > 0 ? statistic.user : 'Tidak ada'} color="info" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Hasil Charity" total={statistic.donation > 0 ? statistic.donation : 'Tidak ada'} color="warning"  />
                    </Grid>

                </> : <></>
            }


        </Grid>
      </Container>
    </>
  );
}
