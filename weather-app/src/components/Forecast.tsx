import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ForecastCard from "./ForecastCard";

export default function Forecast() {
  return (
    <Box sx={{ width: "100%" ,p:2 }}>
        <Typography variant="h6" sx={{ mb:3, textAlign: 'left' , fontWeight: 'bold' , color:"#202224ff"}} >
          2 Weeks Forecast
          
        </Typography>
        <ForecastCard/>   
    </Box>
  );
}