import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { Car } from './Item'
import { Tabs } from 'antd'
import { items } from '../helpers/constants';
const { TabPane } = Tabs;

export const Garage = () => {



    const [collectedProps, drop] = useDrop({
        accept: 'car',
        drop: item => {
            console.log(item)
            // addCar(item.title)
        }
    })

    // const addCar = item => {
    //     if (!cars.includes(item)) {
    //         setCars([...cars, item])
    //     }

    // }



    const tabs = items.map(item => {
        return (
            <TabPane tab={item} key={item}>
                Content of Tab Pane 1
            </TabPane>
        )
    })

    return (
        <Tabs defaultActiveKey="1">
            {tabs}
        </Tabs>

    )
}