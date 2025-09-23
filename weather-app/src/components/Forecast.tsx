import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ForecastCard from "./ForecastCard";

export default function Forecast() {
  return (
    <Box sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{p:2 ,mb:5, textAlign: 'left' , fontWeight: 'bold' , color:"#202224ff"}} >
          2 Weeks Forecast
          <ForecastCard/>   
        </Typography>
    </Box>
  );
}