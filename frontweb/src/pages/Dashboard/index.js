import React , { useEffect , useState , useMemo }from 'react'
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'
import api from '../../services/api'
import './styles.css'

export default function Dashboard() {
    const [spots, setSpots] = useState([])
    const [requisicoes, setRequisicoes] = useState([])

    const usuario_id = localStorage.getItem('usuario')
    const socket = useMemo(() => socketio('http://localhost:3333',{
        query: { usuario_id },
    }), [usuario_id])

    useEffect(()=> {
        socket.on('reserva_requisitada', data => {
            console.log(data)
            setRequisicoes([...requisicoes, data])
        })
    }, [requisicoes, socket])

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

    async function handleAceito(id){
        await api.post(`/reservas/${id}/aprovamento`)
        setRequisicoes(requisicoes.filter(requisicao => requisicao._id !== id))

    }
    async function handleRejeito(id){
        await api.post(`/reservas/${id}/desaprovamento`)
        setRequisicoes(requisicoes.filter(requisicao => requisicao._id !== id))

    }

    return (
        <>
            <ul className="requisicao">
                {requisicoes.map(requisicao => (
                    <li key={requisicao._id}>
                        <p>
                            <strong> {requisicao.usuario.email} </strong> 
                            está solicitando reserva em 
                            <strong> {requisicao.spot.empresa} </strong>
                            para a data: 
                            <strong> {requisicao.data} </strong>
                        </p>
                        <button className="aceito" onClick={()=>{handleAceito(requisicao._id)}}> ACEITAR </button>
                        <button className="rejeito" onClick={()=>{handleRejeito(requisicao._id)}}> REJEITAR </button>
                    </li>
                ))}
            </ul>
            <ul className='spot-lista'>
                {spots.map(spot=> (
                    <li key={spot._id}>
                        <header style={{ backgroundImage :`url(${spot.imagem_url})` }}>
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