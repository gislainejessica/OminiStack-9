import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import camera from '../../assets/camera.svg'
import './styles.css'

export default function NovoSpot({history}) {
	const [empresa, setEmpresa] = useState('')
	const [techs, setTechs] = useState('')
	const [preco, setPreco] = useState('')
	const [imagem, setImagem] = useState(null)

	const preview = useMemo(() =>{
		return imagem ? URL.createObjectURL(imagem) : null
	},[imagem])

	async function handleSubmit(event){
		event.preventDefault()
		const usuario_id = localStorage.getItem('usuario')
		const data = new FormData()
		data.append('imagem', imagem)
		data.append('tecnologias', techs)
		data.append('preco', preco)
		data.append('empresa', empresa)

		await api.post('/spots', data,{
			headers: { usuario_id }
		}) 
		history.push('/dashboard')
	}

	return (
		<form onSubmit={ handleSubmit }>
			<label
			 	id="thumbnail" 
				style={{backgroundImage:`url(${preview})`}}
				className={ imagem ? "tem-imagem" : "" }  
			>
				<input type="file" onChange={event => setImagem(event.target.files[0])}/>
				<img src={ camera } alt="selecionar"/>
			</label>

			<label htmlFor="empresa"> EMPRESA* </label>
			<input 
				id="empresa"
				placeholder="Sua empresa incrivel"
				value={ empresa }
				onChange={ event => setEmpresa(event.target.value) }
			/>
			<label htmlFor="tecnologias"> TECNOLOGIAS* <span> Separadas por vírgula </span> </label>
			<input 
				id="tecnologias"
				placeholder="Quais tecnologias usam?"
				value={ techs }
				onChange={ event => setTechs(event.target.value) }
			/>
			<label htmlFor="preco"> VALOR DA DIÁRIA <span> ( Em branco para Gratuito )  </span></label>
			<input 
				id="preco"
				placeholder="Quanto cobra pela diária?"
				value={ preco }
				onChange={ event => setPreco(event.target.value) }
			/>
			<button className="btn"> Cadastrar </button>
		</form>
	);
}
