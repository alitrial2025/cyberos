// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Partial<Record<string, ComponentProps<typeof MaterialIcons>['name']>>;
type IconSymbolName = Extract<SymbolViewProps['name'], string>;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Essential UI
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'gearshape.fill': 'settings',
  'share.fill': 'share',
  
  // Apps
  'phone.fill': 'phone',
  'message.fill': 'message',
  'camera.fill': 'photo-camera',
  'globe': 'public',
  'brain.fill': 'psychology',
  'bubble.left.and.bubble.right.fill': 'chat',
  'eye.fill': 'visibility',
  'waveform.path.ecg': 'monitor-heart',
  'network': 'hub',
  'lock.fill': 'lock',
  'person.2.fill': 'group',
  'play.tv.fill': 'live-tv',
  
  // CyberOS Specific
  'target': 'gps-fixed',
  'exclamationmark.shield.fill': 'security',
  'lock.open.fill': 'lock-open',
  'bolt.fill': 'bolt',
  'key.fill': 'vpn-key',
  'syringe.fill': 'medication',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name as string]} style={style} />;
}
