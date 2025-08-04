import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  FadeInUp,
  SlideInLeft,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const { width } = Dimensions.get("window");

export default function Home() {
  const { user } = useSelector((state: RootState) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);

  type Account = {
    type: string;
    balance: number;
    gradient: [string, string];
  };

  const accounts: Account[] = [
    {
      type: "Current Account",
      balance: user?.currentAccount ?? 0,
      gradient: ["#f8bbd0", "#f48fb1"],
    },
    {
      type: "Savings Account",
      balance: user?.savingsAccount ?? 0,
      gradient: ["#ce93d8", "#ba68c8"],
    },
  ];

  //   const toggleMenu = () => setMenuVisible(!menuVisible);

  const rotation = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const toggleMenu = () => {
    rotation.value = withTiming(menuVisible ? 0 : 180, { duration: 300 });
    setMenuVisible(!menuVisible);
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => menuVisible && setMenuVisible(false)}>
      <LinearGradient
        colors={["#fce4ec", "#f8bbd0", "#f48fb1"]}
        style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.appName}>Flip The Switch 💡</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <Animated.View style={animatedIconStyle}>
              <FontAwesome
                name={menuVisible ? "angle-left" : "bars"}
                size={24}
                color="#d81b60"
              />
            </Animated.View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={toggleMenu}>
            <FontAwesome
              name={menuVisible ? "angle-left" : "bars"}
              size={24}
              color="#d81b60"
            />
          </TouchableOpacity> */}
        </View>

        {menuVisible && (
          <Animated.View
            entering={SlideInLeft}
            exiting={SlideOutLeft}
            style={styles.menuDrawer}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Text style={styles.sectionTitle}>Swipe through your accounts:</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={accounts}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => (
            <Animated.View entering={FadeInUp} style={styles.cardWrapper}>
              <LinearGradient colors={item.gradient} style={styles.accountCard}>
                <Text style={styles.cardTitle}>{item.type}</Text>
                <Text style={styles.cardBalance}>
                  ₦{item.balance.toLocaleString()}
                </Text>
              </LinearGradient>
            </Animated.View>
          )}
        />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ad1457",
  },
  menuDrawer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "66%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",

    padding: 24,
    zIndex: 500,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d81b60",
    marginBottom: 16,
  },
  menuItem: {
    marginBottom: 12,
  },
  menuText: {
    color: "#f06292",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#d81b60",
    marginBottom: 16,
  },
  cardWrapper: {
    marginRight: 16,
  },
  accountCard: {
    width: 288,
    height: 160,
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cardBalance: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
});
