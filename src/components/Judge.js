import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button,
} from 'reactstrap';
import Fetcher from '../Fetcher'
import { Link } from 'react-router-dom';

class Judge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: []
        }
    }

    componentWillMount() {
        Fetcher.getAllMatches()
            .then(res => {
                var matches = res.filter(m => !m.complete).map(m => {
                    return {
                        _id: m._id,
                        team1: m.team1.judgeName,
                        team2: m.team2.judgeName,
                        complete: m.complete,
                        day: m.day
                    }
                });
                matches.sort((a, b) => b.day - a.day)
                this.setState({ matches: matches })

            })
    }

    render() {

        if (this.state.matches.length === 0)
            return <h2>No matches to judge.</h2>
        return (
            <Container>
                <Row>
                    {
                        this.state.matches.map((m, i) =>
                            <Col key={i} md={4} sm={6}>
                                <Card className='shadow my-3 move-on-hover'>
                                    <CardBody>
                                        <CardTitle>
                                            <p>Day {m.day}</p>
                                            <h2>Team {m.team1} <br /> -vs- <br /> Team {m.team2}</h2>
                                        </CardTitle>
                                        <Link to={{ pathname: '/score', state: { ...m } }}><Button block>Judge this match</Button></Link>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        )

    }

}

export default Judge;