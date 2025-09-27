declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    background2?: PaletteOptions['background'];
    color1?: PaletteOptions['background'];
    color2?: PaletteOptions['background'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    background2?: PaletteOptions['background'];
    color1?: PaletteOptions['background'];
    color2?: PaletteOptions['background'];

  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

