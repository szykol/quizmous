import React from 'react';

class ApiVersion extends React.Component {
    state = {
        name: "api_name",
        version: "0.0.x",
        build: "x",
        fetched: false
    }
    
    fetch_api_version = async () => {
        try {
            let payload = await fetch('http://localhost:3000/version').then(resp => resp.json());
            this.setState({
                name: payload["name"],
                version: payload["version"],
                build: payload["build"],
                fetched: true
            });
        } catch (err) {
            console.log("Fetching info from API has failed", err);
        }
        
    }

    render() {
        if (!this.state.fetched)
            this.fetch_api_version();
        return (
            <h1> API: {this.state.name} {this.state.version}-{this.state.build} </h1>
        )
    }
}

export default ApiVersion;