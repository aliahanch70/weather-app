import { Box } from "@mui/material";


export default function Footer() {
    return (
      <Box sx={{ bottom:0, textAlign: 'center', p: 2, bgcolor: '#E1E9EE', mt: 4, borderRadius: 2 }}>
        <p style={{ margin: 0, color: '#202224ff', fontWeight: 'bold' }}>© 2024 WeatherApp. All rights reserved.</p>
      </Box>
    );
  }