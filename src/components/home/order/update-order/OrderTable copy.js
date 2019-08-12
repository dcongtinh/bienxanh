import React from 'react'
import Editable from 'components/Editable'
import moment from 'moment'

class PriceTable extends React.Component {
    state = {
        data: this.props.data
    }
    updateOrder = (idOrder, orders) => {
        this.props.updateOrder({
            idOrder,
            data: {
                orders
            }
        })
    }
    render() {
        let { data } = this.state
        let { idOrder, title, columns } = this.props
        let getPrice = idItem => {
            let { idWarehouse, items } = this.props
            let prices = []
            let item = items.filter(item => {
                return item._id === idItem
            })
            item = item[0]
            item.itemPrices.forEach(itemPrice => {
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
            let date = moment(this.props.date).format('YYYY/MM/DD')
            for (let i in prices) {
                let item = prices[i]
                let dateApply = moment(item.dateApply).format('YYYY/MM/DD')
                if (date >= dateApply) {
                    var price = item.itemPrice
                    break
                }
            }
            return price || 0
        }

        return (
            <Editable
                title={title}
                columns={columns}
                data={data}
                style={{ marginTop: 70 }}
                onRowAdd={newData => {
                    delete newData.tableData
                    newData.itemPrice = getPrice(newData.itemName)
                    data.push(newData)
                    this.updateOrder(idOrder, data)
                }}
                onRowUpdate={(newData, oldData) => {
                    const index = data.indexOf(oldData)
                    delete newData.tableData
                    newData.itemPrice = getPrice(newData.itemName)
                    data[index] = newData
                    this.updateOrder(idOrder, data)
                }}
                onRowDelete={oldData => {
                    const index = data.indexOf(oldData)
                    data.splice(index, 1)
                    this.updateOrder(idOrder, data)
                }}
            />
        )
    }
}

export default PriceTable
