import * as Device from "expo-device";
import { Platform } from "react-native";

export const isLikelyFaceIDDevice = (): boolean => {
  if (Platform.OS !== "ios") return false;

  const faceIDModels = [
    "iPhone X",
    "iPhone XS",
    "iPhone XS Max",
    "iPhone XR",
    "iPhone 11",
    "iPhone 11 Pro",
    "iPhone 11 Pro Max",
    "iPhone 12",
    "iPhone 12 Mini",
    "iPhone 12 Pro",
    "iPhone 12 Pro Max",
    "iPhone 13",
    "iPhone 13 Mini",
    "iPhone 13 Pro",
    "iPhone 13 Pro Max",
    "iPhone 14",
    "iPhone 14 Plus",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max",
    "iPhone 15",
    "iPhone 15 Plus",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max"
  ];

  return faceIDModels.includes(Device.modelName ?? "");
};
