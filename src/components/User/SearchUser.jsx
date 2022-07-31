import React, { useState } from 'react'
import axios from 'axios'
import './searchuser.css'


const SearchUser = () => {
    const [searchText, setSearchText] = useState('');
    const [playerStatus, setPlayerStatus] = useState({});


    const API_KEY = "your_api_key";


    const searchPlayer = (event) => {
        if (searchText == false || playerStatus == null) {
            alert('Input a name!');
        }else {
            let ApiCall = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}/?api_key=${API_KEY}`

            axios.get(ApiCall).then(function (response) {
                const data = response.data
                setPlayerStatus(data);
            }).catch(err => { 
                alert('User was not found')             
            })
        }
    }

    const profileUrl = `http://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${playerStatus.profileIconId}.png`

    return (
        <>
            <div className="container">
                <div className="box">
                    <h2>League Of Legends Player Status</h2>
                    <input type="text" placeholder='Name' onChange={e => setSearchText(e.target.value)} className='inputSearch' />
                    <button onClick={e => searchPlayer(e)} className='btnSearch'>Search for player</button>

                </div>
            </div>
            <div className="playerStatus">
                {
                    JSON.stringify(playerStatus) != '{}' ?

                        <>
                            <div className="contentPlayer">
                                <p>Player searched</p>
                                <img src={profileUrl} alt="Icon Profile" className='profileIcon' />
                                <span>Name: {playerStatus.name}</span>
                                <span>Level: {playerStatus.summonerLevel}</span>
                            </div>
                        </>

                        :

                        <>

                            <p>No data...</p>

                        </>
                }
            </div>
        </>
    )
}

export default SearchUser