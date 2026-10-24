// Mock oficial de AsyncStorage para que el store de zustand funcione en Jest.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
