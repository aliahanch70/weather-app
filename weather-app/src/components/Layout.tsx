import { useState, useEffect } from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import NavbarSetting from './NavbarSetting';
import allCities from './AllCity'; 
import { useWeather } from '../contexts/WeatherContext';

const imageUrl = '/image 1.png';

export default function Layout() {
  const { searchQuery, setSearchQuery } = useWeather();
  
  const [inputValue, setInputValue] = useState<string>('');

  // هماهنگ کردن مقدار ورودی
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#F3FAFE", color: "#242105" }}>
        <Toolbar>
          <Box
            component="img"
            sx={{ marginRight: 2, width: '56px', height: '56px' }}
            src={imageUrl}
            alt="App Logo"
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontSize: "14px", flexGrow: 1 }}
          >
            Weather Dashboard
          </Typography>
          <Autocomplete
            disablePortal
            options={allCities}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
            sx={{ width: '30%' }}
            value={
              allCities.find(city => city.label === searchQuery) || null
            }
            inputValue={inputValue}
            
            onChange={(event: any, newValue: { label: string; country: string } | null) => {
              if (newValue) {
                setSearchQuery(newValue.label);
              }
            }}

            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}

            renderInput={(params) => (
              <TextField  
                {...params}
                label="Search your location"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault(); 
                    setSearchQuery(inputValue.trim());
                  }
                }}
                size="small"
              />
            )}
          />
          <NavbarSetting />
        </Toolbar>
      </AppBar>
    </Box>
  );
}