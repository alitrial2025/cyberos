import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { GlassPanel } from '../ui/GlassPanel';
import { AuraColors, Fonts } from '@/constants/theme';
import { IconSymbol } from '../ui/icon-symbol';

export const AICommandBar = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const containerOpacity = useSharedValue(1);

  const handleSubmit = () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    setResponse('');
    setShowResponse(true);

    // Simulate AI Processing
    setTimeout(() => {
      setIsProcessing(false);
      simulateTyping("OPTIMIZING NEURAL PATHWAYS. ALL SYSTEMS OPERATIONAL.");
    }, 1500);
  };

  const simulateTyping = (text: string) => {
    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      current += text[i];
      setResponse(current);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowResponse(false);
          setQuery('');
        }, 3000);
      }
    }, 50);
  };

  return (
    <View style={styles.container}>
      {showResponse && (
        <GlassPanel style={styles.responsePanel} intensity={60}>
          <Text style={styles.responseText}>
            {isProcessing ? "PROCESSING..." : `> ${response}`}
          </Text>
        </GlassPanel>
      )}
      
      <GlassPanel style={styles.barContainer} intensity={50}>
        <View style={styles.inputWrapper}>
          <IconSymbol name="sparkles" size={20} color={AuraColors.neonCyan} />
          <TextInput
            style={styles.input}
            placeholder="SYSTEM COMMAND..."
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            autoCorrect={false}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <IconSymbol name="arrow.right.circle.fill" size={24} color={AuraColors.neonCyan} />
          </TouchableOpacity>
        </View>
      </GlassPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 12,
  },
  barContainer: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.tech,
    color: AuraColors.white,
    fontSize: 14,
    height: '100%',
  },
  responsePanel: {
    padding: 16,
    borderRadius: 20,
    minHeight: 60,
    justifyContent: 'center',
  },
  responseText: {
    fontFamily: Fonts.tech,
    color: AuraColors.neonCyan,
    fontSize: 12,
    letterSpacing: 1,
  },
});
