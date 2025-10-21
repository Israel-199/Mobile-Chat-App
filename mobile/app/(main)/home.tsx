import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useAuth } from '@/context/authContext'

const Home = () => {
  const {user,signOut}=useAuth();

  const handleLogout = async ()=>{
   await signOut();
  }

  return (
    <ScreenWrapper>
      <Typo color={colors.white}>Home</Typo>
      <Button onPress={handleLogout}>
        <Typo size={8}>Logout</Typo>
      </Button>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})