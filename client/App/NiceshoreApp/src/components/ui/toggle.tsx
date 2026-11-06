import { Pressable, StyleSheet, View } from 'react-native';

import { Palette, Radius } from '@/constants/design';

type ToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel: string;
};

/** On/off switch from the design: Deep Ocean track when on, Outline grey when off. */
export function Toggle({ value, onValueChange, accessibilityLabel }: ToggleProps) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      aria-checked={value}
      style={styles.hit}>
      <View style={[styles.track, { backgroundColor: value ? Palette.primary : Palette.outline }]}>
        <View style={[styles.knob, { left: value ? 24 : 4 }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: 52,
    height: 44,
    justifyContent: 'center',
  },
  track: {
    width: 52,
    height: 32,
    borderRadius: Radius.full,
  },
  knob: {
    position: 'absolute',
    top: 4,
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: Palette.surface,
    boxShadow: '0px 1px 3px 0px rgba(0, 30, 64, 0.3)',
  },
});
