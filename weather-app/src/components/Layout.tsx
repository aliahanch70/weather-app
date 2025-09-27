import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavbarSetting from './NavbarSetting';
import allCities from './AllCity';
import { useWeather } from '../contexts/WeatherContext';
import { useTranslation } from 'react-i18next';

const imageUrl = '/image 1.png';

export default function Layout() {
  const theme = useTheme();
  // Detect screen
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State to manage visibility mobile search bar
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { searchQuery, setSearchQuery } = useWeather();
  const [inputValue, setInputValue] = useState<string>('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query.trim());
      setMobileSearchOpen(false); // Close mobile search
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} key={i18n.language}>
      <Box
        sx={{
          bgcolor: 'background.default',
          boxShadow: theme.palette.mode === 'dark'
            ? '0px 5px 15px rgba(166, 165, 165, 0.15)'
            : theme.shadows[4],
        }}
      >
        <Toolbar>
          {isMobile && mobileSearchOpen ? (
            //mobile search view
            <>
              <IconButton onClick={() => setMobileSearchOpen(false)}>
                <ArrowBackIcon />
              </IconButton>
              <Autocomplete
                fullWidth
                autoFocus
                open
                options={allCities}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
                inputValue={inputValue}
                onInputChange={(_event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                onChange={(_event: any, newValue: { label: string; country: string } | null) => {
                  if (newValue) {
                    handleSearch(newValue.label);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('searchYourLocation')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        handleSearch(inputValue);
                      }
                    }}
                  />
                )}
              />
            </>
          ) : (
            // normal view
            <>
              <Box
                component="img"
                sx={{ marginRight: 2, width: 'auto', height: { md: '56px', xs: "48px" } }}
                src={imageUrl}
                alt="App Logo"
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontSize: "14px", flexGrow: 1 }}
              >
                {t('weatherDashboard')}
              </Typography>

              {isMobile ? (
                // On mobile search icon
                <IconButton onClick={() => setMobileSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
              ) : (
                <Autocomplete
                  sx={{ width: '25%', height:"50%" ,borderRadius:15 , p:0}}

                  options={allCities}
                  getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
                  inputValue={inputValue}
                  onInputChange={(_event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  onChange={(_event: any, newValue: { label: string; country: string } | null) => {
                    if (newValue) {
                      handleSearch(newValue.label);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField

                      {...params}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          handleSearch(inputValue);
                        }
                      }}
                      size='small'
                      label={t('searchYourLocation')}
                      variant="outlined"
                    />
                  )}
                />
              )}
              <NavbarSetting />
            </>
          )}
        </Toolbar>
      </Box>
    </Box>
  );
}