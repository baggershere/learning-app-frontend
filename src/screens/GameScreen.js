import React from 'react'
import { useParams } from 'react-router'
import Navbar from '../components/Navbar'
import {Container, Typography} from '@material-ui/core'
import { capitalize } from '@material-ui/core'
import Game from '../components/game/Game'

const GameScreen = () => {
    const {name} = useParams()
    return (
        <React.Fragment>
          <Navbar />
          <Container>
            <Game name={name}/>
          </Container>
        </React.Fragment>
    )
}

export default GameScreen