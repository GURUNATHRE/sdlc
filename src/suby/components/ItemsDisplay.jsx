import React, { useState } from 'react'
import itemData from '../../suby/data'

const ItemsDisplay = () => {
    const [displayItem, setDisplayItem] = useState(itemData)


    return (
        <div className="itemSection">
            {displayItem.map((item, index) => (
                <div className="gallery" key={index}>
                    <img src={item.item_img} alt={item.item_img} />
                </div>
            ))}

        </div>
    )
}

export default ItemsDisplay