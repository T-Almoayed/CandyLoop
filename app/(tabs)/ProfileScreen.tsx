import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ForgotPasswordScreen from '../ForgotPasswordScreen'; // تأكد من أن المسار صحيح

// تعريف نوع الخاصية Navigation المستخدمة في التنقل
interface LoginScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

// بيانات تسجيل الدخول المؤقتة
const mockUserData = {
  email: 'almaoyed24@gmail.com',
  password: '123456',
};

// تعريف المكون الرئيسي لشاشة تسجيل الدخول
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // دالة للتحقق من بيانات تسجيل الدخول
  const handleLogin = async () => {
    // استعلام API لتعريف عملية تسجيل الدخول الحقيقية، معطل حاليًا
    /*
    try {
      const response = await fetch('https://api.honestbox.se/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Failed to login. Please try again later.');
    }
    */

    // التحقق من بيانات تسجيل الدخول باستخدام البيانات المؤقتة
    if (email === mockUserData.email && password === mockUserData.password) {
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      {/* زر العودة إلى الشاشة الرئيسية */}
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.backText}>Tillbaka</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Logga in</Text>

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
      <View style={[styles.passwordContainer, { borderColor: '#E6007E' }]}>
        <TextInput
          style={[styles.passwordInput, { borderColor: '#E6007E', outlineColor: 'transparent' }]}
          placeholder="Lösenord"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
          selectionColor="#E6007E"
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* رابط لاستعادة كلمة المرور */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPasswordText}>Glömt ditt lösenord?</Text>
      </TouchableOpacity>

      {/* زر تسجيل الدخول */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Logga in</Text>
      </TouchableOpacity>

      {/* رابط للتسجيل إذا لم يكن للمستخدم حساب */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Har du inget konto? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerLink}>Registrera dig</Text>
        </TouchableOpacity>
      </View>

      {/* رابط لصفحة "عن التطبيق" */}
      <TouchableOpacity>
        <Text style={styles.aboutText}>Om appen</Text>
      </TouchableOpacity>
    </View>
  );
};

// أنماط التصميم
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  forgotPasswordText: {
    color: '#E6007E',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#E6007E',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    color: '#333',
  },
  registerLink: {
    color: '#E6007E',
    fontWeight: 'bold',
  },
  aboutText: {
    color: '#E6007E',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
