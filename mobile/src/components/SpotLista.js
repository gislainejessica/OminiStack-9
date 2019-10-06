import React , { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { Image,  View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import api from '../services/api'

// import { Container } from './styles';
// setSpots(espaco)
function SpotLista({ tecnologia, navigation }) {
    const [spots, setSpots] = useState([])

	useEffect(()=> {
		async function loadSpots(){
			const resposta = await api.get('/spots',{ params: { tecnologia } })
			console.log(resposta.data)
			setSpots(resposta.data)          
		}
		loadSpots()
    }, [])
	
	function handleNAvigate(id){
		navigation.navigate('Reserva',{id})
	}

    return (
      <View style={styles.constainer}> 
        <Text style={styles.title}>Empresas que usam => <Text style={styles.bold}>{tecnologia}</Text></Text>
        <FlatList 
          style={styles.list}
          data={spots}
          keyExtractor={spot=> spot._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item})=> (
            <View style={styles.listItem}>
              <Image style={styles.imagem} source={{uri: item.imagem_url}} />
              <Text style={styles.empresa}> {item.empresa} </Text>
              <Text style={styles.preco}> {item.preco ? `R$ ${item.preco}\dia` : 'Grátis'} </Text>
              <TouchableOpacity onPress={() => handleNAvigate(item._id)} style={styles.button}>
                <Text style={styles.buttonText}>
                  Solicitar reserva
                </Text>
              </TouchableOpacity>
            </View> 
          )}
        />
      </View>
      );
  }

  const styles = StyleSheet.create({
    constainer:{
      marginTop:30,
    },
    title:{
      marginBottom:20,
      paddingHorizontal:20,
      fontSize:20,
      color:'#444'
    },
    bold:{
      fontWeight:'bold'
    },
    list:{
      paddingHorizontal:20
    },
    listItem:{
      marginRight:15
    }, 
    imagem:{
      width:200,
      height:120,
      borderRadius:2,
      resizeMode:'cover'
    }, 
    empresa:{
      fontSize:24,
      color:'#333',
      fontWeight:'bold',
      marginTop:10,
    },
    preco:{
      fontSize:15,
      color:'#999',
      marginTop:5,
    },
    button:{
      height:32,
      backgroundColor:'#f05a5b',
      alignItems: 'center',
      justifyContent:'center',
      borderRadius:2,
      marginTop:15
    },
    buttonText:{
      fontSize:15,
      fontWeight:'bold',
      color:'#fff'
  }
})

export default withNavigation(SpotLista)