import React, { Component } from "react";
import { switchMap, takeUntil, filter } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
export default class Column extends Component {
  _e = new BehaviorSubject({});
  e = this._e.asObservable();
  mouseDown$ = this.e.pipe(filter(v => v.type === "down"));
  mouseUp$ = this.e.pipe(filter(v => v.type === "up"));
  mouseMove$ = this.e.pipe(filter(v => v.type === "move"));
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.s = this.mouseDown$
      .pipe(switchMap(() => this.mouseMove$.pipe(takeUntil(this.mouseUp$))))
      .subscribe(() => {
        console.log("hehe");
      });
  }
  shouldComponentUpdate() {
    return false;
  }
  handleDown = event => {
    console.log(event, event.scrollLeft)
    console.log(event.clientX, event.clientY)
    const _event = {
      type: "down",
      clientX: event.clientX,
      clientY: event.clientY
    };
    this._e.next(_event);
  };
  handleMove = event => {
    const _event = {
      type: "move",
      clientX: event.clientX,
      clientY: event.clientY
    };
    this._e.next(_event);
  };
  handleUp = event => {
    const _event = {
      type: "up",
      clientX: event.clientX,
      clientY: event.clientY
    };
    this._e.next(_event);
  };

  render() {
    const { data = [], title = "" } = this.props;
    return (
      <div
        style={{
          flex: "0 0 360px",
          backgroundColor: "#fff",
          marginLeft: 16,
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        <div style={{ height: 50, borderBottom: "1px solid #ccc" }}>
          {title}
        </div>
        <div style={{ overflow: "auto", flex: 1 }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                minHeight: 130,
                borderBottom: "1px solid #ccc",
                backgroundColor: "#fff"
              }}
              onMouseDown={this.handleDown}
              onMouseUp={this.handleUp}
              onMouseMove={this.handleMove}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
