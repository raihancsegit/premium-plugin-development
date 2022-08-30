import PropTypes from "prop-types";
import SelectWithIcon from "../select-with-icon/select-with-icon";
import iconList from "./iconList";
import { arrayMove } from "react-sortable-hoc";
import "./style.scss";
import SortableComponent from "./SortableComponent";

class SocialProfiles extends React.Component {
  state = {
    iconList: this.props.iconList || iconList,
    profiles: this.props.profiles || [], //example profiles: [{ icon: 'facebook', link: 'www.fb.com/john', isExpanded: false}]
    selectedIcon: "",
    url: ""
  };

  onSelectIcon = selectedIcon => {
    // When a social profile icon is selected, store it in state and pass it
    // to the callback function
    let profiles = [
      ...this.state.profiles,
      { icon: selectedIcon, link: "", isExpanded: false }
    ];

    this.setState({ profiles });
    this.props.onProfileAdd(profiles);
  };

  onDeleteProfile = icon => {
    // Remove clicked social profile, store rest of the
    // profiles in state, and pass deleted profile name to the callback function
    let profiles = [...this.state.profiles];
    profiles = profiles.filter(profile => profile.icon != icon);

    this.setState({ profiles });
    this.props.onProfileAdd(profiles);
  };

  onProfileClick = icon => {
    // When a profile is clicked, expand/collapse link input form and
    // store profile icon name, url in state
    let profiles = [...this.state.profiles];
    let url = this.state.url;
    let selectedIcon = icon;

    profiles = profiles.map(profile => {
      if (profile.icon === icon) {
        url = profile.link;
        return { ...profile, isExpanded: !profile.isExpanded };
      }

      return { ...profile, isExpanded: false };
    });

    this.setState({ profiles, selectedIcon, url });
  };

  onUrlChange = event => this.setState({ url: event.target.value });

  onSubmit = icon => {
    // When new link is submitted, store it in profile object, collapse input form and
    // pass updated profiles to callback function
    let profiles = [...this.state.profiles];
    let url = this.state.url;

    profiles = profiles.map(
      profile =>
        profile.icon === icon
          ? { ...profile, link: url, isExpanded: false }
          : profile
    );

    this.setState({ profiles, url: "" });
    this.props.onProfileAdd(profiles);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    // Rearrange profiles array after drag and drop, pass
    // updated array to edit view
    let profiles = arrayMove(this.state.profiles, oldIndex, newIndex);

    this.setState({ profiles });
    this.props.onProfileAdd(profiles);
  };

  render() {
    const { iconList, selectedIcon, url, profiles } = this.state;

    return (
      <div>
        <label>Add Social Media</label>
        <SelectWithIcon
          iconList={iconList}
          selectedIcon={selectedIcon}
          onSelectIcon={this.onSelectIcon}
        />

        <SortableComponent
          profiles={profiles}
          onProfileClick={this.onProfileClick}
          onDeleteProfile={this.onDeleteProfile}
          selectedIcon={selectedIcon}
          url={url}
          onUrlChange={this.onUrlChange}
          onSubmit={this.onSubmit}
          onProfileAdd={this.onProfileAdd}
          onSortEnd={this.onSortEnd}
        />
      </div>
    );
  }
}

SocialProfiles.propTypes = {
  iconList: PropTypes.array,
  profiles: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    link: PropTypes.string,
    isExpanded: PropTypes.bool.isRequired
  }),
  onProfileAdd: PropTypes.func.isRequired
};

export default SocialProfiles;
