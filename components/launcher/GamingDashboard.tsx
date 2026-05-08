import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GlassPanel } from '../ui/GlassPanel';
import { AuraColors, Fonts } from '@/constants/theme';
import { IconSymbol } from '../ui/icon-symbol';

export const GamingDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TACTICAL HUD :: GAMING OVERLAY</Text>
      
      <View style={styles.statsRow}>
        <StatBox label="CPU FREQ" value="4.2 GHZ" color={AuraColors.neonCyan} />
        <StatBox label="GPU LOAD" value="78%" color={AuraColors.neonMagenta} />
        <StatBox label="TEMP" value="62°C" color={AuraColors.cyberpunkYellow} />
      </View>

      <GlassPanel style={styles.controlPanel}>
        <Text style={styles.panelTitle}>PERFORMANCE PROFILES</Text>
        <View style={styles.buttonRow}>
          <PerformanceButton label="STEALTH" active={false} />
          <PerformanceButton label="BALANCED" active={true} />
          <PerformanceButton label="OVERCLOCK" active={false} />
        </View>
      </GlassPanel>

      <GlassPanel style={styles.networkPanel}>
        <View style={styles.networkHeader}>
          <IconSymbol name="wifi" size={16} color={AuraColors.neonCyan} />
          <Text style={styles.networkText}>LATENCY: 24ms</Text>
        </View>
      </GlassPanel>
    </View>
  );
};

const StatBox = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <GlassPanel style={styles.statBox}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
  </GlassPanel>
);

const PerformanceButton = ({ label, active }: { label: string; active: boolean }) => (
  <TouchableOpacity style={[styles.button, active && styles.buttonActive]}>
    <Text style={[styles.buttonText, active && styles.buttonTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
  },
  header: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 8,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: Fonts.tech,
    fontSize: 14,
    fontWeight: 'bold',
  },
  controlPanel: {
    padding: 20,
  },
  panelTitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 10,
    marginBottom: 16,
    opacity: 0.6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: AuraColors.neonCyan,
    borderColor: AuraColors.neonCyan,
  },
  buttonText: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 8,
  },
  buttonTextActive: {
    color: AuraColors.black,
    fontWeight: 'bold',
  },
  networkPanel: {
    padding: 12,
  },
  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  networkText: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 10,
  },
});
