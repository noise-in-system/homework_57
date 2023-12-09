import * as React from 'react';
import './Header.css'

import {Flex} from 'antd';

const headerContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    height: '30px',
    border: '1px solid #ccc'
}

const block = {
    width: '10px',
    height: '2px',
    borderRadius: '2px',
    border: '1px solid #0099ff',
}

const timeTags = new Array(24).fill(0).map((_, index) => index)

export const Header = () => {
    return (
        <>
            <div style={headerContainer}>
                <div className={'mr8'} style={{...block, backgroundColor: '#0099ff'}}></div>
                <div className={'mr8'}>已选</div>
                <div className={'mr8'} style={{...block, borderColor: '#ccc'}}></div>
                <div className={'mr12'}>可选</div>
            </div>
            <Flex className='bb1ccc' style={{height: '70px'}}>
                <Flex className='weekday-column bl1ccc br1ccc bb' style={{fontWeight: 'bold'}} justify={'center'} align='center'>星期/时间</Flex>
                <Flex vertical style={{flex: 1, height: '100%'}}>
                    <Flex flex={1} className='bb1ccc' style={{height: '35px'}}>
                        <Flex flex={1} justify='center' align='center' className={'br1ccc'}>
                            <p>00:00 - 12:00</p>
                        </Flex>
                        <Flex flex={1} justify='center' align='center' className={'br1ccc'}>
                            <p>12:00 - 24:00</p>
                        </Flex>
                    </Flex>
                    <Flex flex={1}>
                        {timeTags.map((item) => (
                            <Flex key={item} flex={1} justify='center' align='center'
                                  className={'br1ccc'}
                                  style={{boxSizing: 'border-box'}}
                            >
                                {item}
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};
