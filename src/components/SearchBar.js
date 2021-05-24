import React from 'react'


export default function SearchBar() {
    return (
        <div>
            <input type="text" placeholder="Search" id="nameField" />
            Sausages: <input type="number" value="0" max="5" min="0" /> to <input type="number" value="5" max="5" min="0" />
            Ruffalos: <input type="number" value="0" max="5" min="0" /> to <input type="number" value="5" max="5" min="0" />

        </div>
    )
}