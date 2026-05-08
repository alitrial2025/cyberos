import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  runOnJS,
  FadeIn
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { AuraColors, Fonts } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LOG_MESSAGES = [
  "[SYS] INITIALIZING KERNEL...",
  "[SYS] MOUNTING /DEV/SDA1...",
  "[NET] PROBING REMOTE HOST 192.168.1.254",
  "[SEC] ENCRYPTION LAYER DETECTED: RSA-4096",
  "[SEC] ATTEMPTING BRUTE FORCE...",
  "[SEC] DICTIONARY LOADED: 1.2M ENTRIES",
  "[SEC] PACKET SNIFFER ACTIVE",
  "[SEC] BYPASSING FIREWALL...",
  "[SYS] BUFFER OVERFLOW DETECTED",
  "[SYS] EXPLOITING HEAP...",
  "[SEC] ACCESS DENIED. RETRYING...",
  "[NET] SPOOFING MAC ADDRESS...",
  "[SEC] HANDSHAKE CAPTURED",
  "[SEC] DECRYPTING SHA-256...",
];

export default function LockScreen() {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);
  const unlockProgress = useSharedValue(0);
  const alertPulse = useSharedValue(0);

  useEffect(() => {
    // Add logs one by one
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-15), LOG_MESSAGES[i % LOG_MESSAGES.length]]);
      i++;
    }, 400);

    // Alert pulse animation
    alertPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY < 0) {
        unlockProgress.value = Math.abs(e.translationY) / SCREEN_HEIGHT;
      }
    })
    .onEnd((e) => {
      if (e.velocityY < -500 || unlockProgress.value > 0.3) {
        unlockProgress.value = withTiming(1, { duration: 400 }, () => {
          runOnJS(router.replace)('/home');
        });
      } else {
        unlockProgress.value = withSpring(0);
      }
    });

  const mainContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(unlockProgress.value, [0, 0.5], [1, 0]),
    transform: [{ scale: 1 - unlockProgress.value * 0.1 }]
  }));

  const alertStyle = useAnimatedStyle(() => ({
    borderColor: AuraColors.alertRed,
    borderWidth: interpolate(alertPulse.value, [0, 1], [1, 3]),
    shadowColor: AuraColors.alertRed,
    shadowOpacity: alertPulse.value,
    shadowRadius: 10,
    opacity: interpolate(unlockProgress.value, [0, 0.1], [1, 0]),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, mainContainerStyle]}>
        <StatusBar hidden />

        {/* TERMINAL LOG BACKGROUND */}
        <View style={styles.terminalBg}>
          {logs.map((log, idx) => (
            <Animated.Text entering={FadeIn} key={idx} style={styles.logText}>
              {log}
            </Animated.Text>
          ))}
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
          style={StyleSheet.absoluteFill}
        />

        {/* SYSTEM STATUS OVERLAY */}
        <View style={styles.content}>
          <Animated.View style={[styles.alertBox, alertStyle]}>
            <Text style={styles.alertTitle}>SYSTEM INTRUSION DETECTED</Text>
            <Text style={styles.alertSubtitle}>ENCRYPTION BYPASS REQUIRED</Text>
          </Animated.View>

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>ENTROPY</Text>
              <Text style={styles.metricValue}>0.942 bits</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>THREAT LVL</Text>
              <Text style={[styles.metricValue, { color: AuraColors.alertRed }]}>CRITICAL</Text>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.glitchContainer}>
             <Text style={styles.glitchText}>BYPASS SYSTEM</Text>
          </View>
          <Text style={styles.footerInstruction}>SWIPE UP TO OVERRIDE KERNEL</Text>
        </View>

      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AuraColors.matrixDark,
  },
  terminalBg: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    height: '50%',
  },
  logText: {
    fontFamily: Fonts.tech,
    color: AuraColors.terminalGreen,
    fontSize: 10,
    lineHeight: 18,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  alertBox: {
    padding: 24,
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  alertTitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.alertRed,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  alertSubtitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 10,
    marginTop: 8,
    letterSpacing: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 30,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 8,
    letterSpacing: 1,
  },
  metricValue: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  glitchContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: AuraColors.terminalGreen,
    marginBottom: 20,
  },
  glitchText: {
    fontFamily: Fonts.tech,
    color: AuraColors.terminalGreen,
    fontSize: 14,
    letterSpacing: 4,
  },
  footerInstruction: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    letterSpacing: 1,
  }
});
