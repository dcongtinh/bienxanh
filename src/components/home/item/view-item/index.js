import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import numeral from 'numeral'
import { DatePicker } from '@material-ui/pickers'
import NumberFormat from 'react-number-format'
import PriceTable from './PriceTable'
import Select from 'react-select'
const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
            thousandSeparator
        />
    )
}
const styles = (theme) => ({
    supplierName: {
        padding: '4px 0',
        maxWidth: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
})

class ViewItemInfo extends React.Component {
    render() {
        let { classes, item, wareHouses, suppliers } = this.props
        let { idItem } = this.props.match.params
        let supplierList = [],
            nameSupplier = {}
        suppliers.forEach((supplier) => {
            for (let i in supplier.supplierItems) {
                if (supplier.supplierItems[i].value === idItem) {
                    supplierList.push({
                        value: supplier._id,
                        label: supplier.supplierName,
                    })
                    nameSupplier[supplier._id] = supplier.supplierName
                    break
                }
            }
        })
        let columns = [
            {
                title: 'Ngày bán',
                field: 'dateApply',
                headerStyle: {
                    marginBottom: 4,
                },
                render: (rowData) => {
                    return (
                        <div>
                            {moment(rowData.dateApply).format('DD/MM/YYYY')}
                        </div>
                    )
                },
                editComponent: (props) => {
                    return (
                        <DatePicker
                            name="dateApply"
                            format="DD/MM/YYYY"
                            variant="inline"
                            value={props.value}
                            onChange={(date) => {
                                props.onChange(date)
                            }}
                            autoOk
                        />
                    )
                },
            },
            {
                title: 'Đồng giá',
                field: 'equalPrice',
                render: (rowData) => (
                    <div>
                        {rowData.equalPrice
                            ? numeral(rowData.equalPrice).format('(0,0')
                            : '-'}
                    </div>
                ),
                editComponent: (props) => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="equalPrice"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
        ]
        let columns2 = [
            {
                title: 'Ngày mua',
                field: 'dateApply',
                headerStyle: {
                    marginBottom: 4,
                },
                render: (rowData) => {
                    return (
                        <div>
                            {moment(rowData.dateApply).format('DD/MM/YYYY')}
                        </div>
                    )
                },
                editComponent: (props) => {
                    return (
                        <DatePicker
                            name="dateApply"
                            format="DD/MM/YYYY"
                            variant="inline"
                            value={props.value}
                            onChange={(date) => {
                                props.onChange(date)
                            }}
                            autoOk
                        />
                    )
                },
            },
            {
                title: 'NCC',
                field: 'itemSupplier',
                headerStyle: {
                    marginBottom: 4,
                },
                render: (rowData) => {
                    return (
                        <div className={classes.supplierName}>
                            {nameSupplier[rowData.itemSupplier]}
                        </div>
                    )
                },
                editComponent: (props) => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: nameSupplier[props.value],
                        }
                    }
                    return (
                        <Select
                            name="itemSupplier"
                            value={data}
                            onChange={(data) => {
                                props.onChange(data.value)
                            }}
                            options={supplierList}
                            className={'basic-single-select'}
                            classNamePrefix={'select'}
                            placeholder="Chọn NCC"
                            styles={{
                                multiValue: (base) => ({
                                    ...base,
                                    borderRadius: 16,
                                }),
                                option: (base) => ({
                                    ...base,
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }),
                            }}
                        />
                    )
                },
            },
            {
                title: 'Đồng giá',
                field: 'equalPrice',
                render: (rowData) => (
                    <div>
                        {rowData.equalPrice
                            ? numeral(rowData.equalPrice).format('(0,0')
                            : '-'}
                    </div>
                ),
                editComponent: (props) => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="equalPrice"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
        ]

        let warehouseList = []
        wareHouses.forEach((warehouse) => {
            let idWh = warehouse._id
            warehouseList.push(idWh)
            columns.push({
                title: warehouse.warehouse,
                field: idWh,
                render: (rowData) => (
                    <div>
                        {rowData[idWh] && !rowData.equalPrice
                            ? numeral(rowData[idWh]).format('(0,0')
                            : '-'}
                    </div>
                ),
                editComponent: (props) => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name={idWh}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            })
            columns2.push({
                title: warehouse.warehouse,
                field: idWh,
                render: (rowData) => (
                    <div>
                        {rowData[idWh] && !rowData.equalPrice
                            ? numeral(rowData[idWh]).format('(0,0')
                            : '-'}
                    </div>
                ),
                editComponent: (props) => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name={idWh}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            })
        })
        return (
            <div>
                <PriceTable
                    id="itemPrices"
                    idItem={idItem}
                    title={`${item.itemName} (ĐVT: ${item.itemUnit.unitName})`}
                    data={item.itemPrices || []}
                    columns={columns}
                    warehouseList={warehouseList}
                    updateItem={this.props.updateItem}
                />

                <PriceTable
                    id="itemTradePrices"
                    idItem={idItem}
                    data={item.itemTradePrices || []}
                    columns={columns2}
                    warehouseList={warehouseList}
                    updateItem={this.props.updateItem}
                />
            </div>
        )
    }
}
export default withStyles(styles)(ViewItemInfo)
