import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Layout from '../components/header/Layout';
import WeatherNow from '../components/Dashboard/WeatherNow';
import AverageMonthly from '../components/Dashboard/AverageMonthly';
import Forecast from '../components/Dashboard/Forecast';
import Footer from '../components/Footer';


const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

const Body1 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  direction: 'ltr'
}));

export default function DashboardPage() {
  return (
    <>
      <Body1 color="tertiary" sx={{ minHeight: '90vh' }}><Layout />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid size={{ md: 5, xs: 12 }} >
              <Item sx={{ borderRadius: 5, maxHeight: 234 }} ><WeatherNow /></Item>
            </Grid>
            <Grid size={{ md: 7, xs: 12 }}>
              <Item sx={{ maxHeight: 234, borderRadius: 5 }} ><AverageMonthly /></Item>
            </Grid>
            <Grid size={12}>
              <Item sx={{ borderRadius: 5, }} ><Forecast /></Item>
            </Grid>
          </Grid>
        </Box>
      </Body1>
      <Footer />
    </>
  );
}