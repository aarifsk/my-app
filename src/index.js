import React from 'react';
import { View, Text, Animated, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

export default class animatedView extends React.Component {
  state = {
    shown: false,
    animated: new Animated.Value(0),
  };

  componentDidMount() {
    this.toggleBar();
  }
  toggleBar() {
    const newState = !this.state.shown;
    this.setState({ shown: newState });
    Animated.timing(this.state.animated, {
      toValue: newState ? 1 : 0,
      duration: 500,
    }).start(newState ? this.hideBar() : null);
  }
  hideBar() {
    setTimeout(() => {
      this.toggleBar();
    }, 3000);
  }

  render() {
    return (
        <View>
            <Animated.View
        style={{
          width: screenWidth,
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'black',
          flexDirection: 'row',
          transform: [
            {
              translateY: this.state.animated.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
          ],
        }}
      ><Text>some Text</Text></Animated.View>
        </View>
    );
    }
}