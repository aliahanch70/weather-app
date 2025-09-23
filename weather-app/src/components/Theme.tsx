import { createTheme } from '@mui/material/styles';

// 1. به TypeScript بگویید که رنگ جدیدی به نام ochre وجود دارد
declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}

// 2. به کامپوننت‌ها بگویید که می‌توانند از این رنگ جدید استفاده کنند
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

// 3. تم خود را ایجاد کنید
const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

export default theme;