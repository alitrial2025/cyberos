import { Platform } from 'react-native';

export const AuraColors = {
  black: '#000000',
  white: '#FFFFFF',
  neonCyan: '#00F3FF',
  neonMagenta: '#FF003C',
  glassWhite: 'rgba(255, 255, 255, 0.1)',
  glassBlack: 'rgba(0, 0, 0, 0.4)',
  nothingGrey: '#707070',
  cyberpunkYellow: '#F3E600',
  // Hacker Theme Colors
  terminalGreen: '#00FF41',
  terminalGreenLow: 'rgba(0, 255, 65, 0.2)',
  alertRed: '#FF0000',
  warningOrange: '#FF8C00',
  matrixDark: '#0D0208',
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#00FF41',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#00FF41',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0D0208',
    tint: '#00FF41',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#00FF41',
  },
};

export const Fonts = {
  main: Platform.select({
    ios: 'Courier',
    android: 'monospace',
    default: 'monospace',
  }),
  tech: 'SpaceMono', 
};
