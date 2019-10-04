import React , {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, Image, AsyncStorage, StyleSheet} from 'react-native';
import logo from '../assets/logo.png'
import SpotLista from '../components/SpotLista'

export default function Listagem() {
    const [techs, setTechs] = useState([])

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
                {techs.map(tech => <SpotLista key={tech} tech={tech}/>)}
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
