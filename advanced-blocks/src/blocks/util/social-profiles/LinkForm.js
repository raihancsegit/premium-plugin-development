import "./style.scss";

const LinkForm = ({ icon, url, onUrlChange, onSubmit }) => (
  <div className="link-form-wrapper">
    <input
      type="text"
      className="social-link-input"
      placeholder={`Enter ${icon} link`}
      value={url}
      onChange={(event, icon) => onUrlChange(event, icon)}
    />
    <button className="save-button" onClick={() => onSubmit(icon)}>
      Save
    </button>
  </div>
);

export default LinkForm;
