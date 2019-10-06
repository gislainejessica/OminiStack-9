import React , { useEffect , useState }from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

export default function Dashboard() {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        async function carregarSpots(){
            const usuario_id = localStorage.getItem('usuario')
            const resposta = await api.get('/dashboard', {
                headers: { usuario_id }
            })
            setSpots(resposta.data)
        }
        carregarSpots()
    }, [])

    return (
        <>
            <ul className='spot-lista'>
                {spots.map(spot=> (
                    <li key={spot._id}>
                        <header style={{backgroundImage :`url(${spot.imagem_url})`}}>
                        </header>
                        <strong>{spot.empresa}</strong>
                        <span>{spot.preco ? `R$${spot.preco}/dia` : 'Gratuito'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/novoSpot">
                <button className='btn'>
                Cadastrar novo Spot
                </button>
            </Link>
        </>
    );
}