import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // إضافة حالة لرقم الهاتف

  // دالة لمعالجة التسجيل
  const handleRegister = () => {
    // تحقق من أن جميع الحقول ممتلئة
    if (!name || !email || !password || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // في هذه المرحلة، سنقوم فقط بعرض رسالة توضيحية
    Alert.alert('Success', 'Your account has been created!');
    navigation.navigate('HomeScreen'); // الانتقال إلى الشاشة الرئيسية
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Tillbaka</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registrera dig</Text>

      {/* حقل إدخال الاسم */}
      <TextInput
        style={[styles.input, { borderColor: '#E6007E' }]}
        placeholder="Namn"
        placeholderTextColor="#999"
        onChangeText={(text) => setName(text)}
        value={name}
        selectionColor="#E6007E"
        underlineColorAndroid="transparent"
      />

      {/* حقل إدخال البريد الإلكتروني */}
      <TextInput
        style={[styles.input, { borderColor: '#E6007E' }]}
        placeholder="E-postadress"
        placeholderTextColor="#999"
        onChangeText={(text) => setEmail(text)}
        value={email}
        selectionColor="#E6007E"
        underlineColorAndroid="transparent"
      />

      {/* حقل إدخال كلمة المرور */}
      <TextInput
        style={[styles.input, { borderColor: '#E6007E' }]}
        placeholder="Lösenord"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
        selectionColor="#E6007E"
        underlineColorAndroid="transparent"
      />

      {/* حقل إدخال رقم الهاتف */}
      <TextInput
        style={[styles.input, { borderColor: '#E6007E' }]}
        placeholder="Telefonnummer"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        selectionColor="#E6007E"
        underlineColorAndroid="transparent"
      />

      {/* زر التسجيل */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrera dig</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backText: {
    color: '#E6007E',
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#E6007E',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#E6007E',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
