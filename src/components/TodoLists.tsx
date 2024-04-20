import React, { useState } from 'react'
import uuid from 'react-uuid'

type TodoItem = {
    item: string
    id: string
}

const TodoLists = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [lists, setLists] = useState<TodoItem[]>([])
    const [editItemId, setEditItemId] = useState<string | null>(null)
    const [deletedItem, setDeletedItem] = useState<TodoItem[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = () => {
        if (inputValue === '') {
            alert('Enter the input Value')
        } else if (inputValue !== '') {
            const newId = uuid()
            const TodoItem = {
                id: newId,
                item: inputValue
            }
            setLists([...lists, TodoItem])
            setInputValue('')
        }
    }

    const handleDelete = (id: string) => {
        const newLists = lists.filter((list) => list.id !== id)
        const itemDeleted = lists.find((list) => list.id === id)
        setLists(newLists)
        if (editItemId === id) {
            setEditItemId(null)
        }
        if (itemDeleted) {
            setDeletedItem([...deletedItem, itemDeleted])
        }
    }

    const handleEdit = (id: string) => {
        setEditItemId(id)
    }
    const handleUpdate = (id: string, newValue: string) => {
        const updateList = lists.map((list) =>
            list.id === id ? { ...list, list: newValue } : list
        )
        setLists(updateList)
        setEditItemId(null)
    }
    const handleInputValue = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const updateInputValue = lists.map((list) =>
            list.id === id ? { ...list, list: e.target.value } : list
        )
        setLists(updateInputValue)
    }
    return (
        <>
            <div>
                <h1>Todo Lists</h1>
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        placeholder="Enter the item..."
                        onChange={handleChange}
                    />

                    <input
                        type="button"
                        value="Submit"
                        onClick={handleSubmit}
                    />
                </div>
                <div>
                    {lists.map((list) => {
                        return (
                            <ul key={list.id} className="list-container">
                                <input type="checkbox" name="" id="" />
                                <div>
                                    {editItemId === list.id ? (
                                        <input
                                            type="text"
                                            value={list.item}
                                            onChange={(e) => {
                                                handleInputValue(e, list.id)
                                            }}
                                        />
                                    ) : (
                                        list.item
                                    )}
                                </div>
                                <input
                                    type="button"
                                    value="Delete"
                                    onClick={() => handleDelete(list.id)}
                                />
                                {editItemId === list.id ? (
                                    <input
                                        type="button"
                                        value="Update"
                                        onClick={() =>
                                            handleUpdate(list.id, list.item)
                                        }
                                    />
                                ) : (
                                    <input
                                        type="button"
                                        value="Edit"
                                        onClick={() => handleEdit(list.id)}
                                    />
                                )}
                            </ul>
                        )
                    })}
                </div>
                <div>
                    <h3>
                        Completed Items <span>{deletedItem.length}</span>
                    </h3>
                    <div>
                        {' '}
                        {deletedItem.map((item) => {
                            return (
                                <ul key={item.id}>
                                    <input type="checkbox" name="" id="" />
                                    <div>{item.item}</div>
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoLists
