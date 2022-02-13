import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
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
        width: 60px;
        color: #12161b;
    }
`

const Prefix = styled.div`
    /* margin-right: 4px; */
`

class RowItem extends Component {
    static propTypes = {
        value: PropTypes.string,
        tableMeta: PropTypes.any,
        updateValue: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = {
            readOnly: true,
            prefix: '',
            code: '',
            value: '',
            error: false,
            valid6: null,
        }
    }
    getPrefix = (value) => {
        const values = this.state.value.split('/')
        const prefix = values[0] + '/' + values[1] + '/'
        return prefix
    }

    getCode = (value) => {
        const values = this.state.value.split('/')
        return values[2]
    }

    getValue = () => {
        const { prefix, code } = this.state
        return `${prefix}${code}`
    }

    handleClick = () => {
        this.setState({ readOnly: false })
    }

    handleClose = () => {
        let value = this.props.order.buyerName
        this.setState({ readOnly: true, value })
        this.props.updateValue(this.props.order.buyerName)
    }

    handleSave = async () => {
        const { order } = this.props
        let buyerName = this.getValue()
        await this.props.updateOrder({
            idOrder: order._id,
            data: { buyerName },
            callback: () => {
                this.props.updateValue(buyerName)
                this.setState({ readOnly: true })
            },
        })
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && !this.state.error) {
            this.handleSave()
        }
    }

    handleChangeValue = (event) => {
        const value = event.target.value
        let inputValue = value
        const { updateValue, mark } = this.props

        this.setState(
            {
                code: value,
            },
            () => {
                const value = this.getValue()
                updateValue(value)
                if (mark[value] || inputValue.length !== 6)
                    this.setState({
                        error:
                            inputValue.length !== 6
                                ? '* 6 ký tự'
                                : '* Trùng mã số',
                    })
                else this.setState({ error: false })
            }
        )
    }
    componentDidMount = () => {
        let values = this.props.order.buyerName.split('/')
        this.setState({
            prefix: values[0] + '/' + values[1] + '/',
            code: values[2],
            value: this.props.order.buyerName,
        })
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) this.handleClose()
        })
    }

    shouldComponentUpdate(nextProps) {
        if (this.state.value !== nextProps.value) {
            let values = nextProps.value.split('/')
            this.setState({
                prefix: values[0] + '/' + values[1] + '/',
                code: values[2],
                value: nextProps.value,
            })
        }
        return true
    }
    render() {
        let { classes } = this.props
        const { readOnly, error } = this.state
        const prefix = this.getPrefix()
        const code = this.getCode()
        if (!readOnly) {
            return (
                <Edit>
                    <Prefix>{prefix}</Prefix>
                    <FormControl
                        error={error}
                        style={{ marginTop: error && 20 }}
                    >
                        <TextField
                            error={error}
                            autoFocus
                            value={code}
                            onChange={this.handleChangeValue}
                            onKeyPress={this.handleKeyPress}
                        />
                        {error ? (
                            <FormHelperText
                                style={{ margin: error && '4px 0' }}
                            >
                                {error}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                    <div>
                        <CloseIcon
                            className={classes.closeIcon}
                            onClick={this.handleClose}
                        />
                        {!error && (
                            <CheckIcon
                                className={classes.checkIcon}
                                onClick={this.handleSave}
                            />
                        )}
                    </div>
                </Edit>
            )
        }
        return <View onClick={this.handleClick}>{this.state.value}</View>
    }
}

export default withStyles(styles)(RowItem)
