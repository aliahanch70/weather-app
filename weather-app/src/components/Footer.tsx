import { Box, Typography, Stack } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';

//  current date and time
const getCurrentDateTime = () => {
  const now = new Date();
  
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  

  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(now).replace(',', ' .');
  
  return formattedDate;
};


export default function Footer() {
    const theme = useTheme(); // Get the current theme to access its colors
  
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: 'auto', 

        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        minHeight: '10vh',
        gap: 2,
        color:theme => theme.palette.color1?.default,
        background: `linear-gradient(to right, transparent, ${theme.palette.background.paper}, transparent)`,

      }}
    >
      {/* Left Side */}
      <Typography variant="body2" color="text.secondary">
        All rights of this site are reserved for Nadin Sadr Aria Engineering Company.
      </Typography>

      {/* Right Side */}
      <Stack direction="row" spacing={2} alignItems="center">
        
        
        <Stack direction="row" spacing={1} alignItems="center">
          <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            contact us : info@nadin.ir
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {getCurrentDateTime()}
          </Typography>
        </Stack>
      </Stack>
    </Box>
    </Box>
  );
}