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
import Loading from './Loading'
import { Link } from 'react-router-dom';

class Judge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            loading: true
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
                        day: m.day,
                        div: m.div
                    }
                });
                matches.sort((a, b) => b.day - a.day)
                this.setState({ matches: matches, loading: false })

            })
    }

    render() {

        if (this.state.loading)
            return <Loading/>

        if (this.state.matches.length === 0)
            return <h2>No matches to judge.</h2>
        return (
            <Container>
                <Row>
                    {
                        this.state.matches.map((m, i) =>
                            <Col key={i} lg={4} md={6} sm={6}>
                                <Link style={{ textDecoration: 'none' }} className='match-card' to={{ pathname: '/score', state: { ...m } }}>
                                    <Card className='shadow my-3 move-on-hover'>
                                        <CardBody>
                                            <CardTitle>
                                                <p>Day {m.day}, Div. {m.div}</p>
                                                <h2>Team {m.team1} <br /> -vs- <br /> Team {m.team2}</h2>
                                            </CardTitle>
                                            Click to judge this match
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        )

    }

}

export default Judge;