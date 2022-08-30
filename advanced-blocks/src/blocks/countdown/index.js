/**
 * Internal dependencies
 */
import { CountdownIcon } from "../util/icons";
import DateTime from "react-datetime";
import {
  BOX_JUSTIFY_CONTENT,
  BORDER_STYLES,
  DIGIT_FONT_WEIGHT,
  LABEL_TRANSFORM,
  FONT_STYLES,
  FONT_DECORATION,
  TEXT_ALIGN,
} from "./components/constants";
import DimentionControl from "../util/dimention-control/DimentionContol";
import Box from "./components/box";
import BoxContainer from "./components/box-container";

/**
 * Import styles 
 */
import "./style.scss";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, PanelColorSettings } = wp.editor;
const {
  PanelBody,
  ToggleControl,
  TextControl,
  RangeControl,
  SelectControl,
  Button,
  ButtonGroup,
  BaseControl,
} = wp.components;

export const edit = ({ isSelected, attributes, setAttributes }) => {
  const {
    date,
    days,
    hours,
    minutes,
    seconds,
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    daysLabel,
    hoursLabel,
    minutesLabel,
    secondsLabel,
    boxHeight,
    boxWidth,
    boxSpace,
    justifyItems,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    radiusTopLeft,
    radiusTopRight,
    radiusBottomRight,
    radiusBottomLeft,
    showBorder,
    borderSize,
    borderStyle,
    showBoxShadow,
    hOffset,
    vOffset,
    shadowBlur,
    shadowSpread,
    inlineItems,
    digitFontSize,
    digitFontWeight,
    labelTransform,
    labelFontStyle,
    labelFontDecoration,
    labelLineHeight,
    labelLeftPadding,
    boxBackground,
    digitColor,
    labelColor,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    boxTextAlign,
    borderColor,
    shadowColor,
  } = attributes;

  const boxContainerStyle = {
    justifyContent: justifyItems,
  };

  const boxStyle = {
    height: `${boxHeight}px`,
    width: `${boxWidth}px`,
    margin: `0 ${boxSpace}px`,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
    border: showBorder
      ? `${borderSize}px ${borderStyle} ${borderColor}`
      : "none",
    boxShadow: showBoxShadow
      ? `${hOffset}px ${vOffset}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
      : "none",
    borderRadius: `${radiusTopLeft}% ${radiusTopRight}% ${radiusBottomRight}% ${radiusBottomLeft}%`,
    backgroundColor: boxBackground ? boxBackground : "#abb8c3",
  };

  const boxItemStyle = {
    marginTop: `${marginTop}px`,
    marginRight: `${marginRight}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    textAlign: boxTextAlign,
  };

  const digitStyle = {
    fontSize: `${digitFontSize}px`,
    fontWeight: digitFontWeight,
    color: digitColor,
    display: `${inlineItems ? "inline" : "block"}`,
  };

  const labelStyle = {
    textTransform: labelTransform,
    fontStyle: labelFontStyle,
    textDecoration: labelFontDecoration,
    lineHeight: `${labelLineHeight}px`,
    paddingLeft: `${labelLeftPadding}px`,
    color: labelColor,
    display: `${inlineItems ? "inline" : "block"}`,
  };

  const onDateTimeChange = momentObj => {
    let date = momentObj._d;
    let time = date.getTime();

    const counter = () => {
      let now = new Date().getTime();
      let timer = new Date(time - now);

      // Calculate days, hours, minutes and seconds
      let oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * miliseconds
      let days = Math.round((time - now) / oneDay).toString();
      let hours = timer.getHours().toString();
      let minutes = timer.getMinutes().toString();
      let seconds = timer.getSeconds().toString();

      setAttributes({ date, days, hours, minutes, seconds });
    };

    // Clear interval if countdown already exists
    if (window.countdown) {
      clearInterval(window.countdown);
    }
    window.countdown = setInterval(counter, 1000);
  };

  // console.log(attributes.date);

  return [
    isSelected && (
      <InspectorControls key="controls">
        <PanelBody title={__("Timer Setting")}>
          <BaseControl
            id="eb-countdown-due-date"
            label={__("Countdown Due Date")}>
            <DateTime
              value={date}
              onChange={momentObj => onDateTimeChange(momentObj)}
            />
          </BaseControl>
        </PanelBody>

        <PanelBody title={__("Context Setting")}>
          <ToggleControl
            label={__("Display Days")}
            checked={showDays}
            onChange={() => setAttributes({ showDays: !showDays })}
          />

          <ToggleControl
            label={__("Display Hours")}
            checked={showHours}
            onChange={() => setAttributes({ showHours: !showHours })}
          />

          <ToggleControl
            label={__("Display Minutes")}
            checked={showMinutes}
            onChange={() => setAttributes({ showMinutes: !showMinutes })}
          />

          <ToggleControl
            label={__("Display Seconds")}
            checked={showSeconds}
            onChange={() => setAttributes({ showSeconds: !showSeconds })}
          />

          <TextControl
            label={__("Custom Label For Days")}
            value={daysLabel}
            onChange={newValue => setAttributes({ daysLabel: newValue })}
          />
          <TextControl
            label={__("Custom Label For Hours")}
            value={hoursLabel}
            onChange={newValue => setAttributes({ hoursLabel: newValue })}
          />
          <TextControl
            label={__("Custom Label For Minutes")}
            value={minutesLabel}
            onChange={newValue => setAttributes({ minutesLabel: newValue })}
          />
          <TextControl
            label={__("Custom Label For Seconds")}
            value={secondsLabel}
            onChange={newValue => setAttributes({ secondsLabel: newValue })}
          />
        </PanelBody>

        <PanelBody title={__("Box Style")} initialOpen={false}>
          <SelectControl
            label={__("Box Positions")}
            value={justifyItems}
            options={BOX_JUSTIFY_CONTENT}
            onChange={newValue => setAttributes({ justifyItems: newValue })}
          />

          <RangeControl
            label={__("Box Height")}
            value={boxHeight}
            onChange={newValue => setAttributes({ boxHeight: newValue })}
            min={10}
            max={200}
          />

          <RangeControl
            label={__("Box Width")}
            value={boxWidth}
            onChange={newValue => setAttributes({ boxWidth: newValue })}
            min={10}
            max={200}
          />

          <PanelColorSettings
            title={__("Box Background Color")}
            colorSettings={[
              {
                value: boxBackground,
                onChange: newColor =>
                  setAttributes({ boxBackground: newColor }),
                label: __("Box Background Color"),
              },
            ]}
          />

          <ToggleControl
            label={__("Display Inline")}
            checked={inlineItems}
            onChange={() => setAttributes({ inlineItems: !inlineItems })}
          />

          {inlineItems && (
            <RangeControl
              label={__("Left Spacing For Labels")}
              value={labelLeftPadding}
              onChange={newValue =>
                setAttributes({ labelLeftPadding: newValue })
              }
              min={0}
              max={100}
            />
          )}

          <DimentionControl
            label={__("Margin")}
            onChange={({ top, right, bottom, left }) =>
              setAttributes({
                marginTop: top,
                marginRight: right,
                marginBottom: bottom,
                marginLeft: left,
              })
            }
          />

          <DimentionControl
            label={__("Padding")}
            onChange={({ top, right, bottom, left }) =>
              setAttributes({
                paddingTop: top,
                paddingRight: right,
                paddingBottom: bottom,
                paddingLeft: left,
              })
            }
          />

          <DimentionControl
            label={__("Border Radius")}
            onChange={({ top, right, bottom, left }) =>
              setAttributes({
                radiusTopLeft: top,
                radiusTopRight: right,
                radiusBottomRight: bottom,
                radiusBottomLeft: left,
              })
            }
          />

          <RangeControl
            label={__("Space Between Boxes")}
            value={boxSpace}
            onChange={newValue => setAttributes({ boxSpace: newValue })}
            min={0}
            max={100}
          />
          <ToggleControl
            label={__("Display Border")}
            checked={showBorder}
            onChange={() => setAttributes({ showBorder: !showBorder })}
          />

          {showBorder && (
            <PanelColorSettings
              title={__("Border Color")}
              colorSettings={[
                {
                  value: borderColor,
                  onChange: newColor =>
                    setAttributes({ borderColor: newColor }),
                  label: __("Border Color"),
                },
              ]}
            />
          )}

          {showBorder && (
            <RangeControl
              label={__("Border Size")}
              value={borderSize}
              onChange={newValue => setAttributes({ borderSize: newValue })}
              min={0}
              max={100}
            />
          )}
          {showBorder && (
            <SelectControl
              label={__("Border Style")}
              value={borderStyle}
              options={BORDER_STYLES}
              onChange={newValue => setAttributes({ borderStyle: newValue })}
            />
          )}
          <ToggleControl
            label={__("Display Shadow")}
            checked={showBoxShadow}
            onChange={() => setAttributes({ showBoxShadow: !showBoxShadow })}
          />

          {showBoxShadow && (
            <PanelColorSettings
              title={__("Shadow Color")}
              colorSettings={[
                {
                  value: shadowColor,
                  onChange: newColor =>
                    setAttributes({ shadowColor: newColor }),
                  label: __("Shadow Color"),
                },
              ]}
            />
          )}

          {showBoxShadow && (
            <RangeControl
              label={__("Horizontal Offset")}
              value={hOffset}
              onChange={newValue => setAttributes({ hOffset: newValue })}
              min={0}
              max={100}
            />
          )}
          {showBoxShadow && (
            <RangeControl
              label={__("Vertical Offset")}
              value={vOffset}
              onChange={newValue => setAttributes({ vOffset: newValue })}
              min={0}
              max={100}
            />
          )}
          {showBoxShadow && (
            <RangeControl
              label={__("Blur")}
              value={shadowBlur}
              onChange={newValue => setAttributes({ shadowBlur: newValue })}
              min={0}
              max={100}
            />
          )}
          {showBoxShadow && (
            <RangeControl
              label={__("Spread")}
              value={shadowSpread}
              onChange={newValue => setAttributes({ shadowSpread: newValue })}
              min={0}
              max={100}
            />
          )}
        </PanelBody>

        <PanelBody title={__("Text Settings")} initialOpen={false}>
          <BaseControl
            id="eb-countdown-box-text-align"
            label={__("Text Align")}>
            <ButtonGroup id="eb-countdown-box-text-align">
              {TEXT_ALIGN.map(item => (
                <Button
                  isPrimary={boxTextAlign === item.value}
                  isDefault={boxTextAlign !== item.value}
                  onClick={() => setAttributes({ boxTextAlign: item.value })}>
                  {item.label}
                </Button>
              ))}
            </ButtonGroup>
          </BaseControl>

          <PanelColorSettings
            title={__("Digit Color")}
            colorSettings={[
              {
                value: digitColor,
                onChange: newColor => setAttributes({ digitColor: newColor }),
                label: __("Digit Color"),
              },
            ]}
          />

          <RangeControl
            label={__("Digit Font Size")}
            value={digitFontSize}
            onChange={newValue => setAttributes({ digitFontSize: newValue })}
            min={6}
            max={64}
          />

          <SelectControl
            label={__("Digit Font Weight")}
            value={digitFontWeight}
            options={DIGIT_FONT_WEIGHT}
            onChange={newValue => setAttributes({ digitFontWeight: newValue })}
          />

          <PanelColorSettings
            title={__("Label Color")}
            colorSettings={[
              {
                value: labelColor,
                onChange: newColor => setAttributes({ labelColor: newColor }),
                label: __("Label Color"),
              },
            ]}
          />

          <SelectControl
            label={__("Label Transform")}
            value={labelTransform}
            options={LABEL_TRANSFORM}
            onChange={newValue => setAttributes({ labelTransform: newValue })}
          />

          <BaseControl
            id="eb-countdown-box-font-style"
            label={__("Label Font Style")}>
            <ButtonGroup id="eb-countdown-box-font-style">
              {FONT_STYLES.map(item => (
                <Button
                  isPrimary={labelFontStyle === item.value}
                  isDefault={labelFontStyle !== item.value}
                  onClick={() => setAttributes({ labelFontStyle: item.value })}>
                  {item.label}
                </Button>
              ))}
            </ButtonGroup>
          </BaseControl>

          <SelectControl
            label={__("Label Font Decoration")}
            value={labelFontDecoration}
            options={FONT_DECORATION}
            onChange={newValue =>
              setAttributes({ labelFontDecoration: newValue })
            }
          />

          <RangeControl
            label={__("Line Height")}
            value={labelLineHeight}
            onChange={newValue => setAttributes({ labelLineHeight: newValue })}
            min={0}
            max={100}
          />
        </PanelBody>
      </InspectorControls>
    ),
    // Edit view here
    <BoxContainer boxContainerStyle={boxContainerStyle}>
      {showDays && (
        <Box
          boxName="days"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          label={daysLabel}
          digit={days}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      )}
      {showHours && (
        <Box
          boxName="hours"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          digit={hours}
          digitStyle={digitStyle}
          label={hoursLabel}
          labelStyle={labelStyle}
        />
      )}
      {showMinutes && (
        <Box
          boxName="minutes"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          label={minutesLabel}
          digit={minutes}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      )}
      {showSeconds && (
        <Box
          boxName="seconds"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          label={secondsLabel}
          digit={seconds}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      )}
    </BoxContainer>,
  ];
};

export const save = ({ attributes }) => {
  const {
    date,
    days,
    hours,
    minutes,
    seconds,
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    daysLabel,
    hoursLabel,
    minutesLabel,
    secondsLabel,
    boxHeight,
    boxWidth,
    boxSpace,
    justifyItems,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    radiusTopLeft,
    radiusTopRight,
    radiusBottomRight,
    radiusBottomLeft,
    showBorder,
    borderSize,
    borderStyle,
    hOffset,
    vOffset,
    shadowBlur,
    shadowSpread,
    inlineItems,
    digitFontSize,
    digitFontWeight,
    labelTransform,
    labelFontStyle,
    labelFontDecoration,
    labelLineHeight,
    labelLeftPadding,
    boxBackground,
    digitColor,
    labelColor,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    boxTextAlign,
    borderColor,
    showBoxShadow,
    shadowColor,
  } = attributes;

  const boxContainerStyle = {
    justifyContent: justifyItems,
  };

  const boxStyle = {
    height: `${boxHeight}px`,
    width: `${boxWidth}px`,
    margin: `0 ${boxSpace}px`,
    padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
    border: showBorder
      ? `${borderSize}px ${borderStyle} ${borderColor}`
      : "none",
    boxShadow: showBoxShadow
      ? `${hOffset}px ${vOffset}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
      : "none",
    borderRadius: `${radiusTopLeft}% ${radiusTopRight}% ${radiusBottomRight}% ${radiusBottomLeft}%`,
    backgroundColor: boxBackground,
  };

  const boxItemStyle = {
    marginTop: `${marginTop}px`,
    marginRight: `${marginRight}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    textAlign: boxTextAlign,
    lineHeight: "normal", // Add this line to fix box line height
  };

  const digitStyle = {
    fontSize: `${digitFontSize}px`,
    fontWeight: `${digitFontWeight}`,
    color: digitColor,
    display: `${inlineItems ? "inline" : "block"}`,
  };

  const labelStyle = {
    textTransform: labelTransform,
    fontStyle: labelFontStyle,
    textDecoration: labelFontDecoration,
    lineHeight: `${labelLineHeight}px`,
    paddingLeft: `${labelLeftPadding}px`,
    color: labelColor,
    display: `${inlineItems ? "inline" : "block"}`,
  };

  return (
    <BoxContainer boxContainerStyle={boxContainerStyle}>
      <div
        className="eb-countdown-get-date"
        style={{ display: "none" }}
        data-date={date ? date.toString() : ""}
      />
      {showDays && (
        <Box
          boxName="days"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          label={daysLabel}
          digit={days}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      )}
      {showHours && (
        <Box
          boxName="hours"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          label={hoursLabel}
          digit={hours}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      )}
      {showMinutes && (
        <Box
          boxName="minutes"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          label={minutesLabel}
          digit={minutes}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      )}
      {showSeconds && (
        <Box
          boxName="seconds"
          boxStyle={boxStyle}
          boxItemStyle={boxItemStyle}
          label={secondsLabel}
          digit={seconds}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      )}
    </BoxContainer>
  );
};

registerBlockType("advanced-blocks/countdown", {
  title: __("Countdown"),
  icon: CountdownIcon,
  category: 'advanced-blocks',
  attributes: {
    date: {
      type: "string",
      source: "attribute",
      selector: ".eb-countdown-get-date",
      attribute: "data-date",
    },
    days: {
      type: "string",
      source: "text",
      selector: ".eb-countdown-digits-days",
    },
    months: {
      type: "string",
      source: "text",
      selector: ".eb-countdown-digits-months",
    },
    hours: {
      type: "string",
      source: "text",
      selector: ".eb-countdown-digits-hours",
    },
    minutes: {
      type: "string",
      source: "text",
      selector: ".eb-countdown-digits-minutes",
    },
    seconds: {
      type: "string",
      source: "text",
      selector: ".eb-countdown-digits-seconds",
    },
    showDays: {
      type: "boolean",
      default: true,
    },
    showHours: {
      type: "boolean",
      default: true,
    },
    showMinutes: {
      type: "boolean",
      default: true,
    },
    showSeconds: {
      type: "boolean",
      default: true,
    },
    daysLabel: {
      type: "string",
      default: "Days",
    },
    hoursLabel: {
      type: "string",
      default: "Hours",
    },
    minutesLabel: {
      type: "string",
      default: "Minutes",
    },
    secondsLabel: {
      type: "string",
      default: "Seconds",
    },
    boxHeight: {
      type: "number",
      default: 100,
    },
    boxWidth: {
      type: "number",
      default: 120,
    },
    boxSpace: {
      type: "number",
      default: 10,
    },
    justifyItems: {
      type: "string",
      default: "center",
    },
    paddingTop: {
      type: "number",
      default: 0,
    },
    paddingRight: {
      type: "number",
      default: 0,
    },
    paddingBottom: {
      type: "number",
      default: 0,
    },
    paddingLeft: {
      type: "number",
      default: 0,
    },
    radiusTopLeft: {
      type: "number",
      default: 0,
    },
    radiusTopRight: {
      type: "number",
      default: 0,
    },
    radiusBottomRight: {
      type: "number",
      default: 0,
    },
    radiusBottomLeft: {
      type: "number",
      default: 0,
    },
    showBorder: {
      type: "boolean",
      default: false,
    },
    borderSize: {
      type: "number",
      default: 0,
    },
    borderStyle: {
      type: "string",
      default: "solid",
    },
    showBoxShadow: {
      type: "boolean",
      default: false,
    },
    hOffset: {
      type: "number",
      default: 0,
    },
    vOffset: {
      type: "number",
      default: 0,
    },
    shadowBlur: {
      type: "number",
      default: 0,
    },
    shadowSpread: {
      type: "number",
      default: 0,
    },
    inlineItems: {
      type: "boolean",
      default: true,
    },
    digitFontSize: {
      type: "number",
      default: 18,
    },
    digitFontWeight: {
      type: "number",
      default: 200,
    },
    labelTransform: {
      type: "string",
      default: "none",
    },
    labelFontStyle: {
      type: "string",
      default: "normal",
    },
    labelFontDecoration: {
      type: "string",
      default: "initial",
    },
    labelLineHeight: {
      type: "number",
      default: 0,
    },
    labelLeftPadding: {
      type: "number",
      default: 0,
    },
    boxBackground: {
      type: "string",
	  default: '#FFF',
    },
    digitColor: {
      type: "string",
    },
    labelColor: {
      type: "string",
    },
    daysBoxBackground: {
      type: "string",
    },
    marginTop: {
      type: "number",
      default: 0,
    },
    marginRight: {
      type: "number",
      default: 0,
    },
    marginBottom: {
      type: "number",
      default: 0,
    },
    marginLeft: {
      type: "number",
      default: 0,
    },
    boxTextAlign: {
      type: "string",
      default: "center",
    },
  },
  edit: edit,
  save: save,
});
