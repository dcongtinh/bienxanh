import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'

const styles = theme => ({
    closeIcon: {
        height: 16,
        width: 16
    }
})
const View = styled.div`
    cursor: pointer;
`

const Edit = styled.div`
    display: flex;
    align-items: center;
    min-width: 200px;
    input {
        font-size: 14px;
        width: 80px;
        border: 0;
        border-bottom: 1px solid #eee;
        outline: 0;
        background: transparent;
    }
`

const Prefix = styled.div`
    /* margin-right: 4px; */
`

const Save = styled.button`
    border: 1px solid #0984e3;
    border-radius: 2px;
    color: #0984e3;
    background: #fff;
`

class RowItem extends Component {
    static propTypes = {
        value: PropTypes.string,
        tableMeta: PropTypes.any,
        updateValue: PropTypes.func
    }

    getPrefix = value => {
        const values = this.props.value.split('/')
        const prefix = values[0] + '/' + values[1] + '/'
        return prefix
    }

    getCode = value => {
        const values = this.props.value.split('/')
        return values[2]
    }

    constructor(props) {
        super(props)
        this.state = {
            readOnly: true,
            prefix: this.getPrefix(props.value),
            code: this.getCode(props.value)
        }
    }

    getValue = () => {
        const { prefix, code } = this.state
        return `${prefix}${code}`
    }

    handleClick = () => {
        this.setState({ readOnly: false })
    }

    handleSave = () => {
        const { idOrder } = this.props
        this.setState({ readOnly: true })
        this.props.updateOrder({
            idOrder,
            buyerName: this.getValue()
        })
        // this.fe
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
                code: value
            },
            () => {
                updateValue(this.getValue())
            }
        )
    }

    render() {
        const { readOnly } = this.state
        const prefix = this.getPrefix()
        const code = this.getCode()
        console.log('abcccc')
        if (!readOnly) {
            return (
                <Edit>
                    <Prefix>{prefix}</Prefix>
                    <input
                        value={code}
                        // control={<TextField  />}
                        onChange={this.handleChangeValue}
                        onKeyPress={this.handleKeyPress}
                    />
                    <CloseIcon size={16} />
                    <CheckIcon />
                    {/* <Save onClick={this.handleSave}>Lưu</Save> */}
                </Edit>
            )
        }
        return <View onClick={this.handleClick}>{this.props.value}</View>
    }
}

export default withStyles(styles)(RowItem)
