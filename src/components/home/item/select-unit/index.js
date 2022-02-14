import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const styles = (theme) => ({
    closeIcon: {
        height: 20,
        width: 20,
        cursor: 'pointer',
        color: theme.palette.danger.dark,
    },
    checkIcon: {
        height: 20,
        width: 20,
        cursor: 'pointer',
        color: theme.palette.success.dark,
    },
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

class SelectUnit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            readOnly: true,
            value: '',
        }
    }

    handleClick = () => {
        this.setState({ readOnly: false })
    }

    handleClose = () => {
        let { itemName } = this.props.item
        this.setState({ readOnly: true, value: itemName })
        this.props.updateValue(itemName)
    }

    handleSave = async (itemUnit) => {
        const { item } = this.props

        await this.props.updateItem({
            idItem: item._id,
            data: { itemUnit: itemUnit },
            callback: () => {
                this.props.updateValue(this.state.value)
                this.setState({ readOnly: true })
            },
        })
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSave()
        }
    }

    handleChangeValue = (event, val) => {
        const value = val.props.name
        const itemUnit = event.target.value
        const { updateValue } = this.props
        this.setState(
            {
                value,
            },
            () => {
                updateValue(value)
            }
        )
        this.handleSave(itemUnit)
    }

    handleBlur = (event) => {
        this.setState({ readOnly: true })
    }

    componentDidMount = () => {
        this.setState({
            value: this.props.value,
        })
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) this.handleClose()
        })
    }

    shouldComponentUpdate(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            })
        }
        return true
    }
    render() {
        let { units } = this.props
        let { readOnly, value } = this.state

        if (!readOnly) {
            return (
                <Edit>
                    <Select
                        fullWidth
                        autoFocus
                        label={value}
                        value={value}
                        onChange={this.handleChangeValue}
                        onBlur={this.handleBlur}
                    >
                        {units.map((unit, i) => {
                            return (
                                <MenuItem
                                    value={unit._id}
                                    name={unit.unitName}
                                    key={i}
                                >
                                    {unit.unitName}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </Edit>
            )
        }
        return <View onClick={this.handleClick}>{value}</View>
    }
}

export default withStyles(styles)(SelectUnit)
