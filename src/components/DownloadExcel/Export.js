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
        sz: '12',
    },
    border: {
        top: { style: 'thin' },
        right: {
            style: 'thin',
        },
        bottom: {
            style: 'thin',
        },
        left: { style: 'thin' },
    },
    alignCenter: {
        vertical: 'center',
        horizontal: 'center',
    },
    alignLeft: {
        vertical: 'center',
        horizontal: 'top',
    },
    alignRight: {
        vertical: 'botom',
        horizontal: 'bottom',
        readingOrder: 2,
    },
}

export default class DownloadExcel extends Component {
    getPrice(order, item, name) {
        let idItem = item.itemName
        let idWarehouse = order.warehouse._id
            ? order.warehouse._id
            : order.warehouse
        let { items, suppliers } = this.props
        let _item = items.filter((item) => {
            return item._id === idItem
        })
        _item = _item[0]

        let prices = []
        _item[name].forEach((itemPrice, index) => {
            let match = itemPrice[idWarehouse] ? true : false
            if (name === 'itemTradePrices') {
                let supplier = suppliers.filter((supplier) => {
                    return supplier._id === item.itemSupplier
                })
                supplier = supplier[0]
                match &=
                    supplier &&
                    supplier.supplierItems.some((supplierItem) => {
                        return supplierItem.value === item.itemName
                    })
                match &= itemPrice.itemSupplier === item.itemSupplier
            }
            if (match)
                prices.push({
                    dateApply: itemPrice.dateApply,
                    itemPrice: itemPrice[idWarehouse],
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
        // if (name === 'itemTradePrices')
        //     console.log(order, item, _item, name, suppliers, price)
        return parseInt(price)
    }
    render() {
        let { orders, itemName, whName, supplierName, userName } = this.props
        // let headerProps = [
        //     'itemNo', /// 1
        //     'group', /// 2
        //     'itemName', /// 19
        //     'itemNote', /// 20,
        //     'itemSupplier', /// 21
        //     'itemShipper', /// 22
        //     'itemQuantity', /// 24
        //     'itemPrice', /// 25
        //     'amountBeforeTax', /// 26
        //     'itemTradePrice',
        //     'totalPrice',
        //     'beforeTax',
        //     'discount1',
        //     'discount2'
        // ]
        let data = []
        // data.push(header)
        let discount1 = 0.0353,
            discount2 = 0.045
        orders.forEach((order, index1) => {
            let idWarehouse = order.warehouse._id
                ? order.warehouse._id
                : order.warehouse
            let warehouseName = whName[idWarehouse]
            order.orders.forEach((item, index2) => {
                let itemQuantity = item.itemQuantity || 0
                let itemLoss = item.itemLoss || 0
                let itemWeight = item.itemWeight || 0
                let itemSupplier = supplierName[item.itemSupplier] || ''
                let itemTransfer = supplierName[item.itemTransfer] || ''
                let itemShipper = userName[item.itemShipper] || ''
                let itemFeeShip = item.itemFeeShip || 0
                let itemFeeCentral = item.itemFeeCentral || 0
                let itemFeeNorth = item.itemFeeNorth || 0
                let itemPrice = this.getPrice(order, item, 'itemPrices')
                let itemTradePrice = this.getPrice(
                    order,
                    item,
                    'itemTradePrices'
                )
                let amountBeforeTax = (itemQuantity + itemLoss) * itemTradePrice
                let totalPrice = itemQuantity * itemPrice
                let _discount1 = totalPrice * discount1
                let _discount2 = totalPrice * discount2

                let beforeTax =
                    totalPrice -
                    _discount1 -
                    _discount2 -
                    itemFeeShip -
                    itemFeeNorth -
                    itemWeight * itemFeeCentral -
                    amountBeforeTax

                ///1. itemNo
                let row = []
                let time = moment(order.date).toArray()
                row.push({
                    value: `${time[0] % 100}${
                        time[1] + 1 < 10 ? `0${time[1] + 1}` : time[1] + 1
                    }${time[2] < 10 ? `0${time[2]}` : time[2]}`,
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///2. number
                row.push({
                    value: order.buyerName || '',
                    style: {
                        font: styles.font,
                        border: styles.border,
                        alignment: styles.alignCenter,
                    },
                })
                ///3. group
                row.push({
                    value: order.group || '',
                    style: {
                        font: styles.font,
                        border: styles.border,
                        alignment: styles.alignCenter,
                    },
                })
                ///4. warehouse
                row.push({
                    value: warehouseName.warehouse,
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///5. itemName
                row.push({
                    value: itemName[item.itemName],
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })

                ///6. itemQuantity
                row.push({
                    value: itemQuantity || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///7. itemLoss
                row.push({
                    value: itemLoss || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///8. itemPrice
                row.push({
                    value: itemTradePrice || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///9. amountBeforeTax
                row.push({
                    value: amountBeforeTax || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///10. itemSupplier
                row.push({
                    value: itemSupplier || '',
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///11. itemShipper
                row.push({
                    value: itemShipper || '',
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///12. PHI GH
                row.push({
                    value: itemFeeShip || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///13. PHI VC
                row.push({
                    value: itemFeeNorth || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///14. PHI TC
                row.push({
                    value: itemWeight * itemFeeCentral || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///15. WEIGHT
                row.push({
                    value: itemWeight || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///16. GiVC HK
                row.push({
                    value: itemFeeCentral || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///17. NCC VC
                row.push({
                    value: itemTransfer || '',
                    style: {
                        font: styles.font,
                        border: styles.border,
                    },
                })
                ///18. DON GIA BAN
                row.push({
                    value: itemPrice || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///19. totalPrice
                row.push({
                    value: itemQuantity * itemPrice || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///20. beforeTax
                row.push({
                    value: beforeTax || 0, //beforeTax,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///21. discount1
                row.push({
                    value: _discount1 || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                ///22. discount2
                row.push({
                    value: _discount2 || 0,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        numFmt: '_(* #,##0_);_(* (#,##0);_(* "-"??_);_(@_)',
                    },
                })
                data.push(row)
            })
        })
        const multiDataSet = [
            {
                columns: [
                    'NGÀY GIAO', /// 1
                    'SỐ ORDER', /// 2
                    'NHÓM ORDER', /// 3
                    'KHO', ///4
                    'LOẠI HÀNG', /// 5
                    'SỐ LƯỢNG', /// 6
                    'HAO HỤT', /// 7
                    'ĐƠN GIÁ MUA', /// 8
                    'THÀNH TIỀN', /// 9
                    'NCC', /// 10
                    'NVGH', /// 11
                    'PHÍ GH', /// 12
                    'PHÍ VC', /// 13
                    'PHÍ TC', /// 14
                    'WEIGHT', /// 15
                    'GiVC HK', /// 16
                    'NCC VC', /// 17
                    'ĐƠN GIÁ BÁN', /// 18
                    'DOANH THU', /// 19
                    'LÃI TRƯỚC THUẾ', /// 20
                    'CHIẾT KHẤU 3.53%', /// 21
                    'CHIẾT KHẤU 4.5%', /// 22
                ],
                data,
            },
        ]
        return (
            <div>
                <ExcelFile
                    filename="BaoCao"
                    element={
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.props.onClick}
                        >
                            <ArrowUpwardIcon />
                            Xuất Báo Cáo
                        </Button>
                    }
                >
                    <ExcelSheet dataSet={multiDataSet} name="Hoa don" />
                </ExcelFile>
            </div>
        )
    }
}
