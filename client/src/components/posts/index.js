import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

class Posts extends Component {
    state = {
        post_list: []
    }

    componentDidMount() {

        // load from server
        axios.get('/api/posts')
            .then((res) => {

                var new_list = []
                res.data.posts.forEach((curr) => {
                    new_list.push({'title': curr.title, 'content': curr.content})
                })

                this.setState({ post_list: new_list})
                console.log(new_list)
            })
    }
    render() {
        return (
            <div>
                <h1>Conservation Ideas</h1>
                <div>
                    Estimate your daily Green profile using the following factors:
                </div>
                <div>
                    { this.state.post_list.map(item =>

                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{item.title}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {item.body}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>
            </div>

        );
    }
}

export default Posts;
