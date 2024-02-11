import axios from "axios";
import { useState } from "react";

export default function Delete() {
    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");

    const hId = (event) => {
        setId(event.target.value);
    }

    const del = (event) => {
        event.preventDefault();
        if(id=="")
        {
            alert("Id is required");
        }
        let url = `http://localhost:9000/delete/${id}`; // Adjust the URL for deleting records
        axios.delete(url)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setMsg("Record deleted");
                    setId("");
                } else {
                    setMsg("Record not found");
                }
                setTimeout(() => {
                    setMsg("");
                }, 3000);
            })
            .catch(err => alert("Error: " + err));
    }

    return (
        <center>
            <h1>Delete page</h1>
            <form onSubmit={del}>
                <input type="text" placeholder="Enter employee Id" value={id} onChange={hId} />
                <br/><br/>
                <input type="submit" value="Delete" />
                <br/><br/>
            </form>
            <h2>{msg}</h2>
        </center>
    );
}
