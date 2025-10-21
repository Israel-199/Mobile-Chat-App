import React from 'react';
import { View, Dimensions, Platform, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenWrapperProps } from '@/types';
import { colors } from '@/constants/theme';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({
  style,
  children,
  showPattern = false,
  isModal = false,
  bgOpacity = 1,
}: ScreenWrapperProps) => {

  // Adjust padding based on modal state
  let paddingTop = Platform.OS === 'ios' ? height * 0.01 : StatusBar.currentHeight || 20;
  let paddingBottom = 0;

  if (isModal) {
    paddingTop = Platform.OS === 'ios' ? height * 0.06 : 30;
    paddingBottom = height * 0.02;
  }

  return (
    <ImageBackground
      source={require('../assets/images/bgPattern.png')}
      style={{
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,
      }}
      imageStyle={{
        opacity: showPattern ? bgOpacity : 0,
        resizeMode: 'cover',
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View
          style={[
            {
              flex: 1,
              paddingTop,
              paddingBottom,
            },
            style,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ScreenWrapper;
