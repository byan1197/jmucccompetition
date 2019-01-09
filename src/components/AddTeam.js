import React, { Component } from 'react';
import {
    Input,
    Label,
    Button,
    Container,
    Col,
    Row
} from 'reactstrap'
import { toast } from 'react-toastify'
import Fetcher from '../Fetcher';

class AddTeam extends Component {

    constructor() {
        super()
        this.state = {
            teamName: '',
            university: '',
            judgeName: '',
        }
    }

    handleInputChange = (e, type) => {
        var newState = {};
        newState[type] = e.target.value;
        this.setState(newState)
    }

    submit = () => {
        if (!this.state.teamName || !this.state.judgeName) {
            toast.error('Fields cannot be empty')
            return;
        }
        Fetcher.addTeam({
            teamName: this.state.teamName,
            judgeName: this.state.judgeName,
            university: this.state.university
        }).then(res => {
            if (res.error) {
                toast.error(res.error.message)
                return;
            }
            toast.success(res.success.message)
            this.setState({
                teamName: '',
                university: '',
                judgeName: '',
            })
        })
    }

    render() {
        return (
            <div>
                <h3>Add a team</h3>
                <Container>
                    <Row>
                        <Col md={4} sm={12}>
                            <Label>
                                Team Name:
                                <Input value={this.state.teamName} onChange={e => { this.handleInputChange(e, 'teamName') }}></Input>
                            </Label>
                        </Col>
                        <Col md={4} sm={12}>
                            <Label>
                                Team Alias (Judges will see this):
                                <Input value={this.state.judgeName} onChange={e => { this.handleInputChange(e, 'judgeName') }}></Input>
                            </Label>
                        </Col>
                        <Col md={4} sm={12}>
                            <Label>
                                University:
                                <Input value={this.state.university} onChange={e => { this.handleInputChange(e, 'university') }}></Input>
                            </Label>
                        </Col>
                    </Row>
                </Container>
                <Button className='mt-2' onClick={this.submit} block color='primary'>Submit</Button>
            </div>
        )
    }
}

export default AddTeam;