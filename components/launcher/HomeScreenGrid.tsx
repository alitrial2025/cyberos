import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { AuraColors, Fonts } from '@/constants/theme';
import { IconSymbol } from '../ui/icon-symbol';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HOME_APPS = [
  { id: 'bruteforce', name: 'BRUTEFORCE', icon: 'lock.open.fill', color: AuraColors.alertRed },
  { id: 'sniffer', name: 'SNIFFER', icon: 'waveform.path.ecg', color: AuraColors.terminalGreen },
  { id: 'exploit', name: 'EXPLOIT', icon: 'bolt.fill', color: AuraColors.cyberpunkYellow },
  { id: 'vpn', name: 'VPN_TUNNEL', icon: 'network', color: AuraColors.neonCyan },
  { id: 'decrypt', name: 'DECRYPTOR', icon: 'key.fill', color: AuraColors.white },
  { id: 'injector', name: 'INJECTOR', icon: 'syringe.fill', color: AuraColors.neonMagenta },
];

export const HomeScreenGrid = () => {
  const router = useRouter();

  const handleAppPress = (appId: string) => {
    router.push(`/apps/${appId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {HOME_APPS.map((app) => (
          <TouchableOpacity 
            key={app.id} 
            style={styles.appItem}
            onPress={() => handleAppPress(app.id)}
          >
            <View style={[styles.appIconContainer, { borderColor: app.color }]}>
              <IconSymbol name={app.icon as any} size={28} color={app.color} />
            </View>
            <Text style={[styles.appName, { color: app.color }]}>{app.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  appItem: {
    alignItems: 'center',
    width: (SCREEN_WIDTH - 100) / 3,
    marginBottom: 20,
  },
  appIconContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0, 
    marginBottom: 8,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  appName: {
    fontFamily: Fonts.tech,
    fontSize: 8,
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
