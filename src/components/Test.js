import React from 'react'

import { Card } from 'antd'
import { Car } from './Item'
import { Garage } from './Garage'
import { Description } from './Description'


export const Test = () => {
    
    const carsArray = Array(7).fill().map((item, index) => index)

    const cars = carsArray.map(item => <Car title={`Car #${item}`}/>)
    
    return (

            <div>
                {/* <Car title={'wwww'}/>
                <Car title={'dddd'}/> */}
                {/* {cars} */}
                {/* <Garage /> */}
                <Description />
            </div>
            
                

    )
}