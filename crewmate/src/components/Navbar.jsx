import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create">Create a Crewmate!</Link>
            <Link to="/gallery">Crewmate Gallery</Link>
        </div>
    )
}
export default Navbar