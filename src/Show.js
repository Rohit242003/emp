import axios from "axios";
import { useEffect, useState } from "react";

import { Navigate,Link, useNavigate } from "react-router-dom";

export default function Chart() {
    const [info, setInfo] = useState([]);
    const nav=useNavigate();
    
    useEffect(() => {
        let url = "http://localhost:9000/top-employe";
        axios.get(url)
            .then(res => setInfo(res.data))
            .catch(err => alert(err + "err"));
    }, []);

    
    return (
        <>
            <center>
                
                <h1>employe Details</h1>
                <form>
                    <table border={5}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Salary</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {info.map((e, index) => (
                                <tr key={index} style={{ "textAlign": "center" }}>
                                    <td>{e._id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.salary}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </center>
        </>
    );
}
