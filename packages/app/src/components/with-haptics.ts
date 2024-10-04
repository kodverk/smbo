import * as Haptics from "expo-haptics";

type Haptic = "error" | "warn" | "success" | "soft";

const hapticMap: Record<Haptic, () => Promise<void>> = {
  success: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  warn: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  soft: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
};

export function withHaptics<TCallback extends (...args: any[]) => any>(
  type: Haptic,
  callback: TCallback,
) {
  const triggerHaptic = hapticMap[type];

  return (...args: Parameters<TCallback>) => {
    triggerHaptic();
    return callback(...args);
  };
}
