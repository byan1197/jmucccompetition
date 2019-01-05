import React, { Component } from 'react';
import {
    Container,
    Card,
    CardBody,
    Row,
    Col,
    Input,
    Label,
    Button
} from 'reactstrap'
import { FiPlus, FiMinus } from 'react-icons/fi'
import Fetcher from '../Fetcher';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

class ScoreSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pointPool: 7,
            team1Points: 4,
            team2Points: 4,
            selectedJudge: '',
            judges: [],
            judgeSign: false,
            loading: false,
            complete: false
        }
    }

    componentDidMount() {
        Fetcher.getJudges()
            .then(judges => {
                this.setState({
                    judges: judges.map(j => { return { judgeName: j.judgeName, _id: j._id } }),
                    selectedJudge: judges[0] ? judges[0].judgeName : ''
                })
            })
    }

    t1Incr = () => {
        if (this.state.team1Points >= 11 || this.state.pointPool === 0) return;
        var t1pt = this.state.team1Points + 1;
        var ptPool = this.state.pointPool - 1;
        this.setState({ team1Points: t1pt, pointPool: ptPool })
    }
    t1Decr = () => {
        if (this.state.team1Points <= 4) return;
        var t1pt = this.state.team1Points - 1;
        var ptPool = this.state.pointPool + 1;
        this.setState({ team1Points: t1pt, pointPool: ptPool })
    }
    t2Incr = () => {
        if (this.state.team2Points >= 11 || this.state.pointPool === 0) return;
        var t2pt = this.state.team2Points + 1;
        var ptPool = this.state.pointPool - 1;
        this.setState({ team2Points: t2pt, pointPool: ptPool })
    }
    t2Decr = () => {
        if (this.state.team2Points <= 4) return;
        var t2pt = this.state.team2Points - 1;
        var ptPool = this.state.pointPool + 1;
        this.setState({ team2Points: t2pt, pointPool: ptPool })
    }

    selectJudge = e => {
        this.setState({ selectedJudge: e.target.value })
    }

    clear = () => {
        this.setState({
            pointPool: 7,
            team1Points: 4,
            team2Points: 4,
            selectedJudge: this.state.judges[0]
        })
    }

    judgeSign = e => {
        this.setState({
            judgeSign: e.target.checked
        })
    }

    submit = () => {

        if (this.state.pointPool !== 0) {
            toast.error('Incorrect point distribution', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        if (!this.state.judgeSign) {
            toast.error('You may not proceed.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }


        this.setState({
            loading: true
        })

        var body = {
            team1Points: this.state.team1Points,
            team2Points: this.state.team2Points,
            judge: this.state.judges.find(j => j.judgeName === this.state.selectedJudge)._id,
            team1: this.props.location.state.team1,
            team2: this.props.location.state.team2,
            match: this.props.location.state._id,
            judgeSign: this.state.judgeSign
        }

        Fetcher.submitReport(body)
            .then(res => {
                if (res.error) {
                    toast.error(res.error.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    this.setState({
                        loading: false
                    })
                    return
                }
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    var msg = res.success ? res.success.message : 'Scoresheet submitted.'
                    toast.success(msg, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    this.props.history.push('/')
                }, 500)
            })
    }

    render() {
        if (this.state.loading)
            return <Loading />
        return <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Container>
                <Card className='shadow'>
                    <CardBody>
                        <Container>
                            <Row>
                                <Col md={2}>
                                    <Link to='/'><Button outline className='my-2'>Back to matches</Button></Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5} sm={6}>
                                    <h3>Team {this.props.location.state.team1}</h3>
                                    <Input min={4} max={11} type='number' value={this.state.team1Points} />
                                    <Button onClick={() => { this.t1Incr() }} outline color='dark' className='circular-btn m-2' style={{ color: '#3DCC91' }}><FiPlus /></Button>
                                    <Button onClick={() => { this.t1Decr() }} outline color='dark' className='circular-btn m-2' style={{ color: '#DB3737' }}><FiMinus /></Button>
                                </Col>
                                <Col md={2} sm={6}>
                                    <h1>vs</h1>
                                    <p>Available <br />points: <br /> {this.state.pointPool}</p>
                                </Col>
                                <Col md={5} sm={6}>
                                    <h3>Team {this.props.location.state.team2}</h3>
                                    <Input min={4} max={11} type='number' value={this.state.team2Points} />
                                    <Button onClick={() => { this.t2Incr() }} outline color='dark' className='circular-btn m-2' style={{ color: '#3DCC91' }}><FiPlus /></Button>
                                    <Button onClick={() => { this.t2Decr() }} outline color='dark' className='circular-btn m-2' style={{ color: '#DB3737' }}><FiMinus /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='my-3' md={{ size: 4, offset: 4 }} sm={12}>
                                    <Label>Judge:</Label>
                                    <Input type='select' onChange={e => { this.selectJudge(e) }} defaultVluae={'Select'} value={this.state.selectedJudge}>
                                        {this.state.judges.map((j, i) => <option key={i}>{j.judgeName}</option>)}
                                    </Input>
                                </Col>
                                <Col md={12} sm={12}>
                                    <Label check><Input onChange={e => { this.judgeSign(e) }} type='checkbox' />
                                        I hereby willingly submit blah blah blah
                                    </Label>
                                </Col>
                                <Col className='my-3' md={{ size: 3, offset: 3 }} sm={12}>
                                    <Button onClick={this.submit} block color='primary'>Submit</Button>
                                </Col>
                                <Col className='my-3' md={{ size: 3 }} sm={12}>
                                    <Button block color='warning' onClick={() => this.clear()}>Clear</Button>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        </div>

    }

}

export default ScoreSheet;