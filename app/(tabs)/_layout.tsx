import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import SplashScreen from '../SplashScreen'; // تأكد من أن المسار صحيح بناءً على هيكل المشروع

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // إخفاء شاشة الترحيب بعد 1.5 ثانية
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    // عرض شاشة الترحيب أولاً
    return <SplashScreen />;
  }

  return (
    <>
      {/* الهيدر الثابت */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CandyLoop</Text>
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#E6007E',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarLabelStyle: { paddingBottom: 8 },
          tabBarIconStyle: { marginBottom: -8 },
        }}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            title: 'Startsida',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="OffersScreen"
          options={{
            title: 'Erbjudanden',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'pricetag' : 'pricetag-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="TopCustomersScreen"
          options={{
            title: 'Toppkunder',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'star' : 'star-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="StoresScreen"
          options={{
            title: 'Butiker',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'location' : 'location-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            title: 'Mina Sidor',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    //borderBottomWidth: 1,
    //borderBottomColor: '#E6007E',
    //borderRadius: 20,
    //marginHorizontal: 10,
    //marginTop: 5,
  },
  headerText: {
    color: '#E6007E',
    fontSize: 70,
    fontWeight: 'bold',
    fontFamily: 'luckybones-bold',
  },
});
