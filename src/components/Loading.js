import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

class Loading extends Component {
    render() {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Loader
                    type="Triangle"
                    color="#D13913"
                    height="100"
                    width="100"
                />
            </div>
        )
    }
}

export default Loading;