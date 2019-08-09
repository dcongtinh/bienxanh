import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import TextField from '@material-ui/core/TextField'
const styles = theme => ({
    closeIcon: {
        height: 20,
        width: 20,
        cursor: 'pointer',
        color: theme.palette.danger.dark
    },
    checkIcon: {
        height: 20,
        width: 20,
        cursor: 'pointer',
        color: theme.palette.success.dark
    }
})
const View = styled.div`
    cursor: pointer;
`

const Edit = styled.div`
    display: flex;
    align-items: center;
    input {
        font-size: 14px;
        color: #12161b;
    }
`

class RowItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            readOnly: true,
            value: ''
        }
    }

    handleClick = () => {
        this.setState({ readOnly: false })
    }

    handleClose = () => {
        let { value } = this.props
        this.setState({ readOnly: true, value })
    }

    handleSave = async () => {
        const { idItem } = this.props
        await this.props.updateItem({
            idItem,
            data: { itemName: this.state.value }
        })
        this.setState({ readOnly: true })
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSave()
        }
    }

    handleChangeValue = event => {
        const value = event.target.value
        const { updateValue } = this.props
        this.setState(
            {
                value
            },
            () => {
                updateValue(value)
            }
        )
    }
    componentDidMount = () => {
        this.setState({
            value: this.props.value
        })
        window.addEventListener('keydown', e => {
            if (e.keyCode === 27) this.handleClose()
        })
    }

    render() {
        let { classes } = this.props
        let { readOnly, value } = this.state
        if (!readOnly) {
            return (
                <Edit>
                    <TextField
                        fullWidth
                        autoFocus
                        value={value}
                        onChange={this.handleChangeValue}
                        onKeyPress={this.handleKeyPress}
                    />
                    <div>
                        <CloseIcon
                            className={classes.closeIcon}
                            onClick={this.handleClose}
                        />
                        <CheckIcon
                            className={classes.checkIcon}
                            onClick={this.handleSave}
                        />
                    </div>
                </Edit>
            )
        }
        return <View onClick={this.handleClick}>{value}</View>
    }
}

export default withStyles(styles)(RowItem)
