// app/splash.tsx or splash.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, G } from 'react-native-svg';

const SplashScreen = () => {
  const router = useRouter();
  const floatAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnimation, {
            toValue: -15,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnimation, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to the home/index page after 5 seconds
    const timer = setTimeout(() => {
      router.replace('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [floatAnimation, opacityAnimation, scaleAnimation, router]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { translateY: floatAnimation },
              { scale: scaleAnimation },
            ],
            opacity: opacityAnimation,
          },
        ]}
      >
        <View style={styles.logoBackground}>
          <Svg width={120} height={120} viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="45" fill="#5A4DBC" />
            <G fill="#FFFFFF">
              <Path d="M50,25 L70,25 L70,55 L30,55 L30,25 L50,25 Z" />
              <Circle cx="40" cy="37" r="5" fill="#5A4DBC" />
              <Circle cx="60" cy="37" r="5" fill="#5A4DBC" />
              <Path d="M40,47 L60,47 L60,50 L40,50 Z" fill="#5A4DBC" />
              <Path d="M45,25 L43,15 L47,15 L45,25 Z" />
              <Path d="M55,25 L53,15 L57,15 L55,25 Z" />
              <Path d="M35,55 L65,55 L65,75 L35,75 Z" />
              <Path d="M30,40 L25,40 L20,60 L25,60 L30,40 Z" />
              <Path d="M70,40 L75,40 L80,60 L75,60 L70,40 Z" />
              <Path d="M40,75 L45,75 L45,85 L40,85 Z" />
              <Path d="M55,75 L60,75 L60,85 L55,85 Z" />
            </G>
          </Svg>
        </View>
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: opacityAnimation,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        Class Monitoring
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C39',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoBackground: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#3E3D53',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#5A4DBC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    letterSpacing: 1,
    textShadowColor: '#5A4DBC',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default SplashScreen;
