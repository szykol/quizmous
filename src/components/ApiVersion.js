import React, { useState, useEffect } from 'react';

export default function ApiVersion() {
    const [version, setVersion] = useState({
        name: "api_name",
        version: "0.0.x",
        build: "x",
    });

    useEffect(() => {
        fetch('http://localhost:3000/version').then(resp => resp.json()).then(
            json => {
                setVersion({
                    name: json.name,
                    version: json.version,
                    build: json.build
                })
            }
        )
    }, []);

    return (
        <h1> API: {version.name} {version.version}-{version.build} </h1>
    )
}