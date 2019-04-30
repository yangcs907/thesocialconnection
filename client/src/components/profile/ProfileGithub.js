import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: 'c9057f396004e561ec78',
      clientSecret: 'dc7332b91ec76b96cb816b37266fb27adbced782',
      repoCount: 5,
      sort: 'created: ascending',
      repos: []
    }
  };

  componentDidMount() {
    const username = this.props.username;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(res => res.json())
    .then(data => {
      if (this.refs.myRef) {
        this.setState({
          repos: data
        })
      }
    }).catch(err => {
      console.log(err)
    });

  };

  handleWebLinkFormat = (webString) => {
    if (webString.includes("https://") || webString.includes("http://")) {
      return webString
    } else {
      webString = "http://" + webString;
      return webString
    }
  };
  render() {

    const repos = this.state.repos;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="bade badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="bade badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="bade badge-info mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
    return (
      <div ref="myRef">
        <h3 className="mb-4 mt-4">Latest Github Repositories</h3>
        {repoItems}
      </div>
    )
  }
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
