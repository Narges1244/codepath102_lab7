import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { supabase } from '../supabaseClient'

const COLORS = ['Red','Green','Blue','Purple','Yellow','Orange','Pink','Rainbow']

function CreateCrewmate(){
    const [name, setName] = useState('')
    const [speed, setSpeed] = useState('')
    const [color, setColor] = useState('')
    const navigate = useNavigate() 

    async function handleSubmit(e) {
        e.preventDefault()

        const {error} = await supabase
            .from('crewmates')
            .insert([{name, speed: parseFloat(speed), color}])
        if (error) {
            console.error(error)
            alert('Something went wrong creating your crewmate')
            return 
        }
        navigate('/gallery')
    }
    return(
        <div>
            <h1>Create a New Crewmate</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                    type="text"
                    placeholder="Enter crewmate's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </label>

                <label>
                    Speed (mph):
                    <input
                        type="number"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        required
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
                <button type="submit">Create crewmate</button>
            </form>
        </div>
    )
}
export default CreateCrewmate