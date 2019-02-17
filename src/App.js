import React, { Component } from "react";
import Column from "./components/Column";
/**
 * @todo
 * 1. adding column and task, change order, change type
 */

export default class App extends Component {
  state = {
    value: "",
    dropdownV: "",
    todo: {
      order: ["s1", "s2", "s3", "s4", "s5", "s6", "s7"],
      s1: 21,
      s2: 22,
      s3: 33,
      s4: 44,
      s5: 55,
      s6: 66,
      s7: 77
    },
    column: ["todo", "in progress", "completed"]
  };

  componentDidMount() {}

  componentWillUnmount() {}
  handleInput = e => {
    this.setState({ value: e.target.value });
  };
  handleDropdownChange = e => {
    this.setState({ dropdownV: e.target.value });
  };

  render() {
    return (
      <div>
        {/* <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleInput} />
          <select
            value={this.state.dropdownV}
            onChange={this.handleDropdownChange}
          >
            <option value="">-select-</option>
            {this.state.column.map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <input type="submit" value="submit" />
        </form> */}
        <div
          style={{
            height: "80vh",
            width: "100%",
            maxWidth: "100vw",
            backgroundColor: "#ffb6c1",
            padding: "16px 0",
            overflowX: "auto",
            display: "flex"
          }}
        >
          {/* {this.state.column.map(item => ( */}
          <Column
            title={"todo"}
            data={this.state.todo.order.map(item => this.state.todo[item])}
          />
          {/* ))} */}
        </div>
      </div>
    );
  }
}
