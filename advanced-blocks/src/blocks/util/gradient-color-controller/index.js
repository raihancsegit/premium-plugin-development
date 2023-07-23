import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { GRADIENT_TYPE, RADIAL_TYPES } from "./constants";

const { PanelColorSettings } = wp.editor;

const { __ } = wp.i18n;

const { RangeControl, BaseControl, Button, ButtonGroup } = wp.components;

class GradientColorControl extends Component {
  state = {
    gradientType: "linear",
    colorOne: "transparent",
    colorOnePosition: 0,
    colorTwo: "transparent",
    colorTwoPosition: 100,
    angle: 0,
    radialShape: "ellipse",
    radialX: 50,
    radialY: 50,
  };

  getColorString = () => {
    const {
      colorOne,
      colorOnePosition,
      colorTwo,
      colorTwoPosition,
    } = this.state;

    return `${colorOne} ${colorOnePosition}% ,  ${colorTwo} ${colorTwoPosition}%`;
  };

  getRadialGradient = () => {
    const { radialShape, radialX, radialY } = this.state;
    return `radial-gradient(${radialShape} at ${radialX}% ${radialY}%, ${this.getColorString()})`;
  };

  getLinearGradient = () =>
    `linear-gradient(${this.state.angle}deg, ${this.getColorString()})`;

  generateString = () => {
    // Send linear or radial gradiant string to parent
    this.props.onChange(
      this.state.gradientType === "linear"
        ? this.getLinearGradient()
        : this.getRadialGradient(),
    );
  };

  onGradientChange = (attributeName, value) => {
    this.setState({ [attributeName]: value }, () => this.generateString());
  };

  render() {
    const {
      gradientType,
      colorOne,
      colorOnePosition,
      colorTwo,
      colorTwoPosition,
      angle,
      radialShape,
      radialX,
      radialY,
    } = this.state;

    return (
      <div>
        <BaseControl label={__("Gradient Type")}>
          <ButtonGroup>
            {GRADIENT_TYPE.map(item => (
              <Button
                isLarge
                isPrimary={gradientType === item.value}
                isDefault={gradientType !== item.value}
                onClick={() =>
                  this.onGradientChange("gradientType", item.value)
                }>
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </BaseControl>

        {gradientType === "radial" && (
          <BaseControl label={__("Radial Type")}>
            <ButtonGroup>
              {RADIAL_TYPES.map(item => (
                <Button
                  isLarge
                  isPrimary={radialShape === item.value}
                  isDefault={radialShape !== item.value}
                  onClick={() =>
                    this.onGradientChange("radialShape", item.value)
                  }>
                  {item.label}
                </Button>
              ))}
            </ButtonGroup>
          </BaseControl>
        )}

        <PanelColorSettings
          title={__("First Color")}
          colorSettings={[
            {
              value: colorOne,
              onChange: newColor => this.onGradientChange("colorOne", newColor),
              label: __("First Color"),
            },
          ]}
        />

        <RangeControl
          label={__("First Color Position")}
          value={colorOnePosition}
          onChange={newValue =>
            this.onGradientChange("colorOnePosition", newValue)
          }
          min={0}
          max={100}
        />

        <PanelColorSettings
          title={__("Second Color")}
          colorSettings={[
            {
              value: colorTwo,
              onChange: newColor => this.onGradientChange("colorTwo", newColor),
              label: __("Second Color"),
            },
          ]}
        />

        <RangeControl
          label={__("Second Color Position")}
          value={colorTwoPosition}
          onChange={newValue =>
            this.onGradientChange("colorTwoPosition", newValue)
          }
          min={0}
          max={100}
        />

        {gradientType === "linear" && (
          <RangeControl
            label={__("Angle")}
            value={angle}
            onChange={newValue => this.onGradientChange("angle", newValue)}
            min={0}
            max={360}
          />
        )}

        {gradientType === "radial" && (
          <Fragment>
            <RangeControl
              label={__("Center X position")}
              value={radialX}
              onChange={newValue => this.onGradientChange("radialX", newValue)}
              min={0}
              max={100}
            />

            <RangeControl
              label={__("Center Y position")}
              value={radialY}
              onChange={newValue => this.onGradientChange("radialY", newValue)}
              min={0}
              max={100}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

GradientColorControl.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default GradientColorControl;
