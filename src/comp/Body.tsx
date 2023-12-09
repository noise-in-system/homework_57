import React, {useState} from 'react';
import {Flex} from "antd";
import './Body.css'
import {replace} from "../actions/actions";
import {connect} from "react-redux";
import {weekDays} from "../constants";


let downRow = -1
let downColumn = -1
let lastEnterRow = -1
let lastEnterColumn = -1

function Comp({replace, grid}) {
    const [isSelecting, setIsSelecting] = useState(false)

    // 状态 0原始 1选择中 2激活

    const onMouseDown = (rowIndex, columnIndex) => {
        // console.log('down', rowIndex, columnIndex)
        setIsSelecting(true)
        downRow = rowIndex
        downColumn = columnIndex
    }

    const onMouseUp = (upRow, upColumn) => {
        // console.log('up', upRow, upColumn)
        const minRow = Math.min(downRow, upRow)
        const maxRow = Math.max(downRow, upRow)
        const minColumn = Math.min(downColumn, upColumn)
        const maxColumn = Math.max(downColumn, upColumn)

        const temp = grid.map((row, rowIdx) => {
            return row.map((column, columnIdx) => {
                if (rowIdx >= minRow && rowIdx <= maxRow && columnIdx >= minColumn && columnIdx <= maxColumn) return 2
                if (column !== 2) return 0
                return column
            })
        })
        replace(temp)
        setIsSelecting(false)
        downRow = -1
        downColumn = -1
        lastEnterRow = -1
        lastEnterColumn = -1
    }

    const onMouseEnter = (enterRow, enterColumn) => {
        // onMouseEnter={() => onMouseEnter(rowIndex, columnIndex)}
        if (isSelecting) {
            lastEnterRow = enterRow
            lastEnterColumn = enterColumn

            console.log('enter', enterRow, enterColumn)
            const minRow = Math.min(downRow, enterRow)
            const maxRow = Math.max(downRow, enterRow)
            const minColumn = Math.min(downColumn, enterColumn)
            const maxColumn = Math.max(downColumn, enterColumn)

            const temp = grid.map((row, rowIdx) => {
                return row.map((column, columnIdx) => {
                    if (rowIdx >= minRow && rowIdx <= maxRow && columnIdx >= minColumn && columnIdx <= maxColumn && column !== 2) return 1
                    if (column === 2) return 2
                    return 0
                })
            })
            replace(temp)
        }
    }

    const clearState = () => {
        replace(new Array(7).fill(0).map(() => new Array(48).fill(0)))
    }

    return (
        <>
            <Flex>
                <Flex vertical className='br1ccc bl1ccc weekday-column'>
                    {weekDays.map((item, index) => (
                        <Flex justify={'center'} align={'center'}
                              className={`weekday-tag ${'bb1ccc'}`}>{`星期${item}`}</Flex>
                    ))}
                </Flex>

                <Flex vertical flex={1}>
                    {grid.map((rowItem, rowIndex) => {
                        return <Flex style={{height: '28px'}}>
                            {rowItem.map((columnItem, columnIndex) => (
                                <Flex flex={1}>
                                    <div
                                        className={`br1ccc bb1ccc select-pad ${columnItem === 0 ? '' : columnItem === 1 ? 'in-select' : 'active'}`}
                                        onMouseDown={() => onMouseDown(rowIndex, columnIndex)}
                                        onMouseUp={() => onMouseUp(rowIndex, columnIndex)}
                                        onDrag={() => {
                                        }}
                                        onMouseEnter={() => onMouseEnter(rowIndex, columnIndex)}
                                        style={{boxSizing: 'border-box', flex: 1, borderCollapse: 'collapse'}}>
                                    </div>
                                </Flex>
                            ))}
                        </Flex>
                    })}
                </Flex>
            </Flex>
            <Flex className={'bl1ccc br1ccc pd14'}>
                {grid.filter(row => row.indexOf(2) !== -1).length ?
                    <Flex flex={1}>
                        <Flex flex={1} align={'center'} justify={'center'}>已选择时间段</Flex>
                        <Flex onClick={clearState} className={'c0099ff pointer'}>清空</Flex>
                    </Flex> :
                    <Flex flex={1} align={'center'} justify={'center'}>可拖动鼠标选择时间段</Flex>}
            </Flex>
        </>
    );
}

const mapStateToProps = (state) => ({
    grid: state.grid,
});

const mapDispatchToProps = {
    replace,
};

const Body = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default Body
