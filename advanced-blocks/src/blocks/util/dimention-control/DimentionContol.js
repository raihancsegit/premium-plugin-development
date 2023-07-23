import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.scss";

class DimentionControl extends Component {
  state = {
    top: this.props.top || "0",
    right: this.props.right || "0",
    bottom: this.props.bottom || "0",
    left: this.props.bottom || "0",
    isLinked: false,
  };

  onButtonClick = () => this.setState({ isLinked: !this.state.isLinked });

  onInputChange = event => {
    let { top, right, bottom, left, isLinked } = this.state;
    let { name, value } = event.target;

    if (isLinked) {
      top = right = bottom = left = value;
      this.setState({ top, right, bottom, left });
    } else {
      this.setState({ [name]: value });
    }

    this.props.onChange({ top, right, bottom, left });
  };

  render() {
    const { top, right, bottom, left, isLinked } = this.state;

    return (
      <div className="dimention-container">
        <div className="dimention-label">{this.props.label}</div>

        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="number"
              name="top"
              value={top}
              onChange={this.onInputChange}
            />
            <label>Top</label>
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              name="right"
              value={right}
              onChange={this.onInputChange}
            />
            <label>Right</label>
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              name="bottom"
              value={bottom}
              onChange={this.onInputChange}
            />
            <label>Bottom</label>
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              name="left"
              value={left}
              onChange={this.onInputChange}
            />
            <label>Left</label>
          </div>
          <div className="input-wrapper">
            <button
              className={`components-button is-button dashicons dashicons-${
                isLinked ? "admin-links is-primary" : "editor-unlink is-default"
              }`}
              onClick={this.onButtonClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

DimentionControl.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DimentionControl;
