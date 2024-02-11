import axios from "axios";
import { useState } from "react";

export default function Add() {
    const [id, setId] = useState("");
    const [name1, setName1] = useState("");
    const [salary, setSalary] = useState("");
    const [msg, setMsg] = useState("");
    
    const hId = (event) => {
        setId(event.target.value);
    }
    
    const hName1 = (event) => {
        setName1(event.target.value);
    }
    
    const hSalary = (event) => {
        setSalary(event.target.value);
    }
    
    const save = (event) => {
        event.preventDefault();
        if(id=="")
        {
            alert("Id is required");
            setSalary("");
            setName1("");
            setMsg("");
        }
        if(salary=="")
        {
            alert("Salary is required");
            setSalary("");
            setName1("");
            setMsg("");
        }
        if(name1=="")
        {
            alert("Name is required");
            setSalary("");
            setName1("");
            setMsg("");
        }
        let url = "http://localhost:9000/save";
        let data = { "id": id, "name1": name1, "salary": salary }; // Corrected property name to match server-side
        axios.post(url, data)
            .then(res => {
                if (res.data.insertedId == id) {
                    setMsg("record created");
                    setId("");
                    setName1("");
                    setSalary("");
                    setTimeout(() => {
                        setMsg("");
                    }, 3000);
                } else {
                    setMsg("record already exists");
                    setId("");
                    setTimeout(() => {
                        setMsg("");
                    }, 3000);
                }
            })
            .catch(err => alert("err" + err));
    }
    
    return (
        <>
            <center>
                <h1>Add page</h1>
                <form onSubmit={save}>
                    <input type="text" placeholder="Enter Employee Id" value={id} onChange={hId}/>
                    <br/><br/>
                    <input type="text" placeholder="Enter Employee Name" value={name1} onChange={hName1}/>
                    <br/><br/>
                    <input type="number" placeholder="Enter Employee Salary" value={salary} onChange={hSalary}/>
                    <br/><br/>
                    <input type="submit" value="Add"/>
                    <br/><br/>
                </form>
                <h2>{msg}</h2>
            </center>
        </>
    )
}
