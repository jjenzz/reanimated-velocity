import * as React from "react";
import * as ReactNative from "react-native";
import * as GestureHandler from "react-native-gesture-handler";
import Animated, * as Reanimated from "react-native-reanimated";

export default function App() {
  const [open, setOpen] = React.useState(false);
  const translateY = Reanimated.useSharedValue(0);

  const handleGestureEvent = Reanimated.useAnimatedGestureHandler({
    onActive: (event) => (translateY.value = event.translationY),
    onEnd: (event) => {
      Reanimated.runOnJS(alert)(event.velocityY);
      translateY.value = Reanimated.withSpring(0, null, () => {
        return Reanimated.runOnJS(setOpen)(false);
      });
    },
  });

  const boxStyle = Reanimated.useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureHandler.GestureHandlerRootView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {open && (
        <GestureHandler.PanGestureHandler onGestureEvent={handleGestureEvent}>
          <Animated.View
            style={[
              boxStyle,
              { width: 300, height: 300, backgroundColor: "red" },
            ]}
          />
        </GestureHandler.PanGestureHandler>
      )}
      <ReactNative.Button title="Open" onPress={() => setOpen(true)} />
    </GestureHandler.GestureHandlerRootView>
  );
}
