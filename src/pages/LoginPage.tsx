import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const imageUrl = '/images/icon12.png';
const imageUrl2 = '/images/Moon cloud mid rain.png';
const imageUrl3 = '/images/icon11.png';

const LoginPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  const handleSubmit = (): void => {
    if (name.trim().length >= 3) {
      setError(false);
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (error) {
      setError(false);
    }
    setName(e.target.value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ bgcolor: 'background.default', p: isMobile ? 2 : 0 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={isMobile ? '100%' : 'auto'}
      >
        <Paper elevation={4} sx={{
          borderRadius: "15px",
          overflow: 'hidden',
          mb: 2,
          width: isMobile ? '100%' : '100vh',
          maxWidth: isMobile ? '450px' : 'none',
        }}>
          <Box sx={{
            width: '100%',
            height: isMobile ? 'auto' : 560,
            minHeight: isMobile ? 'auto' : 'auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}>

            {/* Login Form */}
            <Box sx={{
              flex: isMobile ? 'none' : 1,
              backgroundColor: theme.palette.background.paper,
              p: isMobile ? 3 : 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: isMobile ? '100%' : '50%',
              height: isMobile ? '40vh' : '100%',
              order: isMobile ? 2 : 1,
            }}>
              <Typography
                variant="h5"
                component="h1"
                sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}
              >
                {t('loginButton')}
              </Typography>

              {error && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {t('nameLengthError')} {/* error message */}
                </Alert>
              )}

              <TextField
                label={t('enterYourName')}
                variant="outlined"
                value={name}

                onChange={handleNameChange}
                sx={{ mb: 3, mt: isMobile ? 3 : 4, fontSize: isMobile ? '0.9rem' : '1rem' }}
              />
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: isMobile ? 3 : 15 }}>
                {t('loginButton')}
              </Button>
            </Box>

            {/* Images */}
            <Box
              sx={{
                backgroundColor: theme.palette.background3?.paper,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                width: isMobile ? "100%" : "50%",
                height: isMobile ? 300 : "100%",
                order: isMobile ? 1 : 2,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Box
                  component="img"
                  src={imageUrl}
                  loading="lazy"
                  sx={{
                    width: isMobile ? "100%" : "180px",
                    height: isMobile ? 130 : "auto",
                    objectFit: "scale-down",
                    filter: "drop-shadow(0px 30px 40px rgba(0,0,0,0.8))",
                  }}
                />
                <Box
                  component="img"
                  src={imageUrl2}
                  loading="lazy"
                  sx={{
                    width: isMobile ? "100%" : "180px",
                    height: isMobile ? 130 : "auto",
                    objectFit: "scale-down",
                    filter: "drop-shadow(0px 30px 40px rgba(0,0,0,0.8))",

                    borderRadius: 2,
                  }}
                />
              </Box>

              {/* عکس تکی سمت چپ */}
              <Box
                component="img"
                src={imageUrl3}
                loading="lazy"

                sx={{
                  width: isMobile ? "50%" : "180px",
                  height: isMobile ? 130 : "auto",
                  objectFit: "scale-down",
                  filter: "drop-shadow(0px 30px 40px rgba(0,0,0,0.8))",

                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Language Selector */}
        <Box sx={{ minWidth: 120, width: isMobile ? '100%' : 'auto', maxWidth: isMobile ? '450px' : 'none', mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {t('language')}
            </InputLabel>
            <NativeSelect
              value={i18n.language}
              onChange={handleLanguageChange}
              inputProps={{
                name: 'Language',
                id: 'uncontrolled-native',
              }}
            >
              <option value='en'>{t('languageOptionEnglish')}</option>
              <option value='fa'>{t('languageOptionPersian')}</option>
            </NativeSelect>
          </FormControl>
        </Box>

      </Box>
    </Box>
  );
};

export default LoginPage;