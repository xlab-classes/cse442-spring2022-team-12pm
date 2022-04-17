import React, {useState} from 'react';
import './search.css'
import {useNavigate} from "react-router-dom"
import Axios from 'axios'

function SearchPage(){
    let navigate = useNavigate();
    let username=localStorage.setItem("SearchUser",'');
    let birth=localStorage.setItem("SearchBirth",'');
    let email=localStorage.setItem("SearchEmail",'');
    
    const [input,setInput] = useState('')
    const searchUser =() =>{
        // http://localhost:3301/search
        // http://cheshire.cse.buffalo.edu:3301/search
        Axios.post('http://cheshire.cse.buffalo.edu:3301/search',{ 
            username : input,
        }).then((res)=>{
            if(res.data.message){
              alert("Username Doesn't Exist");
            }
            else{
                localStorage.setItem("SearchUser",res.data[0].username);
                localStorage.setItem("SearchBirth",res.data[0].birthday);
                localStorage.setItem("SearchEmail",res.data[0].email);
                alert("Show User Profile");
            }
        });
    };
    username = localStorage.getItem("SearchUser");
    birth = localStorage.getItem("SearchBirth");
    email = localStorage.getItem("SearchEmail");
    
    return(
        <div>
            <div class="SearchTitleBox">
                <h class="SearchTitle"><b>Search</b></h>
            </div>
            <div>
                <img class="searchImage" src="./images/searchPage/search.jpg" alt="searchImage"/>
                <img class="searchImage1" src="./images/searchPage/search1.jpg" alt="searchImage1"/>
                <form class="InputSearchUser" >
                    <label for="username">Search For Username: <br></br></label>
                    <input type="text" placeholder="Enter Username" onChange={(e)=>{setInput(e.target.value)}}/>
                    <button class="SearchButton" onClick={searchUser}><b>Search</b></button>
                </form>
                <div class="UserSearchResult">
                    <p class="Username"><b>User Name:</b></p>
                    <div class="showUsername">{<p>{username}</p>}</div>
                    <p class="Birthday"><b>Birthday:</b></p>
                    <div class="showBirthday">{<p>{birth}</p>}</div>
                    <p class="Email"><b>Email:</b></p>
                    <div class="showEmail">{<p>{email}</p>}</div>
                </div>
            </div>
            <button class="Back" onClick={()=>{navigate("/main");}}>
                <b>Back</b>
            </button>
        </div>
    );
}

export default SearchPage;
