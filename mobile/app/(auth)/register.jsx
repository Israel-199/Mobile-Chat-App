import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY,radius } from '@/constants/theme'
import React from 'react'
import BackButton from "../../components/BackButton"

const register = () => {
  return (
<KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton iconSize={28}/>
        </View>
      </View>
    </ScreenWrapper>
</KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between"
    },
    header:{
        paddingHorizontal:spacingX._20,
        paddingTop:spacingY._15,
        paddingBottom:spacingY._25,
        flowDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    content:{
        flex:1,
        backgroundColor:colors.white,
        borderTopLeftRadius:radius._50,
        borderTopRightRadius:radius._50,
        borderCurve:"continuous",
        paddingHorizontal:spacingX._20,
        paddingTop:spacingY._20
    },
    form:{
        gap:spacingY._15,
        marginTop:spacingY._20
    },
    footer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:"5"
    }
})

export default register