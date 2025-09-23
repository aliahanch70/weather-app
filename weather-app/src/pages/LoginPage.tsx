import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// url تصویر
const imageUrl = '/Login.png';

const LoginPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

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
      bgcolor="#F3FAFE"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center" // Centers items horizontally
      >
        <Paper elevation={4} sx={{ borderRadius: "15px", overflow: 'hidden', mb: 2, }}>
          <Box sx={{
            width: 960,
            height: 560,

            display: 'flex'
          }}>

            {/* فرم لاگین */}
            <Box sx={{
              flex: 1,
              backgroundColor: 'white',
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
                Login
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
                width: '50%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={imageUrl}
              alt="Login visual"
            />

          </Box>
        </Paper>

        
        {/* تغییر زبان: */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Language
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'Language',
                id: 'uncontrolled-native',
              }}
            >
              <option value={10}>English</option>
              <option value={20}>Farsi</option>
            </NativeSelect>
          </FormControl>
        </Box>

      </Box>
    </Box>
  );
};

export default LoginPage;