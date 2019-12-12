import React, { Component } from 'react';

module.exports = {
    externals: {
    sqlite3: 'commonjs2 sqlite3',
},
}
try {
    //const sqlite3 = require('sqlite3').verbose();
}
catch {
    console.log("Error!");
}

class AdminPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <span>HELLO</span>
            </div>
        );
    }
}

export default AdminPage;