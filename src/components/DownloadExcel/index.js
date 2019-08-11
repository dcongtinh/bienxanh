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
        sz: '14'
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
    render() {
        let { orders, name } = this.props
        let headerProps = [
            'itemNo', /// 1
            'group', /// 2
            'buyerCode', /// 3
            'buyerName', /// 4
            'buyerAddress', /// 5
            'buyerPhone', /// 6
            'buyerEmail', /// 7
            'buyerTaxCode', /// 8
            'buyerIdType', /// 9
            'buyerIdNo', /// 10
            'buyerLegalName', /// 11
            'buyerBankName', /// 12
            'buyerBankAccount', /// 13
            'payMethod', /// 14
            'payStatus', /// 15
            'currencyCode', /// 16
            'selection', /// 17
            'itemCode', /// 18
            'itemName', /// 19
            'itemNote', /// 20
            'batchNo', /// 21
            'expDate', /// 22
            'itemUnit', /// 23
            'itemQuantity', /// 24
            'itemPrice', /// 25
            'amountBeforeTax', /// 26
            'taxPercentag', /// 27
            'taxAmount', /// 28
            'discount' /// 29
        ]
        let data = [],
            itemNo = 0
        let header = []
        headerProps.forEach((value, index) => {
            let rgb
            if (index === 0) rgb = 'FFBFBFBF'
            else if (index === 1) rgb = 'FFDDD9C5'
            else if (2 <= index && index <= 12) rgb = 'FFFCE9DA'
            else if (13 <= index && index <= 15) rgb = 'FFE5B8B8'
            else rgb = 'FFDCE6F1'
            header.push({
                value,
                style: {
                    fill: {
                        fgColor: { rgb }
                    },
                    font: styles.font,
                    border: styles.border
                }
            })
        })
        data.push(header)
        orders.forEach((order, index1) => {
            order.orders.forEach((item, index2) => {
                let itemQuantity = item.itemQuantity || 0
                let itemPrice = item.itemPrice || 0

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
                ///3. buyerCode
                row.push({
                    value: order.warehouse.buyerCode,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        alignment: styles.alignCenter
                    }
                })
                ///4. buyerName
                row.push({
                    value: order.buyerName,
                    style: {
                        font: styles.font,
                        border: styles.border,
                        alignment: styles.alignLeft
                    }
                })
                ///5. buyerAddress
                row.push({
                    value: order.warehouse.buyerAddress,
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///6. buyerPhone
                let time = moment(order.date).toArray()
                row.push({
                    value: `${time[0] % 100}${
                        time[1] + 1 < 10 ? `0${time[1] + 1}` : time[1] + 1
                    }${time[2] < 10 ? `0${time[2]}` : time[2]}`,
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///7. buyerEmail
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///8. buyerTaxCode
                row.push({
                    value: order.warehouse.buyerTaxCode,
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///9. buyerIdType
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///10. buyerIdNo
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///11. buyerLegalName
                row.push({
                    value: order.warehouse.buyerLegalName,
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///12. buyerBankName
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///13. buyerBankAccount
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///14. payMethod
                row.push({
                    value: 'CK',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///15. payStatus
                row.push({
                    value: '1',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///16. currencyCode
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///17. selection
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///18. itemCode
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
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
                ///21. batchNo
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///22. expDate
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///23. itemUnit
                row.push({
                    value: 'KG',
                    style: {
                        font: styles.font,
                        border: styles.border,
                        alignment: styles.alignCenter
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
                ///27. taxPercentag
                row.push({
                    value: -2,
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///28. taxAmount
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                ///29. discount
                row.push({
                    value: '',
                    style: {
                        font: styles.font,
                        border: styles.border
                    }
                })
                data.push(row)
            })
        })
        const multiDataSet = [
            {
                columns: [
                    'STT', /// 1
                    'Nhóm hóa đơn (*)', /// 2
                    'Mã KH', /// 3
                    'Họ tên', /// 4
                    'Địa chỉ', /// 5
                    'Số điện thoại', /// 6
                    'Email', /// 7
                    'Mã số thuế', /// 8
                    'Loại giấy tờ', /// 9
                    'Số giấy tờ', /// 10
                    'Tên đơn vị', /// 11
                    'Tên ngân hàng', /// 12
                    'Tài khoản ngân hàng', /// 13
                    'Hình thức thanh toán (*)', /// 14
                    'Thanh toán(*)', /// 15
                    'Loại tiền', /// 16
                    'Loại hàng hóa', /// 17
                    'Mã hàng hóa/dịch vụ', /// 18
                    'Tên hàng hóa/dịch vụ (*)', /// 19
                    'Ghi chú', /// 20
                    'Số lô', /// 21
                    'Hạn dùng', /// 22
                    'Đơn vị tính', /// 23
                    'Số lượng (*)', /// 24
                    'Đơn giá (*)', /// 25
                    'Thành tiền (*)', /// 26
                    'Thuế suất % (*)', /// 27
                    'Tiền thuế', /// 28
                    'Chiết khấu %' /// 29
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
