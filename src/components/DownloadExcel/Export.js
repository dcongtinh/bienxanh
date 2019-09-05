import React, { Component } from 'react'
import ReactExport from 'react-data-export'
import { Button } from '@material-ui/core'
import { ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons'
import moment from 'moment'
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

const styles = {
    font: {
        name: 'Times New Roman',
        sz: '12'
    },
    border: {
        top: { style: 'thin' },
        right: {
            style: 'thin'
        },
        bottom: {
            style: 'thin'
        },
        left: { style: 'thin' }
    },
    alignCenter: {
        vertical: 'center',
        horizontal: 'center'
    },
    alignLeft: {
        vertical: 'center',
        horizontal: 'top'
    },
    alignRight: {
        vertical: 'botom',
        horizontal: 'bottom',
        readingOrder: 2
    }
}

export default class DownloadExcel extends Component {
    getPrice(order, item, name) {
        let idItem = item.itemName
        let idWarehouse = order.warehouse

        let { items } = this.props
        let _item = items.filter(item => {
            return item._id === idItem
        })
        _item = _item[0]

        let prices = []
        _item[name].forEach(itemPrice => {
            let match = itemPrice[idWarehouse] ? true : false
            if (match)
                prices.push({
                    dateApply: itemPrice.dateApply,
                    itemPrice: itemPrice[idWarehouse]
                })
        })
        prices.sort((a, b) => {
            return (
                new Date(b.dateApply).getTime() -
                new Date(a.dateApply).getTime()
            )
        })
        let date = moment(order.date).format('YYYY/MM/DD')
        let price = 0
        for (let i in prices) {
            let item = prices[i]
            let dateApply = moment(item.dateApply).format('YYYY/MM/DD')
            if (date >= dateApply) {
                price = item.itemPrice
                break
            }
        }
        return price
    }
    render() {
        let { orders, items, name } = this.props
        let headerProps = [
            'itemNo', /// 1
            'group', /// 2
            'itemName', /// 19
            'itemNote', /// 20
            'itemQuantity', /// 24
            'itemPrice', /// 25
            'amountBeforeTax', /// 26
            'itemTradePrice',
            'totalPrice',
            'beforeTax',
            'discount1',
            'discount2'
        ]
        let data = [],
            itemNo = 0
        let header = []
        headerProps.forEach((value, index) => {
            // let rgb
            // if (index === 0) rgb = 'FFBFBFBF'
            // else if (index === 1) rgb = 'FFDDD9C5'
            // else if (2 <= index && index <= 12) rgb = 'FFFCE9DA'
            // else if (13 <= index && index <= 15) rgb = 'FFE5B8B8'
            // else rgb = 'FFDCE6F1'
            header.push({
                value,
                style: {
                    // fill: {
                    //     fgColor: { rgb }
                    // },
                    font: styles.font,
                    border: styles.border
                }
            })
        })
        data.push(header)
        let discount1 = 0.0353,
            discount2 = 0.045
        orders.forEach((order, index1) => {
            order.orders.forEach((item, index2) => {
                let itemQuantity = item.itemQuantity || 0
                let {
                    itemFeeShip,
                    itemFeeCentral,
                    itemFeeNorth,
                    itemFeeSouth
                } = item
                let itemFee = itemFeeCentral + itemFeeNorth + itemFeeSouth
                // let itemPrice = item.itemPrice || 0
                let itemPrice = this.getPrice(order, item, 'itemPrices')
                let itemTradePrice = this.getPrice(
                    order,
                    item,
                    'itemTradePrices'
                )
                let beforeTax =
                    itemQuantity *
                        itemTradePrice *
                        (1 - discount1 - discount2) -
                    (itemQuantity * itemPrice + itemFeeShip) -
                    itemFee

                ///1. itemNo
                let row = []
                row.push({
                    value: ++itemNo,
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///2. group
                row.push({
                    value: order.group,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        alignment: styles.alignCenter
                    }
                })
                ///19. itemName
                row.push({
                    value: name[item.itemName],
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///20. itemNote
                row.push({
                    value: order.itemNote || '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///24. itemQuantity
                row.push({
                    value: itemQuantity,
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///25. itemPrice
                row.push({
                    value: itemPrice,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
                    }
                })
                ///26. amountBeforeTax
                row.push({
                    value: itemQuantity * itemPrice,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
                    }
                })
                ///25. itemTradePrice
                row.push({
                    value: itemTradePrice,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
                    }
                })
                ///26. totalPrice
                row.push({
                    value: itemQuantity * itemTradePrice,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
                    }
                })
                ///26. totalPrice
                row.push({
                    value: beforeTax,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
                    }
                })
                ///26. discount1
                row.push({
                    value: itemQuantity * itemTradePrice * discount1,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
                    }
                })
                ///26. discount2
                row.push({
                    value: itemQuantity * itemTradePrice * discount2,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)'
                    }
                })
                data.push(row)
            })
        })
        const multiDataSet = [
            {
                columns: [
                    'STT', /// 1
                    'Nhóm hóa đơn', /// 2
                    'Tên hàng hóa/dịch vụ', /// 19
                    'Ghi chú', /// 20
                    'Số lượng', /// 24
                    'Đơn giá', /// 25
                    'Thành tiền', /// 26
                    'Giá bán', /// 25
                    'Doanh số', /// 25
                    'Lãi trước thuế',
                    'Chiết khấu 3.53%',
                    'Chiết khấu 4.5%'
                ],
                data
            }
        ]
        return (
            <div>
                <ExcelFile
                    filename="ExportData"
                    element={
                        <Button {...this.props}>
                            <ArrowUpwardIcon />
                            Export
                        </Button>
                    }>
                    <ExcelSheet dataSet={multiDataSet} name="Hoa don" />
                </ExcelFile>
            </div>
        )
    }
}
