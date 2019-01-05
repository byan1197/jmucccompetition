import React, { Component } from 'react';
import {
    Input,
    Label,
    Button,
    Container,
    Col,
    Row
} from 'reactstrap'
import Fetcher from '../Fetcher';
import { toast } from 'react-toastify'

class AddMatch extends Component {

    constructor() {
        super()
        this.state = {
            team1: '',
            team2: '',
            teamList: []
        }
    }
    componentDidMount() {
        Fetcher.getAllTeams()
            .then(res => {
                this.setState({
                    teamList: res,
                    team1: res.length === 0? '' : res[0].teamName,
                    team2: res.length === 0? '' : res[1].teamName,
                })
            })
    }

    selectTeam = (e, num) => {
        var newState = {}
        newState['team' + num] = e.target.value
        this.setState(newState)
    }

    submit = () => {
        var body = {
            team1Name: this.state.team1,
            team2Name: this.state.team2
        }
        Fetcher.createMatch(body).then(res => {
            if (res.error) {
                toast.error(res.error.message)
                return;
            }
            toast.success(res.success.message)
        })
    }

    render() {
        return (
            <div>
                <h3>Add match</h3>
                <Container>
                    <Row>
                        <Col md={6} sm={12}>
                            <Label>
                                Team 1:
                                <Input type='select' onChange={e => { this.selectTeam(e, 1) }} value={this.state.team1}>
                                    {this.state.teamList.map((t, i) => <option disabled={this.state.team1 === t.teamName || this.state.team2 === t.teamName} key={i}>{t.teamName}</option>)}
                                </Input>
                            </Label>
                        </Col>
                        <Col md={6} sm={12}>
                            <Label>
                                Team 2:
                                <Input type='select' onChange={e => { this.selectTeam(e, 2) }} value={this.state.team2}>
                                    {this.state.teamList.map((t, i) => <option disabled={this.state.team1 === t.teamName || this.state.team2 === t.teamName} key={i}>{t.teamName}</option>)}
                                </Input>
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} sm={12} className='pt-2'>
                            <Button onClick={this.submit} block color='primary'>Submit</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AddMatch;