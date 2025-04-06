import { Stack } from "expo-router";
import { LanguageProvider } from './context/LanguageContext';

export default function RootLayout() {
  return (  
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="about" />
        <Stack.Screen name="camera" />
        <Stack.Screen name="review" />
        <Stack.Screen name="history" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="reset-password" />
      </Stack>
    </LanguageProvider>
  );
}
