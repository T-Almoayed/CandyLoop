import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const StoresScreen: React.FC = () => {
  // بيانات المتجر المؤقتة
  const storeData = {
    name: 'Mjölby',
    address: 'Vasavägen 13 b, 595 58 Mjölby',
    phone: '0722611311',
    email: 'info@candyloop.se',
    open24Hours: true,
  };

  return (
    <View style={styles.container}>
      {/* صورة المتجر */}
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.storeImage} />
      

      {/* معلومات المتجر */}
      <Text style={styles.storeName}>{storeData.name}</Text>

      {/* رسالة تشير إلى أن المتجر مفتوح 24 ساعة */}
      {storeData.open24Hours ? (
        <Text style={styles.open24HoursText}>Öppet dygnet runt (24/7)</Text>
      ) : (
        <Text style={styles.openToday}>Öppet idag</Text>
      )}

      {/* تفاصيل الاتصال بالمتجر */}
      <Text style={styles.storeAddress}>{storeData.address}</Text>
      <Text style={styles.storeContact}>{storeData.phone}</Text>
      <Text style={styles.storeContact}>{storeData.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  storeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  changeStoreButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  changeStoreText: {
    color: '#333',
    fontSize: 16,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  open24HoursText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E6007E',
    marginBottom: 10,
  },
  storeAddress: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 5,
  },
  storeContact: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 10,
  },
});

export default StoresScreen;
