import React, { Component } from 'react'
import firebase from 'firebase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default class App extends Component {
    state = {
        value: '',
        dropdownV: '',
        list: [],
        q: [],
    }
    connection = firebase.database().ref('task');
    handleFirebaseValue = (dataSnapshop) => {
        let result = [];
        dataSnapshop.forEach((childSnapshop) => {
            result.push({ ...childSnapshop.val(), key: childSnapshop.key })
        })
        this.setState({ list: result })
    }
    componentDidMount() {
        this.connection.on('value', this.handleFirebaseValue)
    }

    componentWillUnmount() {
        this.connection.off('value', this.handleFirebaseValue)
    }

    handleInput = (e) => {
        this.setState({ value: e.target.value })
    }
    handleDropdownChange = (e) => {
        this.setState({ dropdownV: e.target.value })
    }
    handlePushCompleted = (error) => {
        if (error) {
            /** @todo maybe we can save to local and upload it later? */

        }
        else {
            /** @todo update the local copy key here? */
            this.setState({ value: '' })
        }
    }
    handleSubmit = (e) => {
        if (this.state.value.length !== 0 && this.state.dropdownV.length !== 0) {
            /** @todo we can update the list rightaway  */
            this.connection.push({ status: this.state.dropdownV, desc: this.state.value }, this.handlePushCompleted)
        }
        e.preventDefault();
    }
    onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
    }
    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.value} onChange={this.handleInput}></input>
                    <select value={this.state.dropdownV} onChange={this.handleDropdownChange}>
                        <option value="">-select-</option>
                        <option value="todo">todo</option>
                        <option value="progress">in progress</option>
                        <option value="completed">completed</option>
                    </select>
                    <input type="submit" value="submit" />
                </form>
                <div style={{
                    height: '80vh',
                    width: '100%',
                    maxWidth: '100vw',
                    backgroundColor: '#ffb6c1',
                    padding: '16px 0',
                    overflowX: 'auto',
                    display: 'flex',
                }}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="todo">
                            {(provided, snapshot) => (
                                <div style={{ flex: '0 0 360px', backgroundColor: '#fff', marginLeft: 16, display: 'flex', flexDirection: 'column' }} ref={provided.innerRef}>
                                    <div style={{ height: 50, borderBottom: '1px solid #ccc' }}>Todo</div>
                                    <div style={{ overflow: 'auto', flex: 1 }}>
                                        {this.state.list.filter((item) => item.status === 'todo')
                                            .map((item, index) => (
                                                <Draggable key={item.key} draggableId={item.key} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div style={{ minHeight: 130, borderBottom: '1px solid #ccc', backgroundColor: '#fff' }}>
                                                                {item.desc}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                        {/* <Droppable droppableId="progress"> */}
                        <div style={{ flex: '0 0 360px', backgroundColor: '#fff', marginLeft: 16, display: 'flex', flexDirection: 'column' }}>

                            <div style={{ height: 50, borderBottom: '1px solid #ccc' }}>In Progress</div>
                            <div style={{ overflow: 'auto', flex: 1 }}>
                                {this.state.list.filter((item) => item.status === 'progress').map((item) => (<div key={item.key} style={{ minHeight: 130, borderBottom: '1px solid #ccc' }}>{item.desc}</div>))}

                            </div>

                        </div>
                        {/* </Droppable>
                        <Droppable droppableId="completed"> */}
                        <div style={{ flex: '0 0 360px', backgroundColor: '#fff', marginLeft: 16, display: 'flex', flexDirection: 'column' }}>

                            <div style={{ height: 50, borderBottom: '1px solid #ccc' }}>Completed</div>
                            <div style={{ overflow: 'auto', flex: 1 }}>
                                {this.state.list.filter((item) => item.status === 'completed').map((item) => (<div key={item.key} style={{ minHeight: 130, borderBottom: '1px solid #ccc' }}>{item.desc}</div>))}
                            </div>

                        </div>
                        {/* </Droppable> */}
                    </DragDropContext>
                </div>
            </div>
        )
    }
}