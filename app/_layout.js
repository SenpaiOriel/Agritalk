import { Stack } from "expo-router";

export default function RootLayout() {
  return (  
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="about" />
      <Stack.Screen name="camera" />
      <Stack.Screen name="review" />
      <Stack.Screen name="history" />
    </Stack>
  );
}
