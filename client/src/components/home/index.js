import React, { Component } from 'react';
import Posts from "../posts";


class Home extends Component {
    render() {
        return (
            <div>
                <h1>Make an Impact!</h1>
                <div>
                    Do you want to make an impact on conservation and help to keep our planet green! MyGreenProfile allows you to track ways to conserve and to help teach others as well. Come back soon to find out more!
                </div>
                <Posts/>
            </div>

        );
    }
}

export default Home;
