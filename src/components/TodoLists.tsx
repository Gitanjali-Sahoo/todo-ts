import React, { useState } from 'react'
import uuid from 'react-uuid'

type TodoItem = {
    item: string
    id: string
    completed: boolean
}

const TodoLists = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [lists, setLists] = useState<TodoItem[]>([])
    const [editItemId, setEditItemId] = useState<string | null>(null)
    const [deletedItems, setDeletedItems] = useState<TodoItem[]>([])
    const [completedItems, setCompletedItems] = useState<TodoItem[]>([])

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
                item: inputValue,
                completed: false
            }
            setLists([...lists, TodoItem])
            setInputValue('')
        }
    }

    const handleDelete = (id: string) => {
        const newLists = lists.filter((list) => list.id !== id)
        const itemsDeleted = lists.find((list) => list.id === id)
        setLists(newLists)
        const updateCompltedValue = completedItems.filter(
            (item) => item.id !== id
        )
        setCompletedItems(updateCompltedValue)

        if (editItemId === id) {
            setEditItemId(null)
        }
        if (itemsDeleted) {
            setDeletedItems([...deletedItems, itemsDeleted])
        }
    }

    const handleEdit = (id: string) => {
        setEditItemId(id)
    }
    const handleUpdate = (id: string, newValue: string) => {
        const updateList = lists.map((list) =>
            list.id === id ? { ...list, item: newValue } : list
        )
        setLists(updateList)

        setEditItemId(null)
    }
    const handleInputValue = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const updateInputValue = lists.map((list) =>
            list.id === id ? { ...list, item: e.target.value } : list
        )
        setLists(updateInputValue)
    }

    const handleCheck = (id: string) => {
        const updatedItems = lists.map((list) =>
            list.id === id ? { ...list, completed: !list.completed } : list
        )
        const removeCompletedTask = updatedItems.filter(
            (item) => item.id !== id
        )
        setLists(removeCompletedTask)

        const completedTask = updatedItems.find((item) => item.id === id)
        if (completedTask) {
            setCompletedItems([...completedItems, completedTask])
        }
    }

    const handleUncheck = (id: string) => {
        const uncheckedItemIndex = completedItems.findIndex(
            (item) => item.id === id
        )

        if (uncheckedItemIndex !== -1) {
            const updatedCompletedItems = [...completedItems]
            const [uncheckedTask] = updatedCompletedItems.splice(
                uncheckedItemIndex,
                1
            )

            uncheckedTask.completed = false
            setLists([...lists, uncheckedTask])
            setCompletedItems(updatedCompletedItems)
        }
    }
    return (
        <>
            <div>
                <h1>Todo Lists</h1>
                <div className="input-container">
                    <input
                        type="text"
                        value={inputValue}
                        className="input-field"
                        placeholder="Enter the item..."
                        onChange={handleChange}
                    />

                    <input
                        type="button"
                        value="Submit"
                        className="submit-button"
                        onClick={handleSubmit}
                    />
                </div>
                <div>
                    <div>
                        {lists.map((list) => {
                            return (
                                <ul key={list.id} className="list-container">
                                    <input
                                        type="checkbox"
                                        className="check-box"
                                        onChange={() => handleCheck(list.id)}
                                    />

                                    <div>
                                        {editItemId === list.id ? (
                                            <input
                                                className="edit-field"
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
                                        className="delete-button"
                                        onClick={() => handleDelete(list.id)}
                                    />
                                    {editItemId === list.id ? (
                                        <input
                                            className="update-button"
                                            type="button"
                                            value="Update"
                                            onClick={() =>
                                                handleUpdate(list.id, list.item)
                                            }
                                        />
                                    ) : (
                                        <input
                                            className="update-button"
                                            type="button"
                                            value="Edit"
                                            onClick={() => handleEdit(list.id)}
                                        />
                                    )}
                                </ul>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h3>
                        Completed Items <span>{completedItems.length}</span>
                    </h3>
                    <div>
                        {' '}
                        {completedItems.map((item) => {
                            return (
                                <ul
                                    key={item.id}
                                    className="deletedItem-container"
                                >
                                    <input
                                        type="checkbox"
                                        className="check-box"
                                        onChange={() => handleUncheck(item.id)}
                                        defaultChecked={item.completed}
                                    />
                                    <div
                                        style={{
                                            textDecoration: 'line-through'
                                        }}
                                    >
                                        {item.item}
                                    </div>
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
