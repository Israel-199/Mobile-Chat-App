import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Animated, { FadeIn } from 'react-native-reanimated'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {

  const router = useRouter();

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0}>
     <View style={styles.container}>
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Typo color={colors.white} size={20} fontWeight={'900'}>ChatZone</Typo>
     </View>
      <Animated.Image entering={FadeIn.duration(700).springify()} source={require("../../assets/images/welcome.png")} style={styles.welcomeImage} resizeMode={"contain"}></Animated.Image>
     <View style={{marginBottom:spacingY._35}}>
       <Typo color={colors.white} size={13} fontWeight={"800"}>
        Stay Connected
       </Typo>

       <Typo color={colors.white} size={13} fontWeight={"800"}>
        with your friends
       </Typo>

       <Typo color={colors.white} size={13} fontWeight={"800"}>
        and family
       </Typo>
     </View>
       <Button onPress={()=>{router.push("/(auth)/register")}}><Typo fontWeight={"600"} size={9}>Get Started</Typo></Button>
     </View>
    </ScreenWrapper>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:spacingX._20,
    marginVertical:spacingY._20,
  },
  background:{
    flex:1,
    backgroundColor:colors.neutral900
  },
  welcomeImage:{
    height:verticalScale(130),
    aspectRatio:1,
    alignSelf:"center",
    marginBottom:22
  },
  btnText:{
    fontWeight:"bold",
    fontSize:15,
  },
})

export default Welcome

