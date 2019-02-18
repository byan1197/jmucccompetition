import React, { Component } from 'react';
import {
    Container,
    Card,
    CardBody,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Input,
    Label,
    Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Fetcher from '../Fetcher';

class RankingSheet extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.location.state ? {
            ...this.props.location.state,
            rankOptions: ['None', '1st', '2nd', '3rd', '4th'],
            rankings: [],
            selectedJudge: '',
            judgeSign: false,
            judges: [],
            empty: false
        } : {
                empty: true
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

    rank = (e, _id, i) => {
        var index = parseInt(e.target.value.charAt(0)) || -1
        var rankings = this.state.rankings;
        var prevIndex = rankings.indexOf(_id);
        if (prevIndex !== -1)
            rankings[prevIndex] = null
        if (index !== -1) rankings[index - 1] = _id;
        this.setState({ rankings: rankings })
    }

    submit = () => {
        var judge = this.state.judges.find(j => j.judgeName === this.state.selectedJudge);
        var body = {
            rankings: this.state.rankings,
            judge: judge._id || null,
            judgeSign: this.state.judgeSign
        }
        if (body.rankings.length > 4) {
            toast.error('Error while ranking');
            return;
        }
        for (var i = 0; i < 4; i++) {
            if (!body.rankings[i]) {
                toast.error('Missing a team for rank ' + (i + 1) + '.');
                return;
            }
        }
        if (!this.state.judgeSign){
            toast.error('Judge(s) have not signed');
            return;
        }
    }

    selectJudge = e => {
        this.setState({ selectedJudge: e.target.value })
    }

    judgeSign = e => {
        this.setState({
            judgeSign: e.target.checked
        })
    }

    render() {
        if (this.state.empty) {
            this.props.history.push('/divisions')
            return <div></div>;
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Container>
                    <Card className='shadow'>
                        <CardBody>
                            <Container>
                                <Row>
                                    <Col md={3}>
                                        <Link to='/divisions'><Button outline className='my-2'>Back to divisions</Button></Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} sm={12}>
                                        <h2>Division {this.state.divNum} Ranking</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ offset: 2, size: 8 }} sm={12}>
                                        <ListGroup block>
                                            {this.state.teams.map((t, i) => {
                                                return <ListGroupItem block key={i}>
                                                    <Row>
                                                        <Col md={{ offset: 1, size: 3 }} sm={12}><b>Team alias:</b><br></br>{t.judgeName}</Col>
                                                        <Col md={{ offset: 5, size: 3 }} sm={12}>
                                                            <b>Rank:</b>
                                                            <Input type='select' onChange={e => { this.rank(e, t._id) }}>
                                                                {
                                                                    this.state.rankOptions.map((r, ri) => {
                                                                        return (
                                                                            <option disabled={this.state.rankings[ri - 1]} key={ri}>{r}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Input>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            })}
                                        </ListGroup>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md={{size: 4, offset: 4}} sm={12} >
                                        <Label>Judge:<Input type='select' onChange={e => { this.selectJudge(e) }} value={this.state.selectedJudge}>
                                            {this.state.judges.map((j, i) => <option key={i}>{j.judgeName}</option>)}
                                        </Input>
                                        </Label>
                                    </Col>
                                    <Col md={{size: 6, offset: 3}} sm={12}>
                                        <Label check>
                                            <Input onChange={e => { this.judgeSign(e) }} type='checkbox' />
                                            I, {this.state.selectedJudge}, hereby willingly submit this score.
                                        </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{ size: 2, offset: 5 }} sm={12}>
                                        <Button block className='my-2' style={{ border: 'none', backgroundColor: 'rgb(43, 149, 214)' }} onClick={() => { this.submit() }}>Submit</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        )
    }

}

export default RankingSheet;