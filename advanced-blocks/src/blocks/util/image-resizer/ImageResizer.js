import PropTypes from "prop-types";

const { Button } = wp.components;

class ImageResizer extends React.Component {
  state = {
    imageWidth: this.props.width || "",
    imageHeight: this.props.height || ""
  };

  onSizeChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = () => {
    let { imageWidth, imageHeight } = this.state;

    if (!imageWidth && !imageHeight) return;
    if (!imageWidth) {
      imageWidth = imageHeight;
    }
    if (!imageHeight) {
      imageHeight = imageWidth;
    }

    this.props.onSizeChange(imageWidth, imageHeight);
  };

  render() {
    const { imageWidth, imageHeight } = this.state;

    return (
      <div>
        <label>Width</label>
        <input
          type="number"
          name="imageWidth"
          value={imageWidth}
          onChange={this.onSizeChange}
        />
        <label>Height</label>
        <input
          type="number"
          name="imageHeight"
          value={imageHeight}
          onChange={this.onSizeChange}
        />
        <Button className="button" onClick={this.onSubmit}>
          Apply
        </Button>
      </div>
    );
  }
}

ImageResizer.prototypes = {
  onSizeChange: PropTypes.func.isRequired,
  width: PropTypes.any,
  height: PropTypes.any
};

export default ImageResizer;
