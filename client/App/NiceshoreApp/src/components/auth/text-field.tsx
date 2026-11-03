import { useState, type Ref } from 'react';
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
import { FontFamily, Palette, Radius, Shadow, Space, Type } from '@/constants/design';

const ICON_SIZE = 20;
const ICON_INSET = 16;

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
  icon: IconName;
  error?: string;
  /** Helper text under the field. An error replaces it. */
  hint?: string;
  /** Adds a show/hide toggle and hides the text by default. */
  password?: boolean;
  ref?: Ref<TextInputInstance>;
};

export function TextField({
  label,
  icon,
  error,
  hint,
  password = false,
  onFocus,
  onBlur,
  ref,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(password);

  const borderColor = error ? Palette.error : focused ? Palette.secondaryContainer : Palette.outline;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputWrap, focused && styles.inputFocused, { borderColor }]}>
        <Icon
          name={icon}
          size={ICON_SIZE}
          color={error ? Palette.error : Palette.onSurfaceVariant}
          style={styles.leadingIcon}
        />
        <TextInput
          ref={ref}
          {...inputProps}
          secureTextEntry={hidden}
          placeholderTextColor={Palette.placeholder}
          selectionColor={Palette.secondaryContainer}
          cursorColor={Palette.primary}
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
            style={styles.trailing}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}>
            <Icon
              name={hidden ? 'visibility' : 'visibilityOff'}
              size={ICON_SIZE}
              color={Palette.primary}
              accent={Palette.secondaryContainer}
            />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Space.stackSm,
  },
  label: {
    ...Type.labelCaps,
    color: Palette.onSurfaceVariant,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: Palette.sand,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  inputFocused: {
    backgroundColor: Palette.surface,
    boxShadow: Shadow.focus,
  },
  leadingIcon: {
    position: 'absolute',
    left: ICON_INSET,
  },
  input: {
    ...Type.bodyMd,
    flex: 1,
    height: '100%',
    color: Palette.onSurface,
    paddingVertical: 0,
    paddingLeft: 48,
    paddingRight: ICON_INSET,
    // Removes the browser focus outline on web; we draw our own ring.
    outlineWidth: 0,
  },
  inputWithTrailing: {
    paddingRight: 52,
  },
  trailing: {
    position: 'absolute',
    right: 4,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    ...Type.bodySm,
    color: Palette.onSurfaceVariant,
  },
  error: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: Palette.error,
  },
});
