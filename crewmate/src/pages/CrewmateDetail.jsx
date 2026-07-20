import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function CrewmateDetail() {
  const { id } = useParams() // reads the :id from the URL
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    fetchCrewmate()
  }, [id])

  async function fetchCrewmate() {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single() 

    if (error) console.error(error)
    else setCrewmate(data)
  }

  if (!crewmate) return <p>Loading...</p>

  return (
    <div>
      <h1>Crewmate: {crewmate.name}</h1>
      <h2>Stats:</h2>
      <p>Color: {crewmate.color}</p>
      <p>Speed: {crewmate.speed} mph</p>

      {crewmate.speed < 3 && (
        <p>You may want to find a Crewmate with more speed, this one is kind of slow 😅</p>
      )}

      <Link to={`/crewmate/${crewmate.id}/edit`}>
        <button>Wanna edit this Crewmate?</button>
      </Link>
    </div>
  )
}

export default CrewmateDetail