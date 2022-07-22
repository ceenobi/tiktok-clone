import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme(
  {
    colors: {
      paint: {
        teal: '#4FA3A5',
        blue: '#63C5EA',
        pink: '#FA5396',
        amber: '#FCB424',
        white: '#fff',
        typo: '#FF265',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      },
    },
    fonts: {
      heading: `'Monaco', sans-serif`,
      body: `'Quicksand', sans-serif`,
    },

    textStyles: {
      p: {
        fontSize: '14px',
      },
      sm: {
        fontSize: '14px',
        _hover: {
          textDecoration: 'underline',
          cursor: 'pointer',
        },
      },
    },

    styles: {
      global: props => ({
        'html, body': {
          fontSize: 'sm',
          color: props.colorMode === 'light' ? 'paint.typo' : 'paint.white',
          bg: props.colorMode === 'light' ? 'paint.white' : 'paint.typo',
          lineHeight: 'tall',
          h: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        p: {
          color: 'paint.typo',
          fontSize: '16px',
        },
        '.followed-button': {
          border: '1px solid gray',
        },
        '.follow-button': {
          border: '1px solid blue',
          _hover: {
            bg: 'red.400',
          },
        },
        '.videos::-webkit-scrollbar': {
          width: '0px',
        },
        '::-webkit-scrollbar': {
          width: '1px',
        },
        '::-webkit-scrollbar-thumb': {
          _hover: {
            backgroundColor:
              props.colorMode === 'light' ? 'gray.300' : 'gray.700',
          },
          borderRadius: '40px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
      }),
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: 'semibold',
          borderRadius: 'full',
        },
        sizes: {
          sm: {
            fontSize: 'md',
          },
        },
        variants: {
          'with-shadow': {
            bg: 'red.400',
            // w: '120px',
          },
          smooth: {
            bg: 'red.400',
            boxShadow: 'xl',
            height: '58px',
            _hover: {
              bg: 'paint.pink',
            },
          },
        },
      },
      Card: {
        baseStyle: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          cursor: 'pointer',
        },
        variants: {
          rounded: {
            //w: '280px',
          },
          smooth: {
            //w: 'full',
          },
        },
        defaultProps: {
          variant: 'rounded',
        },
      },
    },
  },
  { breakpoints }
);

export default theme;
