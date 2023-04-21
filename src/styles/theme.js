import { createTheme } from '@mui/material/styles';

const themeColors = {
  primary: {
    base: '#5048E5',
    lightness2: '#93CAFE',
    lightness3: '#C9E4FE',
    lightness4: '#E0EFFE',
    darkness1: '#323C65',
    darkness2: '#003260',
    darkness3: '#001E3A',
  },
  secondary: {
    base: '#2EC2A0',
    lightness3: '#D3F2EB',
  },
  tertiary: {
    base: '#5E6993',
    lightness1: '#9298B6',
    lightness2: '#BABED1',
    lightness3: '#DCDEE8',
    lightness4: '#F3F6F9',
    darkness1: '#707485',
    darkness2: '#495173',
    darkness3: '#333851',
    darkness5: '#111827',
  },
  danger: {
    base: '#FE025F',
    lightness1: '#FF004D',
    lightness2: '#F78D8D',
    lightness3: '#FEC8D0',
    lightness4: '#FEE0E1',
    darkness1: '#D14343',
  },
  grey: {
    base: '#A5A5A5',
    lightness1: '#E0E0E0',
    lightness2: '#EDEDED',
    lightness3: '#EEEEEE',
    lightness4: '#FAFAFA',
    lightness5: '#F3F3F3',
    darkness1: '#DDDDDD',
    darkness2: '#6C757D',
    darkness3: '#8596A7',
    darkness4: '#EBECF1',
    darkness5: '#565656',
  },
  yellow: {
    base: '#FFAF24',
    lightness1: '#F9C87C',
    lightness2: '#FFE9C9',
  },
  orange: {
    base: '#FF7000',
    darkness1: '#F97432',
    lightness1: '#FFAC4A',
  },
  blue: {
    base: '#EBF5FF',
    lightness1: '#CCE6FF',
  },
  white: {
    base: '#FFFFFF',
    lightness1: '#FBFCFD',
  },
  black: {
    base: '#000000',
  },
  green: {
    base: '#28CD6A',
    lightness1: '#B8D8BE',
    lightness2: '#C8E1CC',
    lightness3: '#D2E7D6',
    lightness4: '#E0F0E3',
    lightness5: '#E8F4EA',
  },
};

const themeOptions = {
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '130%',
      color: themeColors.tertiary.darkness5,
    },
    h2: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: '130%',
      color: themeColors.tertiary.darkness5,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '130%',
      color: themeColors.tertiary.darkness5,
    },
    h4: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: '130%',
      color: themeColors.tertiary.darkness5,
    },
    h5: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '130%',
      color: themeColors.tertiary.darkness5,
    },
    h6: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '130%',
      color: themeColors.tertiary.darkness5,
    },
    body1: {
      color: themeColors.grey.darkness5,
    },
    body2: {
      color: themeColors.grey.darkness5,
    },
    p: {
      color: themeColors.grey.darkness5,
    }
  },
  palette: {
    text: {
      primary: themeColors.tertiary.darkness3,
    },
    primary: {
      main: themeColors.primary.base,
    },
    secondary: {
      main: themeColors.secondary.base,
    },
    tertiary: {
      main: themeColors.tertiary.base,
      light: themeColors.tertiary.lightness1,
      dark: themeColors.tertiary.darkness3,
    },
    danger: {
      main: themeColors.danger.base,
    },
    error: {
      main: themeColors.danger.base,
    },
    action: {
      disabled: themeColors.grey.base,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
        contained: {
          color: 'white',
        },
        outlined: {
          backgroundColor: 'white',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 32,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .Mui-error': {
            color: themeColors.danger.base,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginBottom: 4,
          display: 'inline-flex',
        },
        asterisk: {
          color: 'red',
          fontWeight: 700,
          fontSize: 24,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 14,
          marginLeft: 0,
        },
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        sizeSmall: {
          fontSize: 10,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 16,
        },
      },
    },
  },
  backgroundColor: '#F3F7FB',
  ...themeColors,
};

export const theme = createTheme(themeOptions);
