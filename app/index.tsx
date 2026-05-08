import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useDerivedValue,
  useAnimatedProps,
  withSpring, 
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  runOnJS,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { AuraColors, Fonts } from '@/constants/theme';
import { GlitchText } from '@/components/ui/GlitchText';
import { HexOverlay } from '@/components/ui/HexOverlay';
import { CyberScanner } from '@/components/ui/CyberScanner';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedText = Animated.createAnimatedComponent(Text);

const LOG_MESSAGES = [
  "[SYS] KERNEL BOOT: v4.0.1-SECURE",
  "[NET] PROBING 192.168.1.1...",
  "[SEC] RSA-4096 HANDSHAKE...",
  "[SYS] BUFFER OVERFLOW DETECTED",
  "[SEC] BYPASSING FIREWALL...",
  "[SYS] EXPLOITING HEAP...",
  "[NET] SPOOFING MAC...",
  "[SEC] HANDSHAKE CAPTURED",
  "[SEC] DECRYPTING SHA-256...",
  "[SYS] ACCESS_RESTRICTED",
];

export default function LockScreen() {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  const unlockProgress = useSharedValue(0);
  const scanPulse = useSharedValue(0);

  const scanTop = useDerivedValue(() => scanPulse.value * 200);
  const progressStyle = useAnimatedStyle(() => ({
    width: `${unlockProgress.value * 100}%`,
  }));

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(unlockProgress.value * 100)}%`,
    } as any;
  });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-12), LOG_MESSAGES[i % LOG_MESSAGES.length]]);
      i++;
    }, 500);

    scanPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY < 0) {
        unlockProgress.value = Math.min(1, Math.abs(e.translationY) / (SCREEN_HEIGHT * 0.4));
      }
    })
    .onEnd((e) => {
      if (e.velocityY < -500 || unlockProgress.value > 0.8) {
        runOnJS(setIsDecrypting)(true);
        unlockProgress.value = withTiming(1, { duration: 1000 }, () => {
          runOnJS(router.replace)('/home');
        });
      } else {
        unlockProgress.value = withSpring(0);
      }
    });

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(unlockProgress.value, [0, 0.8], [1, 0]),
    transform: [{ scale: interpolate(unlockProgress.value, [0, 1], [1, 0.9]) }]
  }));

  const decryptStyle = useAnimatedStyle(() => ({
    opacity: interpolate(unlockProgress.value, [0.2, 0.9], [0, 1]),
    transform: [{ translateY: interpolate(unlockProgress.value, [0, 1], [20, 0]) }]
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <StatusBar hidden />
        <HexOverlay />
        
        {/* LOGS LAYER */}
        <View style={styles.terminalBg}>
          {logs.map((log, idx) => (
            <Text key={idx} style={styles.logText}>{log}</Text>
          ))}
        </View>
        
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent', '#000']}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View style={[styles.mainContent, contentStyle]}>
          {/* FACE ID / BIOMETRIC SCANNER AREA */}
          <View style={styles.scannerWrapper}>
            <CyberScanner size={200} color={AuraColors.neonCyan} />
            <Animated.View style={[styles.scanLine, { 
              top: scanTop 
            }]} />
            <Text style={styles.scannerLabel}>BIOMETRIC ID REQUIRED</Text>
          </View>

          <View style={styles.alertContainer}>
            <GlitchText 
              text="SYSTEM INTRUSION DETECTED" 
              style={styles.alertTitle} 
            />
            <Text style={styles.alertSubtitle}>PROTOCOL: OVERRIDE_REQUIRED</Text>
          </View>

          <View style={styles.metricsRow}>
            <Metric label="THREAT" value="CRITICAL" color={AuraColors.alertRed} />
            <Metric label="ENTROPY" value="0.992" />
            <Metric label="UPTIME" value="04:12:01" />
          </View>
        </Animated.View>

        {/* DECRYPTING OVERLAY */}
        <Animated.View pointerEvents="none" style={[styles.decryptingOverlay, decryptStyle]}>
           <Text style={styles.decryptingText}>
             {isDecrypting ? "KERNEL BYPASSED" : "DECRYPTING KERNEL..."}
           </Text>
           <View style={styles.progressBar}>
             <Animated.View style={[styles.progressFill, progressStyle]} />
           </View>
           <AnimatedText 
             animatedProps={animatedTextProps} 
             style={styles.progressPercent}
           />
        </Animated.View>

        {/* FOOTER */}
        <Animated.View style={[styles.footer, contentStyle]}>
          <View style={styles.swipeHintContainer}>
            <Animated.View style={styles.arrow} />
            <Text style={styles.footerInstruction}>SWIPE UP TO INITIATE EXPLOIT</Text>
          </View>
        </Animated.View>

      </View>
    </GestureDetector>
  );
}

function Metric({ label, value, color = AuraColors.white }: any) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  terminalBg: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    height: 300,
  },
  logText: {
    fontFamily: Fonts.tech,
    color: AuraColors.terminalGreen,
    fontSize: 9,
    lineHeight: 16,
    opacity: 0.5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  scannerWrapper: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: AuraColors.neonCyan,
    shadowColor: AuraColors.neonCyan,
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
  scannerLabel: {
    position: 'absolute',
    bottom: -30,
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    letterSpacing: 2,
  },
  alertContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  alertTitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.alertRed,
    fontSize: 20,
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
    opacity: 0.8,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 25,
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
    fontSize: 12,
    marginTop: 4,
  },
  decryptingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  decryptingText: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 18,
    letterSpacing: 4,
    marginBottom: 20,
  },
  progressBar: {
    width: '60%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: AuraColors.neonCyan,
  },
  progressPercent: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  swipeHintContainer: {
    alignItems: 'center',
  },
  footerInstruction: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 10,
  },
  arrow: {
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: AuraColors.neonCyan,
    transform: [{ rotate: '45deg' }],
    opacity: 0.6,
  }
});
