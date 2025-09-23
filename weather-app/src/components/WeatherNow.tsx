import * as React from 'react';
import { Box, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';



export default function WeatherNow() {

    return (    
    <Stack direction="row" spacing={2 } sx={{p:2 , justifyContent: 'space-between' , alignItems: 'center' }}    >
            <Box sx={{  mb: 1 ,color:"#202224ff" ,textAlign: 'left' }}>
                <Box sx={{ display:"flex" ,  fontSize: 16, mb: 1, p: 1,gap: 0.5  , bgcolor:"#CDD9E0"  , borderRadius:5 , width:"fit-content"}} >
                          <LocationOnIcon sx={{ fontSize: 20 }} />
                            <Typography sx={{ fontSize: 16 }}>Tehran, Iran</Typography>
                </Box>
                <Box sx={{ fontSize: 32,  fontWeight: 'bold'}}>Monday </Box>
                <Box sx={{ fontSize: 14, mb: 1 }}>24 Sep 2025, 11:24 AM</Box>
                <Box sx={{ fontSize: 40 ,fontWeight: 'bold'}}>26` C</Box>
                <Box sx={{ fontSize: 14,  }}>High: 16` C , Low: 12` C</Box>
            </Box>

            <Box sx={{display:"flex",flexDirection:'column', alignContent:"flex-end", flex: 1 ,width: '50%', flexWrap:'wrap'}} >
                <Box component="img" sx={{ height: 100, mb: 1 ,left:10  }} alt="The house from the offer." src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" />
                <Box sx={{ fontSize: 32 , color:"#003464" ,textAlign: 'right' }}>Sunny</Box>
                <Box sx={{ fontSize: 14 , color:"#003464" ,textAlign: 'right' , mt:2}}>Feels like: 25</Box>
            </Box>
        </Stack>
    );
}