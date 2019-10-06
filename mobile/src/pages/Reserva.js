import React, { useState } from 'react';
import { SafeAreaView, AsyncStorage,Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../services/api'
// import { Container } from './styles';

export default function Reserva({ navigation }) {
	const id = navigation.getParam('id') 
	const [data, setData] = useState('')

	async function handleSubmit(){
		const usuario_id = await AsyncStorage.getItem('user')
		await api.post(`/spots/${id}/reserva`, { data },{ headers: { usuario_id } })
		Alert.alert('Solicitação de reserva enviada')
		navigation.navigate('Listagem')
	}
	function handleCancel(){
		navigation.navigate('Listagem')
	}
    return (
        <SafeAreaView style={styles.container}>
			<Text style={styles.label}> DATA DE INTERESSE* </Text>
			<TextInput 
                    style={styles.input}
                    placeholder="Data para a reserva"
                    placeholderTextColor= "#999"
                    autoCorrect={false}
                    autoCapitalize="words"
                    value={data}
                    onChangeText={setData}
            />
			<TouchableOpacity onPress={handleSubmit} style={styles.button}>
				<Text style={styles.buttonText}> Solicitar reservas </Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
				<Text style={styles.buttonText}> Cancelar </Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingTop: 30,
		margin:30
	},
	label:{
        fontWeight:'bold',
        color:'#444',
        marginBottom:8,
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
	cancelButton:{
		marginTop:10,
        backgroundColor:'#ccc',
	},
    buttonText:{
        fontSize:14,
        fontWeight:'bold',
        color:'#fff' 
    }
})
