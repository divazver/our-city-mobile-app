/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { ColorsOld } from '@/constants/Colors-old';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof ColorsOld.light & keyof typeof ColorsOld.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return ColorsOld[theme][colorName];
  }
}
