import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import  Layout  from '../components/Layout';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function DashboardPage() {
  return (
    <Box sx={{  bgcolor: '#F3FAFE', minHeight: '100vh' }}>
        <Layout/>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} sx={{p:3}}>
        <Grid size={5} >
          <Item sx={{bgcolor:"#E1E9EE"}} elevation={4}>Weather Now</Item>
        </Grid>
        <Grid size={7}>
          <Item sx={{bgcolor:"#E1E9EE"}} elevation={4}>Monthly avrage</Item>
        </Grid>
        <Grid size={12}>
          <Item sx={{bgcolor:"#E1E9EE"}} elevation={4}>Forecast</Item>
        </Grid>
       
      </Grid>
    </Box>
    </Box>
  );
}