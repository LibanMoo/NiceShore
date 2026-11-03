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
      <View style={[styles.tabInner, isFocused && styles.tabActive]}>
        <Icon name={icon} size={24} color={color} />
        <Text style={[styles.label, { color }]}>{children}</Text>
      </View>
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
    backgroundColor: 'rgba(249, 249, 254, 0.85)',
    backdropFilter: 'blur(24px)',
    boxShadow: '0px -8px 32px 0px rgba(0, 51, 102, 0.08)',
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    paddingTop: 8,
    paddingBottom: 20,
  } as object,
  inner: {
    width: '100%',
    maxWidth: 560,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: 'center',
  },
  pressed: {
    transform: [{ scale: 0.92 }],
  },
  tabInner: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: Radius.lg,
  },
  tabActive: {
    backgroundColor: 'rgba(0, 189, 253, 0.2)',
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    marginTop: 4,
  },
});
