import React from 'react'
import { useParams } from 'react-router'
import Navbar from '../components/Navbar'
import {Container, Typography} from '@material-ui/core'
import { capitalize } from '@material-ui/core'
import Game from '../components/game/Game'
import Footer from "../components/Footer"

const GameScreen = () => {
    const {name} = useParams()
    return (
        <div style={{minHeight: "100vh", display:"grid",  gridTemplateRows: "auto 1fr auto"}}>
          <Navbar />
          <Container>
            <Game name={name}/>
          </Container>
          <Footer/>
        </div>
    )
}

export default GameScreen