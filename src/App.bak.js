import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import firebase from 'firebase';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// const connection = firebase.database().ref('task')


function App() {
  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  // console.log(connection)
  // useEffect(function () {
  //   connection.once('value').then((snapshot) => {
  //     let result = []

  //     snapshot.forEach(function (childSnapshot) {
  //       result.push(childSnapshot.val())
  //     })
  //     setList(result)
  //   })
  // })
  function handleInput(e) {
    setValue(e.target.value)
  }
  // function onDragEnd(result) {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }

  //   const l = reorder(
  //     list,
  //     result.source.index,
  //     result.destination.index
  //   );
  //   setList(l)
  // }
  return (
    <div>
      <input value={value} onChange={handleInput}></input>
      <button type="button">create</button>
      <div style={{
        height: '80vh',
        width: '100%',
        backgroundColor: '#ffb6c1'
      }}>

      </div>

      {list.map((i) => (<div>i</div>))}

      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dropableid">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {list.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}



    </div>
  )
}

export default App;
