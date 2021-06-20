import { makeStyles } from '@material-ui/core'
import React from 'react'
import ListTitle from './ListTitle'
import DisplayGrid from './DisplayGrid'

const useStyles = makeStyles(()=> {
    return ({
        background: {
            background: '#EEE2DC'
        }
    })
})
const GameList = () => {
    const classes = useStyles()
    return (
        <div className={classes.background}>
            <ListTitle />
            <DisplayGrid />
        </div>
    )
}

export default GameList
