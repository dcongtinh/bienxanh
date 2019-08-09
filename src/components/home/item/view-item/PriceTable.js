import React from 'react'
import Editable from 'components/Editable'

class PriceTable extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         data: this.props.data
    //     }
    // }
    state = {
        data: this.props.data
    }
    render() {
        let { data } = this.state
        let { id, idItem, title, columns, warehouseList } = this.props
        data.sort((a, b) => {
            return (
                new Date(b.dateApply).getTime() -
                new Date(a.dateApply).getTime()
            )
        })
        return (
            <Editable
                title={title}
                columns={columns}
                data={data}
                onRowAdd={newData => {
                    if (!newData.dateApply) newData.dateApply = new Date()
                    delete newData.tableData

                    if (newData.equalPrice) {
                        warehouseList.forEach(idWh => {
                            newData[idWh] = newData.equalPrice
                        })
                    }
                    data.push(newData)
                    this.setState({ data })
                    this.props.updateItem({
                        idItem,
                        data: {
                            [id]: data
                        }
                    })
                }}
                onRowUpdate={(newData, oldData) => {
                    const index = data.indexOf(oldData)
                    delete newData.tableData
                    if (newData.equalPrice) {
                        warehouseList.forEach(idWh => {
                            newData[idWh] = newData.equalPrice
                        })
                    }
                    data[index] = newData
                    this.props.updateItem({
                        idItem,
                        data: {
                            [id]: data
                        }
                    })
                }}
                onRowDelete={oldData => {
                    const index = data.indexOf(oldData)
                    data.splice(index, 1)
                    this.props.updateItem({
                        idItem,
                        data: {
                            [id]: data
                        }
                    })
                }}
            />
        )
    }
}

export default PriceTable
