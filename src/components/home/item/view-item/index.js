import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import numeral from 'numeral'
import { DatePicker } from '@material-ui/pickers'
import NumberFormat from 'react-number-format'
import PriceTable from './PriceTable'

const NumberFormatCustom = props => {
    const { inputRef, onChange, ...other } = props
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value
                    }
                })
            }}
            thousandSeparator
        />
    )
}

const styles = theme => ({})

class ViewItemInfo extends React.Component {
    render() {
        let { item, wareHouses } = this.props
        let { idItem } = this.props.match.params
        let columns = [
            {
                title: 'Ngày bán',
                field: 'dateApply',
                headerStyle: {
                    marginBottom: 4
                },
                render: rowData => {
                    return (
                        <div>
                            {moment(rowData.dateApply).format('DD/MM/YYYY')}
                        </div>
                    )
                },
                editComponent: props => {
                    return (
                        <DatePicker
                            name="dateApply"
                            format="DD/MM/YYYY"
                            variant="inline"
                            value={props.value}
                            onChange={date => {
                                props.onChange(date)
                            }}
                            autoOk
                        />
                    )
                }
            },
            {
                title: 'Đồng giá',
                field: 'equalPrice',
                render: rowData => (
                    <div>
                        {rowData.equalPrice
                            ? numeral(rowData.equalPrice).format('(0,0')
                            : '-'}
                    </div>
                ),
                editComponent: props => (
                    <TextField
                        style={{ width: 80 }}
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                        name="equalPrice"
                        InputProps={{
                            inputComponent: NumberFormatCustom
                        }}
                    />
                )
            }
        ]
        let warehouseList = []
        wareHouses.forEach(warehouse => {
            let idWh = warehouse._id
            warehouseList.push(idWh)
            columns.push({
                title: warehouse.warehouse,
                field: idWh,
                render: rowData => (
                    <div>
                        {rowData[idWh] && !rowData.equalPrice
                            ? numeral(rowData[idWh]).format('(0,0')
                            : '-'}
                    </div>
                ),
                editComponent: props => (
                    <TextField
                        style={{ width: 80 }}
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                        name={idWh}
                        InputProps={{
                            inputComponent: NumberFormatCustom
                        }}
                    />
                )
            })
        })
        let columns2 = columns
        columns2[0].title = 'Ngày mua'
        return (
            <div>
                <PriceTable
                    id="itemPrices"
                    idItem={idItem}
                    data={item.itemPrices || []}
                    columns={columns}
                    updateItem={this.props.updateItem}
                />

                <PriceTable
                    id="itemTradePrices"
                    idItem={idItem}
                    data={item.itemTradePrices || []}
                    columns={columns2}
                    updateItem={this.props.updateItem}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ViewItemInfo)
