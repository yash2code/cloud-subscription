import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

const fontStyles = {
  small: {
    fontSize: 13,
    color: '#696d75',
  },
  smallBold: {
    fontSize: 13,
    fontWeight: 700,
  }
}

const customTypographyFn = (attr) => (props) => {
  const { variant } = props;
  switch (variant) {
    case 'small': return fontStyles[variant][attr];
    case 'smallBold': return fontStyles[variant][attr];
    default : return null; 
  }
}


const theme = createMuiTheme({
  typography: {
    fontFamily: 'Arimo',
    fontSize: 16,
    h1: {
      fontFamily: 'NimbusSanD-Bol',
      fontWeight: 700,
      fontSize: 56,
      lineHeight: '60px',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'NimbusSanD-Bol',
      fontWeight: 700,
      fontSize: 48,
      lineHeight: '48px',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: 'NimbusSanD-Bol',
      fontWeight: 700,
      fontSize: 36,
      lineHeight: '36px',
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: 'Arimo',
      fontWeight: 700,
      fontSize: 28,
      lineHeight: '34px',
    },
    h5: {
      fontFamily: 'Arimo',
      fontWeight: 700,
      fontSize: 24,
      lineHeight: '34px',
    },
    h6: {
      fontFamily: 'Arimo',
      fontWeight: 400,
      fontSize: 21,
      lineHeight: '28px',
    },
    body1: {
      fontFamily: 'Arimo',
      fontSize: 16,
      lineHeight: '24px',
    },
    body2: {
      fontFamily: 'Arimo',
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '24px',
    },
    caption: {
      fontFamily: 'Arimo',
      fontSize: 14,
      lineHeight: '18px',
      color: '#696D75',
    },
    subtitle1: {
      fontFamily: 'Arimo',
      fontSize: 21,
      lineHeight: '28px',
      fontWeight: 700,
    },
    subtitle2: {
      fontFamily: 'Arimo',
      fontSize: 14,
      fontWeight: 700,
      lineHeight: '24px',
    },
    button: {
      fontSize: 16,
    },
  },
  palette: {
    type: 'light',
    primary: {
      'main': '#eb5e28',
      'dark': '#e4470b',
      'light': '#FFF5F1',
      '50': '#FFFCF2',
      '100': '#FFF5EC',
      '200': '#FFECE4',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#171819',
      secondary: '#696d75',
      disabled: 'rgba(105,109,117,.6)',
      hint: '#696d75',
      dark: '#6e7175',
    },
    background: {
      default: '#F8F8F8',
      blueGray: '#FDFDFD',
      '100': '#F0F0F0',
      '200': '#EAE6E7',
      blueGrayDark: '#f5f4f4'
    },
    info: {
      main: '#547FF6',
      light: '#F2F5FE',
      text: '#84848D'
    },
    error: {
      main: '#e83025',
      light: '#FFECEC',
    },
    success: {
      main: '#25C186',
      light: '#E3FFF5',
    },
    action: {
      disabledBackground: '#f8f8f8',
      default: '#FFFFFF'
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
    MuiChip: {
      deleteIcon: <ClearIcon />,
    },
    MuiTooltip: {
      arrow: true
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontWeight: 400,
        },
      },
    },
    MuiTypography: {
      root: {
        fontSize: customTypographyFn('fontSize'),
        fontWeight: customTypographyFn('fontWeight'),
        color: customTypographyFn('color'),
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 5px 20px rgba(158, 158, 158, 0.1)',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: 14,
      },
    },
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: 'transparent',
        },
        '&$focused $notchedOutline': {
          borderColor: 'transparent',
          borderWidth: 1,
        },
        '&:hover input': {
          backgroundColor: '#FFF5F1',
        },
      },
      notchedOutline: {
        borderColor: 'transparent',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      sizeLarge: {
        fontSize: 16,
      },
      containedSizeLarge: {
        padding: '10px 22px',
      },
      outlinedSizeLarge: {
        padding: '9px 22px',
      },
      outlinedPrimary: {
        '&$disabled': {
          backgroundColor: '#f8f8f8',
        },
      },
    },
    MuiToggleButton: {
      root: {
        textTransform: 'none',
        '&$selected': {
          backgroundColor: '#FFF5F1',
        },
      },
    },
    MuiSvgIcon: {
      colorAction: {
        color: '#696d75',
        opacity: 0.5,
      },
    },
    MuiAlert: {
      root: {
        fontSize: 14,
        lineHeight: '18px',
        fontWeight: 400,
      },
      filledInfo: {
        color: '#000000',
      },
    },
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        'padding': 1,
        '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
          'transform': 'translateX(16px)',
          'color': '#fff',
          '& + $track': {
            opacity: 1,
            border: 'none',
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: '1px solid #bdbdbd',
        backgroundColor: '#fafafa',
        opacity: 1,
        transition:
          'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      },
    },
    MuiDialog: {
      paperFullScreen: {
        backdropFilter: 'blur(8px)',
      },
    },
    MuiTab: {
      root: {
        'textTransform': 'none',
        '&$selected': {
          fontWeight: 700,
        },
      },
      selected: {},
    },
    MuiTableCell: {
      root: {
        fontWeight: 400,
      },
      head: {
        fontWeight: 600,
      }
    },
    MuiInputBase: {
      multiline: {
        padding: 0,
      },
    },
    MuiChip: {
      root: {
        borderRadius: 4,
        color: '#696d75',
        backgroundColor: '#F0F0F0',
        fontSize: 14,
      },
      colorPrimary: {
        backgroundColor: '#FFF5EC',
        color: '#EB5E28',
        fontWeight: 700,
      },
      iconColorPrimary: {
        color: '#EB5E28'
      },
      deleteIconColorPrimary: {
        color: '#EB5E28'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#404042',
        fontSize: 12,
        lineHeight: '18px',
        padding: 8,
      }
    },
    MuiAccordionSummary: {
      root: {
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
          minHeight: 56,
          borderBottom: '1px solid rgba(0, 0, 0, .125)',
        },
        flexDirection: 'row-reverse',
      },
      content: {
        '&$expanded': {
          margin: '12px 0',
          '& .MuiTypography-root': {
            color: '#eb5e28',
          },
        },
      },
      expandIcon: {
        '&$expanded':{
          color: '#eb5e28',
        },
      },
      expanded: {},
    },
    MuiAvatarGroup: {
      avatar: {
        borderColor: '#FCECE4'
      }
    },
    MuiAvatar: {
      root: {
        borderColor: '#FCECE4',
        border: '2px solid',
        fontSize: 16,
        fontWeight: 700,
      }
    }
  },
  shape: 0,
});

export default theme;
