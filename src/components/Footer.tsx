import { Box, Typography, Stack } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const theme = useTheme(); // current theme
  const { t, i18n } = useTranslation();

  const localTime = new Date();
  const isFarsi = i18n.language === 'fa';

  const fullDateFormatter = new Intl.DateTimeFormat(
    isFarsi ? 'fa-IR' : 'en-GB',
    {
      day: 'numeric',
      month: isFarsi ? 'long' : 'short', // month format 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: !isFarsi, // 12-hour format for english
      calendar: isFarsi ? 'persian' : 'gregory'
    }
  );

  const fullDate = fullDateFormatter.format(localTime);

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
          color: theme => theme.palette.color1?.default,
          background: `linear-gradient(to right, transparent, ${theme.palette.background.paper}, transparent)`,

        }}
      >
        {/* Left Side */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            component="img"
            src="/images/icon.png"
            loading="lazy"
            alt="Nadin Logo"
            sx={{ height: 40 }}
          />
          <Typography sx={{ fontSize: { md: 14, xs: 12 } }} color="text.secondary">
            {t('nadin')}
          </Typography>

        </Box>

        {/* Right Side */}
        <Stack direction="row" spacing={2} alignItems="center">


          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon sx={{ fontSize: { md: 14, xs: 14 }, color: 'text.secondary' }} />
            <Typography sx={{ fontSize: { md: 14, xs: 12 } }} color="text.secondary">
              {t('contact')}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayIcon sx={{ fontSize: { md: 14, xs: 14 }, color: 'text.secondary' }} />
            <Typography sx={{ fontSize: { md: 14, xs: 12 } }} color="text.secondary">
              {fullDate}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}