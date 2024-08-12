import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.runner.example.starter',
  appName: 'C.H. Express',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
