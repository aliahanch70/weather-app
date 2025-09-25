import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useTranslation } from 'react-i18next';


// url تصویر
const imageUrl = '/Login.png';

const LoginPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const [t, i18n] = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  // مدیریت ارسال فرم
  const handleSubmit = (): void => {
    if (name.trim().length >= 3) {
      setError(false);
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  // مدیریت ورودی و پنهان کردن خطا
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
      sx={{ bgcolor: 'background.default' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center" // Centers items horizontally
      >
        <Paper elevation={4} sx={{ borderRadius: "15px", overflow: 'hidden', mb: 2 }}>
          <Box sx={{
            width: 960,
            height: 560,

            display: 'flex'
          }}>

            {/* فرم لاگین */}
            <Box sx={{
              flex: 1,
              backgroundColor: theme => theme.palette.background.paper,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}
              >
                {t('welcomeMessage')}
              </Typography>

              {/* Alert */}
              {error && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Name must be at least 3 characters long
                </Alert>
              )}

              <TextField
                label="Enter your name"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                sx={{ mb: 3 }}
              />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
              </Button>
            </Box>

            {/*  عکس */}
            <Box
              component="img"
              sx={{
                flex: 1,
                backgroundColor: theme => theme.palette.background.paper,
                width: '50%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={imageUrl}
              alt="Login visual"
            />

          </Box>
        </Paper>


        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Language
            </InputLabel>
            <NativeSelect
              // Set the current value from the i18n instance
              value={i18n.language}
              // 3. Add the onChange handler
              onChange={handleLanguageChange}
              inputProps={{
                name: 'Language',
                id: 'uncontrolled-native',
              }}
            >
              <option value='en'>English</option>
              <option value='fa'>Farsi</option>
            </NativeSelect>
          </FormControl>
        </Box>

      </Box>
    </Box>
  );
};

export default LoginPage;