import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword = () => {
    // هنا سيتم إرسال طلب لإعادة تعيين كلمة المرور عبر البريد الإلكتروني.
    Alert.alert('Success', 'A password reset link has been sent to your email.');
    navigation.goBack(); // الرجوع إلى الشاشة السابقة بعد الإرسال
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Återställ lösenord</Text>
      <TextInput
        style={[styles.input, { borderColor: '#E6007E' }]}
        placeholder="Ange din e-postadress"
        placeholderTextColor="#999"
        onChangeText={(text) => setEmail(text)}
        value={email}
        selectionColor="#E6007E"
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
        <Text style={styles.resetButtonText}>Skicka återställningslänk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#E6007E',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#E6007E',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
