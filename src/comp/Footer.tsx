import React from 'react';
import {Button, Flex} from "antd";
import {connect} from 'react-redux';
import {weekDays} from "../constants";
import {replace} from "../actions/actions";

function Comp({grid, replace}) {

    const padTime = (hour) => {
        return hour.toString().length > 1 ? hour : '0' + hour
    }

    const idxToTimeRange = (idx1, idx2) => {
        if (!idx2) {
            const half = idx1 % 2
            const hour = Math.floor(idx1 / 2)
            if (!half) return `${padTime(hour)}:00-${padTime(hour)}:30`
            return `${padTime(hour)}:30-${padTime(hour + 1)}:00`
        } else {
            const mod1 = idx1 % 2
            const hour1 = Math.floor(idx1 / 2)
            const mod2 = idx2 % 2
            const hour2 = Math.floor(idx2 / 2)
            return `${padTime(hour1)}:${mod1 ? '30' : '00'}-${mod2 ? (padTime(hour2 + 1) + ':00') : (padTime(hour2) + ':30')}`
        }
    }

    const current = grid.map(item => {
        if (item.indexOf(1) === -1 && item.indexOf(2) === -1) return []
        else return item.map((column, columnIdx) => {
            if (column === 2) return columnIdx
            return -1
        }).filter(idx => idx !== -1)
    }).map(row => {
        let temp = []
        const raw = []
        for (let i = 0; i < row.length; i++) {
            if (i === row.length - 1) {
                if (temp.length && row[i - 1] === row[i] - 1) {
                    temp.push(row[i])
                    raw.push(temp)
                } else if (temp.length) {
                    raw.push(temp)
                    raw.push([row[i]])
                } else {
                    raw.push([row[i]])
                }
                break;
            }
            if (temp.length === 0) temp.push(row[i])
            else {
                if (row[i - 1] === row[i] - 1) temp.push(row[i])
                else {
                    raw.push(temp)
                    temp = [row[i]]
                }
            }
        }
        return raw.map(arr => {
            if (arr.length > 1) return idxToTimeRange(arr[0], arr[arr.length - 1])
            else return idxToTimeRange(arr[0], undefined)
        })
    })

    const length = current.filter(item => item.length).length

    const selectWeekdayGoldenTime = () => {
        replace(new Array(7).fill(0).map((_, rowIdx) => {
            if (rowIdx > 4) return new Array(48).fill(0)
            else return new Array(48).fill(0).map((_, columnIdx) => {
                if (columnIdx > 17 && columnIdx < 42) return 2
                else return 0
            })
        }))
    }

    const selectWeekendGoldenTime = () => {
        replace(new Array(7).fill(0).map((_, rowIdx) => {
            if (rowIdx <= 4) return new Array(48).fill(0)
            else return new Array(48).fill(0).map((_, columnIdx) => {
                if (columnIdx > 17 && columnIdx < 42) return 2
                else return 0
            })
        }))
    }

    return (
        <>
            <Flex vertical className={'bb1ccc bl1ccc br1ccc'}>
                {length ? current.map((row, rowIdx) => row.length ? (
                    <Flex className={'lh20 mb8'} key={rowIdx}>
                        <Flex className={'weekday-column'} justify={'center'}>星期{`${weekDays[rowIdx]}`}</Flex>
                        <Flex flex={1} wrap={'wrap'} style={{wordBreak: 'break-all'}}>
                            {row.map((timeRange, idx) => (
                                <Flex
                                    key={timeRange}
                                    style={{wordBreak: 'break-all'}}>{timeRange}{idx !== row.length - 1 ? '、' : ''}</Flex>
                            ))}
                        </Flex>
                    </Flex>
                ) : null) : <div></div>}
            </Flex>
            <Flex className={'pd14'}>
                <Button onClick={selectWeekdayGoldenTime} type="primary" className={'mr8'}>工作日黄金时段</Button>
                <Button onClick={selectWeekendGoldenTime} type="primary">休息日黄金时段</Button>
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

const Footer = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default Footer
