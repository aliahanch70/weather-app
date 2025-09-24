import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";


export default function ForecastCard() {
    return (
    <Box sx={{ width: "100%" }}>
  
        
    {/* کارت های پیش بینی آب و هوا  */}
<Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2  }}>
    {[...Array(14)].map((_, index) => (
        <Box
            key={index}
            sx={{ minWidth: 70, bgcolor: '#CDD9E0', p: 2, borderRadius: 5 , maxWidth:20, textAlign: 'center' }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Day {index + 1}
            </Typography>
            <Box
                component="img"
                sx={{ height: 50, my: 1 }}
                alt={`Weather icon for day ${index + 1}`}
                src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
            />
            <Typography variant="body1">25°C</Typography>
            <Typography variant="body2" color="text.secondary"> Sunny</Typography>
        </Box>
    ))}
</Box>
    </Box>
    );
}