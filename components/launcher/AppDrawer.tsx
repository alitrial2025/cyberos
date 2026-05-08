import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { GlassPanel } from '../ui/GlassPanel';
import { AuraColors, Fonts } from '@/constants/theme';
import { IconSymbol } from '../ui/icon-symbol';

const MOCK_APPS = [
  { id: '1', name: 'NEURAL', icon: 'brain.fill', category: 'CYBERWARE' },
  { id: '2', name: 'COMMS', icon: 'bubble.left.and.bubble.right.fill', category: 'COMMS' },
  { id: '3', name: 'SENSORS', icon: 'eye.fill', category: 'CYBERWARE' },
  { id: '4', name: 'PULSE', icon: 'waveform.path.ecg', category: 'MEDIA' },
  { id: '5', name: 'GATEWAY', icon: 'network', category: 'CYBERWARE' },
  { id: '6', name: 'ENCRYPT', icon: 'lock.fill', category: 'CYBERWARE' },
  { id: '7', name: 'SOCIAL', icon: 'person.2.fill', category: 'COMMS' },
  { id: '8', name: 'STREAM', icon: 'play.tv.fill', category: 'MEDIA' },
];

const CATEGORIES = ['CYBERWARE', 'COMMS', 'MEDIA'];

export const AppDrawer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI-ORGANIZED NODE CLUSTERS</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {CATEGORIES.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.appGrid}>
              {MOCK_APPS.filter(app => app.category === category).map(app => (
                <TouchableOpacity key={app.id} style={styles.appItem}>
                  <GlassPanel style={styles.appIcon} intensity={30}>
                    <IconSymbol name={app.icon as any} size={24} color={AuraColors.white} />
                  </GlassPanel>
                  <Text style={styles.appName}>{app.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 24,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  appGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  appItem: {
    alignItems: 'center',
    width: 70,
  },
  appIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 8,
  },
  appName: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 10,
    textAlign: 'center',
  },
});
