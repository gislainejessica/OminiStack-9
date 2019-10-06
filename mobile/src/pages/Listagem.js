import React , { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, Image, AsyncStorage, StyleSheet } from 'react-native';
import socketio from 'socket.io-client'
import logo from '../assets/logo.png'
import SpotLista from '../components/SpotLista'

export default function Listagem() {
    const [techs, setTechs] = useState([])

    useEffect(()=> {
        AsyncStorage.getItem('usuario').then(usuario_id => {
            const socket = socketio('http://192.168.15.8:3333', {query: {usuario_id}})
            socket.on('reserva_resposta', reserva => {
                Alert.alert(`Sua reserva em ${reserva.spot.empresa} em ${reserva.data} foi ${reserva.aprovado ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    },[])

    useEffect(() => {
        AsyncStorage.getItem('tecnologias').then(storagedTechs => {
            const arrayTechs = storagedTechs.split(',').map(tech => tech.trim())
            setTechs(arrayTechs)
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ScrollView> 
                {techs.map(tecnologia => <SpotLista key={tecnologia} tecnologia={tecnologia}/>)}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40, 
    },
    logo:{
        resizeMode:'contain',
        height:32,
        alignSelf:'center',
        marginTop:10,
    }    
})
