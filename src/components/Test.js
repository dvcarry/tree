import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card } from 'antd'
import { Car } from './Car'
import { Garage } from './Garage'


export const Test = () => {
    
    const carsArray = Array(7).fill().map((item, index) => index)

    const cars = carsArray.map(item => <Car title={`Car #${item}`}/>)
    
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {/* <Car title={'wwww'}/>
                <Car title={'dddd'}/> */}
                {cars}
                <Garage />
            </div>
                
        </DndProvider>
    )
}