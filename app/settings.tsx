import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { AuraColors, Fonts } from '@/constants/theme';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { HexOverlay } from '@/components/ui/HexOverlay';

export default function SettingsScreen() {
  const router = useRouter();
  const [neuralSync, setNeuralSync] = React.useState(true);
  const [stealthMode, setStealthMode] = React.useState(false);
  const [autoDecrypt, setAutoDecrypt] = React.useState(true);

  return (
    <View style={styles.container}>
      <HexOverlay />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={AuraColors.neonCyan} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SYSTEM CONFIG</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Section title="NEURAL INTERFACE">
          <SettingItem 
            label="Neural Synchronization" 
            value={neuralSync} 
            onValueChange={setNeuralSync}
            description="Optimize brain-to-kernel latency for faster app switching."
          />
          <SettingItem 
            label="Synaptic Feedback" 
            value={true} 
            disabled 
            description="Haptic responses for neural handshakes."
          />
        </Section>

        <Section title="SECURITY PROTOCOLS">
          <SettingItem 
            label="Stealth Mode" 
            value={stealthMode} 
            onValueChange={setStealthMode}
            description="Hide active node presence from external network probes."
          />
          <SettingItem 
            label="Auto-Decrypt Kernel" 
            value={autoDecrypt} 
            onValueChange={setAutoDecrypt}
            description="Bypass lock screen when biometric signature is cached."
          />
        </Section>

        <Section title="SYSTEM INTEGRITY">
          <GlassPanel style={styles.statusPanel}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>KERNEL VERSION</Text>
              <Text style={styles.statusValue}>4.0.1-SECURE</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>ENCRYPTION</Text>
              <Text style={[styles.statusValue, { color: AuraColors.neonCyan }]}>AES-4096-QUANTUM</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>UPTIME</Text>
              <Text style={styles.statusValue}>142:22:04</Text>
            </View>
          </GlassPanel>
        </Section>

        <TouchableOpacity style={styles.purgeButton}>
          <Text style={styles.purgeText}>PURGE SYSTEM CACHE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function SettingItem({ label, value, onValueChange, description, disabled }: any) {
  return (
    <GlassPanel style={[styles.settingItem, disabled && { opacity: 0.5 }]}>
      <View style={styles.settingMain}>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingLabel}>{label}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
        <Switch 
          value={value} 
          onValueChange={onValueChange}
          trackColor={{ false: '#1a1a1a', true: AuraColors.neonCyan }}
          thumbColor={value ? '#fff' : '#444'}
          disabled={disabled}
        />
      </View>
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 243, 255, 0.1)',
  },
  headerTitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 18,
    letterSpacing: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 15,
    opacity: 0.8,
  },
  settingItem: {
    marginBottom: 10,
    padding: 16,
  },
  settingMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    lineHeight: 14,
  },
  statusPanel: {
    padding: 20,
    gap: 15,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
  },
  statusValue: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 10,
  },
  purgeButton: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: AuraColors.alertRed,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 62, 62, 0.05)',
  },
  purgeText: {
    fontFamily: Fonts.tech,
    color: AuraColors.alertRed,
    fontSize: 12,
    letterSpacing: 2,
  },
});
