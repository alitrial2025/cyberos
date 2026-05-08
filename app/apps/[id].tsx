import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AuraColors, Fonts } from '@/constants/theme';
import { GlassPanel } from '@/components/ui/GlassPanel';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const APP_DATA: Record<string, any> = {
  neural: {
    title: 'NEURAL INTERFACE',
    subtitle: 'COGNITIVE SYNC: 98.4%',
    color: AuraColors.neonCyan,
    icon: 'brain.fill',
    content: [
      { label: 'SYNAPTIC LOAD', value: '12.4 ms', status: 'STABLE' },
      { label: 'CORTICAL DENSITY', value: '0.84', status: 'OPTIMAL' },
      { label: 'NEURAL LINK', value: 'CONNECTED', status: 'ACTIVE' },
    ]
  },
  sensors: {
    title: 'SENSOR ARRAY',
    subtitle: 'ENVIRONMENTAL SCAN ACTIVE',
    color: AuraColors.white,
    icon: 'eye.fill',
    content: [
      { label: 'PROXIMITY', value: '3.2m', status: 'CLEAR' },
      { label: 'RADIATION', value: '0.02 mSv', status: 'LOW' },
      { label: 'AIR QUALITY', value: '99%', status: 'CLEAN' },
    ]
  },
  comms: {
    title: 'COMMUNICATION LINK',
    subtitle: 'ENCRYPTED CHANNEL 7',
    color: AuraColors.white,
    icon: 'bubble.left.and.bubble.right.fill',
    content: [
      { label: 'LATENCY', value: '4ms', status: 'FAST' },
      { label: 'PACKET LOSS', value: '0.00%', status: 'NONE' },
      { label: 'UPLINK', value: '4.2 Gbps', status: 'STRONG' },
    ]
  },
  gateway: {
    title: 'NETWORK GATEWAY',
    subtitle: 'GLOBAL NODE: TOKYO-03',
    color: AuraColors.neonMagenta,
    icon: 'network',
    content: [
      { label: 'VPN', value: 'TUNNEL-X', status: 'SECURE' },
      { label: 'PROXY', value: 'ACTIVE', status: 'ENABLED' },
      { label: 'FIREWALL', value: 'LVL 9', status: 'MAX' },
    ]
  },
  encrypt: {
    title: 'ENCRYPTION ENGINE',
    subtitle: 'AES-1024 QUANTUM',
    color: AuraColors.white,
    icon: 'lock.fill',
    content: [
      { label: 'KEY LENGTH', value: '1024', status: 'SECURE' },
      { label: 'CYPHER', value: 'SHA-Q', status: 'ACTIVE' },
      { label: 'INTEGRITY', value: '100%', status: 'VERIFIED' },
    ]
  },
  stream: {
    title: 'MEDIA STREAM',
    subtitle: '8K NEURAL FEED',
    color: AuraColors.cyberpunkYellow,
    icon: 'play.tv.fill',
    content: [
      { label: 'RESOLUTION', value: '7680x4320', status: 'MAX' },
      { label: 'FPS', value: '120', status: 'FLUID' },
      { label: 'BUFFER', value: '450mb', status: 'READY' },
    ]
  }
};

export default function AppMockup() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const data = APP_DATA[id as string] || APP_DATA.neural;

  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View entering={FadeInRight.delay(100)} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={AuraColors.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{data.title}</Text>
            <Text style={[styles.headerSubtitle, { color: data.color }]}>{data.subtitle}</Text>
          </View>
          <View style={styles.appIconHeader}>
            <IconSymbol name={data.icon} size={24} color={data.color} />
          </View>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Main Hero Card */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <GlassPanel style={styles.heroCard}>
              <View style={styles.heroGlow} />
              <IconSymbol name={data.icon} size={80} color={data.color} />
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroStatus}>SYSTEM STATUS: {data.content[0].status}</Text>
                <Text style={styles.heroValue}>{data.content[0].value}</Text>
                <Text style={styles.heroLabel}>{data.content[0].label}</Text>
              </View>
            </GlassPanel>
          </Animated.View>

          {/* Grid of details */}
          <View style={styles.detailsGrid}>
            {data.content.slice(1).map((item: any, index: number) => (
              <Animated.View key={index} entering={FadeInDown.delay(300 + index * 100)} style={{ flex: 1 }}>
                <GlassPanel style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                  <View style={[styles.statusIndicator, { backgroundColor: item.status === 'OPTIMAL' || item.status === 'SECURE' || item.status === 'FAST' ? '#00FF00' : data.color }]} />
                </GlassPanel>
              </Animated.View>
            ))}
          </View>

          {/* Action Area */}
          <Animated.View entering={FadeInDown.delay(500)} style={styles.actionContainer}>
            <TouchableOpacity style={styles.mainAction}>
              <GlassPanel style={styles.mainActionButton} intensity={60}>
                <Text style={styles.mainActionText}>INITIALIZE SEQUENCE</Text>
              </GlassPanel>
            </TouchableOpacity>
            
            <View style={styles.secondaryActions}>
              <TouchableOpacity style={styles.secondaryAction}>
                <GlassPanel style={styles.secondaryActionButton}>
                  <IconSymbol name="gearshape.fill" size={20} color={AuraColors.white} />
                </GlassPanel>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryAction}>
                <GlassPanel style={styles.secondaryActionButton}>
                  <IconSymbol name="share.fill" size={20} color={AuraColors.white} />
                </GlassPanel>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Decorative Terminal-like output */}
          <Animated.View entering={FadeInDown.delay(600)}>
            <GlassPanel style={styles.terminal}>
              <Text style={styles.terminalText}>[SYS] INITIALIZING {data.title}...</Text>
              <Text style={styles.terminalText}>[SYS] CHECKING INTEGRITY... OK</Text>
              <Text style={styles.terminalText}>[SYS] CONNECTING TO NEURAL MESH... OK</Text>
              <Text style={styles.terminalText}>[SYS] SYNCING DATA... DONE</Text>
              <Text style={styles.terminalText}>[SYS] READY.</Text>
            </GlassPanel>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 16,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontFamily: Fonts.tech,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 2,
  },
  appIconHeader: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  heroCard: {
    height: 200,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 243, 255, 0.1)',
    filter: 'blur(40px)',
  },
  heroTextContainer: {
    alignItems: 'flex-end',
  },
  heroStatus: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 8,
    marginBottom: 8,
  },
  heroValue: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 32,
    fontWeight: '300',
  },
  heroLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  detailItem: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  detailLabel: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 8,
    letterSpacing: 1,
  },
  detailValue: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 14,
  },
  statusIndicator: {
    width: '100%',
    height: 2,
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  mainAction: {
    flex: 1,
  },
  mainActionButton: {
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 243, 255, 0.3)',
  },
  mainActionText: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 12,
    letterSpacing: 2,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryActionButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  terminal: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  terminalText: {
    fontFamily: Fonts.tech,
    color: '#00FF00',
    fontSize: 9,
    lineHeight: 16,
    opacity: 0.7,
  }
});
