import React, { useState, useRef } from "react";
import { View, Text, FlatList, Animated, TouchableOpacity } from "react-native";
import slides from "../../slides";
import OnBoardingItem from "./OnBoarding/OnBoardingItem";
import Paginator from "./OnBoarding/Paginator";
import styles from "../styles/OnBoarding.style";

export default OnBoarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const onPressGoNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < 3) {
      slidesRef.current.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      navigation.navigate("Home");
    }
  };

  const onPressGoBack = () => {
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      slidesRef.current.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    }
  };

  const onPressGoHome = () => {
    navigation.navigate("Home");
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressGoHome} style={styles.skipButton}>
        <Text style={styles.skipButton.text}>Skip</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <OnBoardingItem item={item} data={slides} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        ></FlatList>
      </View>

      <Paginator data={slides} scrollX={scrollX}></Paginator>

      <View style={styles.navContainer}>
        <TouchableOpacity onPress={onPressGoBack} style={styles.backButton}>
          <Text style={styles.backButton.text}>
            {currentIndex === 0 ? "" : "Back"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressGoNext} style={styles.nextButton}>
          <Text style={styles.nextButton.text}>
            {currentIndex === 2 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};