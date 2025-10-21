import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable, Alert } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY, radius } from '@/constants/theme'
import BackButton from "../../components/BackButton"
import Input from '../../components/Input'
import * as Icons from 'phosphor-react-native';
import { verticalScale } from '@/utils/styling';
import { useRef ,useState} from 'react'
import { useRouter } from 'expo-router'
import Button from '@/components/Button'
import { useAuth } from '../../context/authContext'


const Login = () => {

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  const {signIn}=useAuth();

  const handleSubmit = async() =>{
   if(!emailInputRef.current || !passwordInputRef.current ){
    Alert.alert("Please fill all the fields");
    return;
   }
     try {
    setIsLoading(true);
    await signIn({
      email: emailInputRef.current,
      password: passwordInputRef.current
    });
  } catch (error) {
    Alert.alert("Error", "Failed to login");
  } finally {
    setIsLoading(false);
  }
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenWrapper style={{ flex: 1, backgroundColor: colors.neutral900 }} showPattern={true}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <BackButton iconSize={14} />
              <Typo size={8} color={colors.white} style={styles.helpText}>
               Forgot your password?
              </Typo>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
              <View style={{gap: "5",marginBottom: spacingY._15}}>
                <Typo size={13} fontWeight="600">
                  Welcome back
                </Typo>
                <Typo size={8} color={colors.neutral600}>
                  we are happy to see you again!
                </Typo>
              </View>
               <Input placeholder="Enter your email" onChangeText={(value:string) => emailInputRef.current=value} icon={<Icons.Envelope size={"22"} color={colors.neutral600} />} />
               <Input placeholder="Enter your password" secureTextEntry={true} onChangeText={(value:string) => passwordInputRef.current=value} icon={<Icons.Lock size={"22"} color={colors.neutral600} />} />
               <View style={{marginTop:spacingY._20, gap:spacingY._10}}>
                <Button loading={isloading} onPress={handleSubmit}>
                  <Typo size={8} fontWeight={"bold"} color={colors.black}>Login</Typo>
                </Button>
                <View style={styles.footer}>
                  <Typo size={7} style={{marginRight:2}}>Don't have an account?</Typo>
                  <Pressable onPress={() => router.push("/(auth)/register")}>
                  <Typo size={7} fontWeight={"bold"} color={colors.primaryDark}>
                    Sign Up
                  </Typo>
                </Pressable> 
                </View>
               </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._11,
    paddingBottom: spacingY._20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  helpText: {
    marginLeft: 141, 
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._20,
    borderTopRightRadius: radius._20,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },
  footer:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
  }
})

export default Login
