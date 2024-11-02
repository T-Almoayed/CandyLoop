import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  // مراجع التحريك
  const candyTranslateX = useRef(new Animated.Value(-100)).current;
  const loopTranslateX = useRef(new Animated.Value(100)).current;
  const candyRotate = useRef(new Animated.Value(0)).current; // دوران الجزء "Candy"
  const loopRotate = useRef(new Animated.Value(0)).current; // دوران الجزء "Loop"
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // تسلسل الحركات
    Animated.sequence([
      // حركة جزئي "Candy" و "Loop" باتجاه المركز مع دوران كامل
      Animated.parallel([
        Animated.timing(candyTranslateX, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.circle),
          useNativeDriver: true,
        }),
        Animated.timing(loopTranslateX, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.circle),
          useNativeDriver: true,
        }),
        Animated.timing(candyRotate, {
          toValue: 1, // دورة كاملة (360 درجة)
          duration: 400,
          easing: Easing.out(Easing.circle),
          useNativeDriver: true,
        }),
        Animated.timing(loopRotate, {
          toValue: 1, // دورة كاملة (360 درجة)
          duration: 400,
          easing: Easing.out(Easing.circle),
          useNativeDriver: true,
        }),
      ]),
      // تأثير استقرار لمدة قصيرة، ثم التحجيم والاختفاء
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 500,
        delay: 300, // زمن الانتظار
        easing: Easing.inOut(Easing.circle),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // الانتقال إلى الشاشة الرئيسية بعد انتهاء الحركة
      router.replace('/HomeScreen');
    });
  }, [candyTranslateX, loopTranslateX, candyRotate, loopRotate, scaleAnim, opacityAnim, router]);

  // إعدادات الدوران
  const candyRotateInterpolate = candyRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const loopRotateInterpolate = loopRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                { translateX: candyTranslateX },
                { rotate: candyRotateInterpolate },
              ],
              opacity: opacityAnim,
            },
          ]}
        >
          Candy
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                { translateX: loopTranslateX },
                { rotate: loopRotateInterpolate },
              ],
              opacity: opacityAnim,
            },
          ]}
        >
          Loop
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    color: '#E6007E',
    fontFamily: 'luckybones-bold',
    fontSize: 50,
  },
});
