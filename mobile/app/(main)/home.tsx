import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/context/authContext'
import * as Icon from 'phosphor-react-native'
import { verticalScale } from '@/utils/styling'

const Home = () => {
  const {user,signOut}=useAuth();

  const handleLogout = async ()=>{
   await signOut();
  }

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5} >
       <View style={styles.container}>
          <View style={styles.header}>
            <View style={{flex:1}}>
              <Typo color={colors.neutral200} size={15} textProps={{numberOfLines:1}}>Welcome back, <Typo size={16} color={colors.white} fontWeight={"800"}>{user?.name}</Typo>👋</Typo>
            </View>
            <TouchableOpacity style={styles.settingIcon} onPress={()=>{}}>
              <Icon.GearSixIcon color={colors.white} weight='fill' size={verticalScale(22)}/>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            
          </View>
       </View>

    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
     flex:1,
  },
  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:spacingX._20,
    gap:spacingY._15,
    paddingTop:spacingY._15,
    paddingBottom:spacingY._20,
  },
  settingIcon:{
    padding:spacingY._10,
    backgroundColor:colors.neutral700,
    borderRadius:radius.full,
  },

  row:{
    flex:1,
    backgroundColor:colors.white,
    borderTopLeftRadius:radius._50,
    borderTopRightRadius:radius._50,
    borderCurve:"continuous",
    overflow:"hidden",
    paddingHorizontal:spacingX._20,
  },
  navBar:{
    flexDirection:"row",
    gap:spacingX._15,
    alignItems:"center",
    paddingHorizontal:spacingX._10,
  },
  tabs:{
    flexDirection:"row",
    gap:spacingX._10,
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  tabStyle:{
     paddingVertical:spacingY._10,
     paddingHorizontal:spacingX._20,
     borderRadius:radius.full,
     backgroundColor:colors.neutral100,
  },
  content:{
    borderCurve:"continuous",
    overflow:"hidden",
    paddingHorizontal:spacingX._20
  },
  floatingButton:{
    height:verticalScale(50),
    width:verticalScale(50),
    borderRadius:100,
    position:"absolute",
    bottom:verticalScale(30),
    right:verticalScale(30),
  },
  conversationList:{
    paddingVertical:spacingY._20,
  },
  activeTabStyle:{
    backgroundColor:colors.primaryLight,
  }
})