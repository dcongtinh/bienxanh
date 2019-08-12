import React from 'react'
import Editable from 'components/Editable'

class OrdersTable extends React.Component {
    render() {
        let { data, title, columns } = this.props

        return (
            <Editable
                title={title}
                columns={columns}
                data={data}
                style={{ marginTop: 16 }}
                onRowAdd={newData => {
                    data.push(newData)
                    this.props.handleChange(data)
                }}
                onRowUpdate={(newData, oldData) => {
                    const index = data.indexOf(oldData)
                    data[index] = newData
                    this.props.handleChange(data)
                }}
                onRowDelete={oldData => {
                    const index = data.indexOf(oldData)
                    data.splice(index, 1)
                    this.props.handleChange(data)
                }}
            />
        )
    }
}

export default OrdersTable
