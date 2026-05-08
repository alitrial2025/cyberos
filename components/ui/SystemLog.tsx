import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuraColors, Fonts } from '@/constants/theme';

const LOG_MESSAGES = [
  '[OK] KERNEL_LOADED',
  '[OK] MESH_NET_CONNECTED',
  '[OK] ENCRYPTION_ACTIVE: AES-256',
  '[OK] FIREWALL_STABLE',
  '[WARN] HIGH_LATENCY_NODE_04',
  '[OK] VPN_TUNNEL_ESTABLISHED',
  '[INFO] SCANNING_PERIPHERALS',
  '[INFO] NEURAL_SYNC_OPTIMIZED',
  '[OK] PROXY_ROTATED',
  '[INFO] CLEANING_TEMP_BUFFER',
];

export const SystemLog = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const log = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setLogs(prev => [log, ...prev.slice(0, 3)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {logs.map((log, i) => (
        <Text key={i} style={[styles.logText, { opacity: 1 - i * 0.25 }]}>
          {log}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
  logText: {
    fontFamily: Fonts.tech,
    color: AuraColors.terminalGreen,
    fontSize: 8,
    letterSpacing: 1,
    marginBottom: 4,
  },
});
