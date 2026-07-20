import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const COLORS = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow']

function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [speed, setSpeed] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    fetchCrewmate()
  }, [id])

  async function fetchCrewmate() {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error(error)
      return
    }
    setName(data.name)
    setSpeed(data.speed)
    setColor(data.color)
  }

  async function handleUpdate(e) {
    e.preventDefault()
    const { error } = await supabase
      .from('crewmates')
      .update({ name, speed: parseFloat(speed), color })
      .eq('id', id)

    if (error) console.error(error)
    else fetchCrewmate() // re-fetch so the form shows the saved changes
  }

  async function handleDelete() {
    const { error } = await supabase.from('crewmates').delete().eq('id', id)
    if (error) console.error(error)
    else navigate('/gallery')
  }

  return (
    <div>
      <h1>Update Your Crewmate :)</h1>
      <p>Current Crewmate Info: Name: {name}, Speed: {speed}, Color: {color}</p>

      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Speed (mph):
          <input
            type="number"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </label>

        <fieldset>
          <legend>Color:</legend>
          {COLORS.map((c) => (
            <label key={c}>
              <input
                type="radio"
                name="color"
                value={c}
                checked={color === c}
                onChange={(e) => setColor(e.target.value)}
              />
              {c}
            </label>
          ))}
        </fieldset>

        <button type="submit">Update Crewmate</button>
      </form>
      <button onClick={handleDelete}>Delete Crewmate</button>
    </div>
  )
}

export default EditCrewmate