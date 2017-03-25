import React, { Component } from 'react';

export default class UserRepos extends Component {
    render(){
        return (
            <div>
                <p> GIT仓库 </p>
                <p> REPOS: {this.props.repos}</p>
            </div>
        )
    }
}