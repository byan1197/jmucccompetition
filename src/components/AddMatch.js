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
            teamList: [],
            day: 0,
            div: 0
        }
    }
    componentDidMount() {
        Fetcher.getAllTeams()
            .then(res => {
                this.setState({
                    teamList: res,
                    team1: res.length === 0 ? '' : res[0].teamName,
                    team2: res.length === 0 ? '' : res[1].teamName,
                })
            })
    }

    selectTeam = (e, num) => {
        var newState = {}
        newState['team' + num] = e.target.value
        this.setState(newState)
    }

    changeDay = e => {
        this.setState({
            day: e.target.value
        })
    }

    changeDiv = e => {
        this.setState({
            div: e.target.value
        })
    }

    submit = () => {
        var body = {
            team1Name: this.state.team1,
            team2Name: this.state.team2,
            day: this.state.day,
            div: this.state.div
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
                        <Col md={3} sm={12}>
                            <Label>
                                Team 1:
                                <Input type='select' onChange={e => { this.selectTeam(e, 1) }} value={this.state.team1}>
                                    {this.state.teamList.map((t, i) => <option disabled={this.state.team1 === t.teamName || this.state.team2 === t.teamName} key={i}>{t.teamName}</option>)}
                                </Input>
                            </Label>
                        </Col>
                        <Col md={3} sm={12}>
                            <Label>
                                Team 2:
                                <Input type='select' onChange={e => { this.selectTeam(e, 2) }} value={this.state.team2}>
                                    {this.state.teamList.map((t, i) => <option disabled={this.state.team1 === t.teamName || this.state.team2 === t.teamName} key={i}>{t.teamName}</option>)}
                                </Input>
                            </Label>
                        </Col>
                        <Col md={3} sm={12}>
                            <Label>
                                Day:
                                <Input onChange={e => { this.changeDay(e) }} value={this.state.day}/>
                            </Label>
                        </Col>
                        <Col md={3} sm={12}>
                            <Label>
                                Division:
                                <Input onChange={e => { this.changeDiv(e) }} value={this.state.div}/>
                            </Label>
                        </Col>
                    </Row>
                </Container>
                <Button className='mt-2  btn-grad-primary' onClick={this.submit} block color='primary'>Submit</Button>
            </div>
        )
    }
}

export default AddMatch;