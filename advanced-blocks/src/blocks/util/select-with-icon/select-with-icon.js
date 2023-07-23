import Select from "react-select";
import PropTypes from "prop-types";

class SelectWithIcon extends React.Component {
  state = {
    selectedOption: this.props.selectedIcon
  };

  handleChange = selectedOption => {
    const { onSelectIcon } = this.props;

    this.setState({ selectedOption });

    if (selectedOption) {
      onSelectIcon(selectedOption.value);
    }
  };

  labelWithIcon = iconName => (
    <React.Fragment>
      <i className={`fa fa-${iconName}`} />
      <span style={{ paddingLeft: 5 }}>{iconName}</span>
    </React.Fragment>
  );

  generateOptions = iconList => [
    ...iconList.map(iconName => ({
      value: iconName,
      label: this.labelWithIcon(iconName)
    }))
  ];

  render() {
    const { iconList } = this.props;
    const { selectedOption } = this.state;

    // Generate options object from icon list
    const options = this.generateOptions(iconList);

    return (
      <Select
        name="select-with-icon"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        isClearable
        isSearchable
      />
    );
  }
}

SelectWithIcon.propTypes = {
  iconList: PropTypes.array.isRequired,
  onSelectIcon: PropTypes.func.isRequired
};

export default SelectWithIcon;
