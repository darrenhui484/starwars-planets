import React from "react"
import './dropdown.scss'

interface IDropdownProps {
    items: Array<string>,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Dropdown({ items, value, onChange }: IDropdownProps) {

    return (
        <label className='dropdown'>
            Selected Attribute:
            <select value={value} onChange={onChange}>
                {items.map((item, index) => <option key={index}>{item}</option>)}
            </select>
        </label>
    )
}