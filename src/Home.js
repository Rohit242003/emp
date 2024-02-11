import{Link,useNavigate} from "react-router-dom";
import WeatherApp from "./WeatherApp";
import Temp from "./Temp";
export default function Home()
{
    return(
        <>
        <center>
        <h1>Home page</h1>
        <Link to="/" >Home</Link>
        <Link to="/add" >Add</Link>
        <Link to="/update" >Update</Link>
        <Link to="/delete" >Delete</Link>
        <Link to="/show" >Show</Link>
        <Link to="/chart" >Chart</Link>
        <br/><br></br>
        <WeatherApp/>
        <br/><br/>
        <Temp/>
        </center>
        </>
    )
}