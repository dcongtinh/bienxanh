import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/styles'

const style = theme => ({
    container: {},
    table: {
        width: 1100
    },
    readyScreen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '-webkit-fill-available'
    },
    cell: {
        width: 24,
        height: 24,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px solid #636e72',
        backgroundColor: '#dfe6e9',
        margin: 0.5
    },
    row: {
        display: 'flex'
    },
    rowWinner: {
        opacity: '.7',
        pointerEvents: 'none'
    },
    button: {
        margin: theme.spacing(1),
        fontSize: 28,
        padding: '4px 24px'
    },
    turn: {
        marginBottom: 8,
        fontSize: 24,
        textAlign: 'center'
    },
    O: {
        color: '#d63031'
    },
    X: {
        color: '#0097e6'
    },
    endgame: {
        backgroundColor: '#d63031',
        color: '#fff',
        margin: 8,
        marginLeft: 0,
        '&:hover': {
            backgroundColor: '#d63031'
        }
    },
    restart: {
        backgroundColor: '#4cd137',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#4cd137'
        }
    }
})

const SIZE = 40
const w = 5

@createIsAuthenticated({
    authRequired: false
})
class Caro extends Component {
    constructor(props) {
        super(props)
        let table = []
        for (let i = 0; i < SIZE; ++i) {
            let row = []
            for (let i = 0; i < SIZE; ++i) row.push('')
            table.push(row)
        }
        this.state = {
            initTable: JSON.parse(JSON.stringify(table)),
            table,
            isStarted: false,
            turn: 'X'
        }
    }
    handleCellClick = (i, j) => {
        let { table, turn } = this.state
        table[i][j] = turn

        this.setState({ table, turn: turn === 'X' ? 'O' : 'X' })
        let minI = Math.max(0, i - w + 1)
        let maxI = Math.min(SIZE - 1, i + w - 1)
        let minJ = Math.max(0, j - w + 1)
        let maxJ = Math.min(SIZE - 1, j + w - 1)

        for (let _i = minI; _i <= maxI; ++_i) {
            for (let _j = minJ; _j <= maxJ; ++_j) {
                let count1 = 0,
                    count2 = 0,
                    count3 = 0,
                    count4 = 0

                for (let k = 0; k < w; ++k) {
                    if (_j + k <= maxJ) count1 += table[_i][_j + k] === turn

                    if (_i + k <= maxI) count2 += table[_i + k][_j] === turn

                    if (_i + k <= maxI && _j + k <= maxJ)
                        count3 += table[_i + k][_j + k] === turn

                    if (_i + k <= maxI && _j - k >= minJ)
                        count4 += table[_i + k][_j - k] === turn
                }
                if (
                    count1 === w ||
                    count2 === w ||
                    count3 === w ||
                    count4 === w
                ) {
                    return this.setState({ winner: turn })
                }
            }
        }
    }
    toogleStartButton = () => {
        this.setState({ isStarted: !this.state.isStarted })
    }
    restart = () => {
        let table = JSON.parse(JSON.stringify(this.state.initTable))
        this.setState({ table, turn: 'X', winner: '' })
    }
    endgame = () => {
        this.restart()
        this.setState({ isStarted: false })
    }
    render() {
        let { classes } = this.props
        let { table, turn, isStarted, winner } = this.state
        let array = []
        for (let i = 0; i < SIZE; ++i) array.push(i)
        if (!isStarted)
            return (
                <div className={classes.readyScreen}>
                    <Button
                        onClick={this.toogleStartButton}
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        START
                    </Button>
                </div>
            )
        return (
            <div className={classes.container}>
                <div>
                    <div className={classes.turn + ' ' + classes[turn]}>
                        {turn}
                    </div>
                    <div>Winner is: {winner}</div>
                    <Button
                        variant="contained"
                        onClick={this.endgame}
                        className={classes.endgame}>
                        ENDGAME
                    </Button>
                    <Button
                        variant="contained"
                        onClick={this.restart}
                        className={classes.restart}>
                        RESTART
                    </Button>
                </div>
                <div className={classes.table}>
                    {array.map((item, i) => {
                        return (
                            <div
                                className={
                                    classes.row +
                                    ' ' +
                                    (winner && classes.rowWinner)
                                }>
                                {array.map((item2, j) => {
                                    return (
                                        <div
                                            className={
                                                classes.cell +
                                                ' ' +
                                                classes[table[i][j]]
                                            }
                                            style={{
                                                pointerEvents:
                                                    table[i][j] && 'none'
                                            }}
                                            onClick={() =>
                                                this.handleCellClick(i, j)
                                            }>
                                            {table[i][j]}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withStyles(style)(Caro)
