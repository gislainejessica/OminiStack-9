# Aplicação Mobile - AirCnC: Baseado na ideia do AirBnB

## Prints das telas desenvolvidas

<p align="rigth">
    <img width="260px" src="Login1.png">
     <img width="260px" src="Login2.png">  
     <img width="260px" src="Screenshot (4 de out de 2019 19_39_32).png"><br/>
     <img width="260px" src="Reserva2.png">
     <img width="260px" src="Reserva1.png"><br/>
  
  <h2 align="center">  </h2>
</p>

Se eu atualizo a aplicação volta para o login, pois não tá por padrão memorizado no app, então temos que fazer o seguinte...

=>  Se Usuario estiver logado no sistema

```js
  useEffect(()=> {
        AsyncStorage.getItem('usuario').then(usuario => {
            if (usuario)
                navigation.navigate('Listagem')
        })
    }, [])
```
Templete do useeffect: para entender como funciona esse Hook
```js
 useEffect(() => {
        console.log("Efeito lógica")
        return () => {
            console.log("Limpar alguma variavel do sistema")
        };
    }, ["Dependencias, que farão efeito ser acionado em caso de mudanças"])
```

*  *rnfc* Atalho para criação de componentes funcionais

