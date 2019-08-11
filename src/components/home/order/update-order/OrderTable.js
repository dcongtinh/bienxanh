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
        return (
            <Editable
                title={title}
                columns={columns}
                data={data}
                style={{ marginTop: 70 }}
                onRowAdd={newData => {
                    data.push(newData)
                    this.updateOrder(idOrder, data)
                }}
                onRowUpdate={(newData, oldData) => {
                    const index = data.indexOf(oldData)
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
