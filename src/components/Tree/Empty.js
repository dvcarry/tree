import React from 'react'

export const Empty = ({ last }) => {

    let classes = ['empty']
    if (last) {
        classes.push('last')
    }

    return (
        <span className={classes.join(' ')} />
    )
}