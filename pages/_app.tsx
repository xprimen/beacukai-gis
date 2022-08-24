import React from 'react';
import moment from 'moment';
import 'moment/locale/id';
import { extendTheme, NativeBaseProvider, theme } from 'native-base';
import colors from 'native-base/src/theme/base/colors';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../services';
import '../styles/globals.css';

moment.locale('id-ID');

const lightText: string = colors.warmGray[300];
const darkText: string = colors.gray[700];

const themeExtend = extendTheme({
  // fontConfig: {
  //   Roboto: {
  //     100: {
  //       normal: 'Roboto-Light',
  //       italic: 'Roboto-LightItalic',
  //     },
  //     200: {
  //       normal: 'Roboto-Light',
  //       italic: 'Roboto-LightItalic',
  //     },
  //     300: {
  //       normal: 'Roboto-Light',
  //       italic: 'Roboto-LightItalic',
  //     },
  //     400: {
  //       normal: 'Roboto-Regular',
  //       italic: 'Roboto-Italic',
  //     },
  //     500: {
  //       normal: 'Roboto-Medium',
  //     },
  //     600: {
  //       normal: 'Roboto-Medium',
  //       italic: 'Roboto-MediumItalic',
  //     },
  //   },
  // },
  // fonts: {
  //   heading: 'Roboto',
  //   body: 'Roboto',
  //   mono: 'Roboto',
  // },
  shadows: {
    '1': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '2': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '3': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '4': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '5': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '6': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '7': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '8': {
      shadowColor: theme.colors.lightBlue[600],
    },
    '9': {
      shadowColor: theme.colors.lightBlue[600],
    },
  },
  colors: {
    lightText,
    darkText,
    primary: {
      50: '#e2f0ff',
      100: '#b4d2fd',
      200: '#85b4f9',
      300: '#5696f7',
      400: '#2d78f5',
      500: '#1c5edc',
      600: '#1349ac',
      700: '#0a347b',
      800: '#021f4b',
      900: '#000a1d',
    },
  },
  components: {
    Input: {
      baseStyle: {
        _input: {
          bg: theme.colors.primary[50],
        },
        _light: {
          placeholderTextColor: theme.colors.muted[600],
          borderColor: theme.colors.blueGray[200],
          _hover: {
            borderColor: theme.colors.primary[300],
            borderWidth: 1,
          },
          _focus: {
            borderColor: theme.colors.primary[100],
            _hover: {
              borderColor: theme.colors.primary[100],
            },
          },
        },
        _dark: {
          borderColor: 'white',
        },
      },
    },
    Text: {
      baseStyle: {
        _light: {
          color: darkText,
        },
        _dark: {
          color: lightText,
        },
      },
    },
    Heading: {
      baseStyle: {
        _light: {
          color: darkText,
        },
        _dark: {
          color: lightText,
        },
      },
    },
  },
});

/* const colorModeManager: StorageManager = {
  get: async () => {
    let val = localStorage.getItem('@color-mode');
    return val === 'dark' ? 'dark' : 'light';
  },
  set: async (value: ColorMode) => {
    let strValue = value ? value.toString() : '';
    localStorage.setItem('@color-mode', strValue);
  },
}; */

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof themeExtend;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NativeBaseProvider theme={themeExtend} isSSR>
        <Component {...pageProps} />
      </NativeBaseProvider>
    </AuthProvider>
  );
}

export default MyApp;

