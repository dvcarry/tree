import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { Car } from './Car'

export const Garage = () => {

    const [cars, setCars] = useState([])

    const [collectedProps, drop] = useDrop({
        accept: 'car',
        drop: item => {
            console.log(item)
            addCar(item.title)
        }
      })

    const addCar = item => {
        if (!cars.includes(item)) {
            setCars([...cars, item])
        }
        
    }

    const carsElements = cars.map(item => <Car title={item} />)

    return (
        <div className="garage" ref={drop}>
            {carsElements}
        </div>
    )
}