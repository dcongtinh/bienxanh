import React, { Component } from 'react'
import ReactExport from 'react-data-export'
import { Button } from '@material-ui/core'
import { ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons'
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

const styles = {
    border: {
        top: { style: 'thin' },
        right: {
            style: 'thin'
        },
        bottom: {
            style: 'thin'
        },
        left: { style: 'thin' }
    }
}
const multiDataSet = [
    {
        columns: ['itemNo', 'group', 'Colors'],
        data: [
            [
                {
                    value: 'H1',
                    style: {
                        font: { sz: '24', bold: true },
                        border: styles.border
                    }
                },
                { value: 'Bold', style: { font: { bold: true } } },
                {
                    value: 'Red',
                    style: {
                        fill: {
                            patternType: 'solid',
                            fgColor: { rgb: 'FFFF0000' }
                        }
                    }
                }
            ]
        ]
    }
]

export default class DownloadExcel extends Component {
    render() {
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
