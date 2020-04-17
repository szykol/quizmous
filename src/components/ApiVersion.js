import React from 'react';

class ApiVersion extends React.Component {
    state = {
        name: "api_name",
        version: "0.0.x",
        fetched: false
    }
    
    fetch_api_version = async () => {
        try {
            let payload = await fetch('http://localhost:8000/').then(resp => resp.json());
            this.setState({
                name: payload["name"],
                version: payload["version"],
                fetched: true
            });
        } catch {
            console.log("Fetching info from API has failed");
        }
        
    }

    render() {
        if (!this.state.fetched)
            this.fetch_api_version();
        return (
            <h1> API: {this.state.name} {this.state.version} </h1>
        )
    }
}

export default ApiVersion;