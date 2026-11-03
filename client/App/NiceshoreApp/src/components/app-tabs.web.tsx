import {
  TabList,
  TabSlot,
  TabTrigger,
  Tabs,
  type TabListProps,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { FontFamily, Palette, Radius } from '@/constants/design';

/** Web version of the bottom navigation from the NiceShore design. */
export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <BottomBar>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton icon="explore">Explore</TabButton>
          </TabTrigger>
          <TabTrigger name="saved" href="/saved" asChild>
            <TabButton icon="bookmark">Saved</TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="person">Profile</TabButton>
          </TabTrigger>
        </BottomBar>
      </TabList>
    </Tabs>
  );
}

// Triggers must be direct children of the TabList element, so the bar's
// layout wrappers live inside this component instead.
function BottomBar({ children, style, ...props }: TabListProps) {
  return (
    <View {...props} style={[styles.bar, style]}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

function TabButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: IconName }) {
  const color = isFocused ? Palette.primary : Palette.onSurfaceVariant;
  return (
    <Pressable {...(props as PressableProps)} style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
      <View style={[styles.indicator, isFocused && styles.indicatorActive]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.label, isFocused && styles.labelActive, { color }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    borderTopWidth: 1,
    borderTopColor: Palette.surfaceVariant,
    boxShadow: '0px -10px 25px -5px rgba(0, 51, 102, 0.08)',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 8,
  } as object,
  inner: {
    width: '100%',
    maxWidth: 560,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pressed: {
    transform: [{ scale: 0.92 }],
  },
  indicator: {
    width: 64,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
  },
  indicatorActive: {
    backgroundColor: Palette.primaryFixed,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
  },
  labelActive: {
    fontFamily: FontFamily.bold,
  },
});
