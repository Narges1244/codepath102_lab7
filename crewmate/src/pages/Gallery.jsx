import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase} from '../supabaseClient'

function Gallery() {
    const [crewmates, setCrewmates] = useState([])
    const [loading, setLoading] = useState(true)
    const COLOR_MAP = {
        Red: '#ff4d4d',
        Green: '#4dff88',
        Blue: '#4d94ff',
        Purple: '#b84dff',
        Yellow: '#ffea4d',
        Orange: '#ff9d4d',
        Pink: '#ff4dc4',
        Rainbow: 'linear-gradient(90deg, red, orange, yellow, green, blue, violet)',
      }

    useEffect(() =>{
        fetchCrewmates()
    }, [])
    async function fetchCrewmates(){

        const {data, error } = await supabase
            .from('crewmates')
            .select('*')
            .order('created_at', {ascending: false })
        if (error) console.error(error)
        else setCrewmates(data)
        setLoading(false)
    }
    if (crewmates.length === 0){
        return(
            <div>
                <h1>Your Crewmate Gallery!</h1>
                <p>You haven't made a crewmate yet!</p>
                <Link to="/create">Create one here!</Link>
            </div>
        )
    }
    return(
        <div>
            <h1>Your Crewmate Gallery!</h1>
            <div className="gallery-grid">
                {crewmates.map((c) =>(
                    <div key={c.id} className="crewmate-card"
                        style={{ '--card-glow': COLOR_MAP[c.color] || 'rgba(255,255,255,0.08)' }}>
                        <Link to={`/crewmate/${c.id}`}>
                            <p>Name of Crewmate: {c.name}</p>
                            <p>Speed of Crewmate: {c.speed}</p>
                            <p>Color of Crewmate:{c.color}</p>
                        </Link>
                        <Link to={`/crewmate/${c.id}/edit`}>
                            <button>Edit Crewmate</button>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    )

}

export default Gallery