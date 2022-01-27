import { extendTheme } from '@chakra-ui/react';

const gray = '#3C4145';

const colors = {
  brand: {
    600: '#EF5023',
    800: '#153e75',
    700: '#2a69ac',
    grayBg: gray,
  },
};

const components = {
  Button: {
    variants: {
      solid: {
        bg: gray,
        color: '#F5F5F6',
        _hover: {
          color: gray,
        },
      },
      outline: {
        borderColor: gray,
        color: gray,
        _hover: {
          color: gray,
        },
      },
    },
  },
};

const overrides = {
  colors,
  components,
};

export const themeConfig = extendTheme(overrides);
