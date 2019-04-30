import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInput from '../inputs/TextInput.js';
import SocialInput from '../inputs/SocialInput.js';
import TextArea from '../inputs/TextArea.js';
import SelectList from '../inputs/SelectList.js';
import { profileCreate } from '../../Actions/profileActions.js';


class ProfileCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }

  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    };
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleWebsiteFormat = (websiteString) => {
    if (websiteString === null) {

    }
    if (websiteString.includes("https://") || websiteString.includes("http://")) {
      return websiteString
    } else {
      websiteString = "http://" + websiteString;
      return websiteString
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const profileInput = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }
    this.props.profileCreate(profileInput, this.props.history)
  };

  displaySocialInputs = () => {
    if (this.state.displaySocialInputs) {
      this.setState({
        displaySocialInputs: false
      })
    } else {
      this.setState({
        displaySocialInputs: true
      })
    }
  };

  render() {
    const errors = this.state.errors;
    const displaySocialInputs = this.state.displaySocialInputs;
    let socialInputs;
      if (displaySocialInputs) {
        socialInputs = (
          <div>
            <SocialInput
              placeholder="Twitter Profile URL"
              name="twitter"
              icon="fab fa-twitter"
              value={this.state.twitter}
              onChange={this.handleInputChange}
              error={errors.twitter}
              />
            <SocialInput
              placeholder="Facebook Page URL"
              name="facebook"
              icon="fab fa-facebook"
              value={this.state.facebook}
              onChange={this.handleInputChange}
              error={errors.facebook}
              />
            <SocialInput
              placeholder="Linkedin Profile URL"
              name="linkedin"
              icon="fab fa-linkedin"
              value={this.state.linkedin}
              onChange={this.handleInputChange}
              error={errors.linkedin}
              />
            <SocialInput
              placeholder="YouTube Channel URL"
              name="youtube"
              icon="fab fa-youtube"
              value={this.state.youtube}
              onChange={this.handleInputChange}
              error={errors.youtube}
              />
            <SocialInput
              placeholder="Instagram Page URL"
              name="instagram"
              icon="fab fa-instagram"
              value={this.state.instagram}
              onChange={this.handleInputChange}
              error={errors.instagram}
              />
          </div>
        );
      };
    // select options for status
    const options = [
      { label: '* Select Current Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleFormSubmit}>
                <TextInput
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleInputChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                  />
                <SelectList
                  placeholder="* Status"
                  name="status"
                  options={options}
                  value={this.state.status}
                  onChange={this.handleInputChange}
                  error={errors.status}
                  info="Where are you at in your career?"
                  />
                <TextArea
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleInputChange}
                  error={errors.company}
                  info="Own company or one you work for"
                  />
                <TextArea
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleInputChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                  />
                <TextArea
                  placeholder="location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleInputChange}
                  error={errors.location}
                  info="City or city & state you are located"
                  />
                <TextArea
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleInputChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                  />
                <TextArea
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.handleInputChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                  />
                <TextArea
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleInputChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                  />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.displaySocialInputs}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  {' '}
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  ProfileCreate.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errorMessages,
  })

  export default connect(mapStateToProps, { profileCreate })(
  withRouter(ProfileCreate)
);
