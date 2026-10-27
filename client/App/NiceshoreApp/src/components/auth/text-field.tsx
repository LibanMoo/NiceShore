import { useState, type ReactNode, type Ref } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputInstance,
  type TextInputProps,
} from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Space, Type } from '@/constants/design';

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
  icon: IconName;
  /** Colour of the focus ring. Login uses Deep Ocean, Sign Up uses Sky Cyan. */
  focusColor?: string;
  error?: string;
  /** Element shown on the right of the label row, e.g. "Forgot Password?". */
  labelAccessory?: ReactNode;
  /** Adds a show/hide toggle and hides the text by default. */
  password?: boolean;
  ref?: Ref<TextInputInstance>;
};

export function TextField({
  label,
  icon,
  focusColor = Palette.primary,
  error,
  labelAccessory,
  password = false,
  onFocus,
  onBlur,
  ref,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(password);

  const ringColor = error ? Palette.error : focused ? focusColor : 'transparent';

  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {labelAccessory}
      </View>

      <View style={[styles.inputWrap, { borderColor: ringColor }]}>
        <Icon
          name={icon}
          size={22}
          color={error ? Palette.error : Palette.onSurfaceVariant}
          style={styles.leadingIcon}
        />
        <TextInput
          ref={ref}
          {...inputProps}
          secureTextEntry={hidden}
          placeholderTextColor={Palette.outline}
          selectionColor={focusColor}
          cursorColor={focusColor}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, password && styles.inputWithTrailing]}
          accessibilityLabel={label}
        />
        {password && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
            style={styles.trailing}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}>
            {({ pressed }) => (
              <Icon
                name={hidden ? 'visibilityOff' : 'visibility'}
                size={22}
                color={pressed ? Palette.primary : Palette.onSurfaceVariant}
              />
            )}
          </Pressable>
        )}
      </View>

      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const ICON_SIZE = 22;
const ICON_INSET = 14;

const styles = StyleSheet.create({
  field: {
    gap: Space.stackSm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...Type.labelCaps,
    color: Palette.onSurfaceVariant,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.surfaceLow,
    borderRadius: Radius.lg,
    borderWidth: 2,
    minHeight: 52,
  },
  leadingIcon: {
    position: 'absolute',
    left: ICON_INSET,
  },
  input: {
    ...Type.bodyMd,
    flex: 1,
    color: Palette.onSurface,
    paddingVertical: 12,
    paddingLeft: ICON_INSET + ICON_SIZE + 10,
    paddingRight: 16,
    // Removes the browser focus outline on web; we draw our own ring.
    outlineWidth: 0,
  },
  inputWithTrailing: {
    paddingRight: ICON_INSET + ICON_SIZE + 10,
  },
  trailing: {
    position: 'absolute',
    right: ICON_INSET,
  },
  error: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Palette.error,
    paddingLeft: 4,
  },
});
