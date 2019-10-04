import React, { useState, useEffect } from 'react';
import { 
    View, 
    KeyboardAvoidingView, 
    AsyncStorage,
    Image, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity 
} from 'react-native';
import logo from '../assets/logo.png'
import api from '../services/api'
// import { Container } from './styles'; // enabled={Platform.OS === "ios"} 

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(()=> {
        AsyncStorage.getItem('usuario').then(usuario => {
            if (usuario)
                navigation.navigate('Listagem')
        })
    }, [])

    async function handleSubmit(){
        const resposta = await api.post('/sessions',{ email })
        const {_id} = resposta.data
        await AsyncStorage.setItem('usuario', _id)
        await AsyncStorage.setItem('tecnologias',techs)
        navigation.navigate('Listagem')
    }

    return (
        <KeyboardAvoidingView behavior="padding"  style={styles.container}>
            <Image source={logo}/>
            <View style={styles.form}>
                <Text style={styles.label}> EMAIL* </Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor= "#999"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}> TECNOLOGIAS </Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor= "#999"
                    autoCorrect={false}
                    autoCapitalize="words"
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}> Encontrar spots </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView> 
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    label:{
        fontWeight:'bold',
        color:'#444',
        marginBottom:8,
    },
    form:{
        paddingHorizontal:30,
        marginTop:30,
        alignSelf:'stretch',
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        paddingHorizontal:20,
        fontSize:16,
        color:"#444",
        height:44,
        marginBottom:20,
        borderRadius:2
    },
    button:{
        height:42,
        backgroundColor:'#f05a5b',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:2,
    },
    buttonText:{
        fontSize:14,
        fontWeight:'bold',
        color:'#fff'
    }
}) 