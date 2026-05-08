import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
  FadeInLeft, 
  FadeOutRight, 
  Layout, 
  SlideInDown 
} from 'react-native-reanimated';
import { AuraColors, Fonts } from '@/constants/theme';

const THREAT_TYPES = [
  'SQL INJECTION',
  'DDOS ATTACK',
  'BRUTE FORCE',
  'BUFFER OVERFLOW',
  'XSS VULNERABILITY',
  'MALWARE DETECTED',
  'UNAUTHORIZED ACCESS',
  'ROOTKIT ALERT',
];

const LOCATIONS = [
  'SHANGHAI, CN',
  'MOSCOW, RU',
  'FRANKFURT, DE',
  'SAN JOSE, US',
  'TOKYO, JP',
  'LONDON, UK',
];

interface Threat {
  id: string;
  type: string;
  location: string;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  timestamp: string;
}

export const ThreatFeed = () => {
  const [threats, setThreats] = useState<Threat[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat: Threat = {
        id: Math.random().toString(36).substr(2, 9),
        type: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)],
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        severity: Math.random() > 0.7 ? 'CRITICAL' : (Math.random() > 0.4 ? 'HIGH' : 'MEDIUM'),
        timestamp: new Date().toLocaleTimeString(),
      };

      setThreats(prev => [newThreat, ...prev.slice(0, 5)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REAL-TIME THREAT FEED</Text>
      <View style={styles.list}>
        {threats.map((threat) => (
          <Animated.View 
            key={threat.id} 
            entering={FadeInLeft} 
            exiting={FadeOutRight}
            layout={Layout.springify()}
            style={styles.threatCard}
          >
            <View style={[styles.severityDot, { 
              backgroundColor: threat.severity === 'CRITICAL' ? AuraColors.alertRed : 
                               threat.severity === 'HIGH' ? AuraColors.cyberpunkYellow : 
                               AuraColors.neonCyan 
            }]} />
            <View style={styles.threatInfo}>
              <Text style={styles.threatType}>{threat.type}</Text>
              <Text style={styles.threatMeta}>{threat.location} | {threat.timestamp}</Text>
            </View>
            <Text style={[styles.severityText, {
              color: threat.severity === 'CRITICAL' ? AuraColors.alertRed : 
                     threat.severity === 'HIGH' ? AuraColors.cyberpunkYellow : 
                     AuraColors.neonCyan 
            }]}>{threat.severity}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 15,
  },
  list: {
    gap: 10,
  },
  threatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  threatInfo: {
    flex: 1,
  },
  threatType: {
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 12,
  },
  threatMeta: {
    fontFamily: Fonts.tech,
    color: AuraColors.nothingGrey,
    fontSize: 8,
    marginTop: 2,
  },
  severityText: {
    fontFamily: Fonts.tech,
    fontSize: 8,
    fontWeight: 'bold',
  }
});
