import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';
import Fetcher from '../Fetcher'
import Loading from './Loading'
import { Link } from 'react-router-dom';

class JudgeDivisions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            divisions: [],
            loading: true
        }
    }

    componentWillMount() {
        Fetcher.getAllVisibleDivisions()
            .then(res => {
                var divisions = res.filter(d => !d.complete).map(d => {
                    return {
                        _id: d._id,
                        divNum: d.divNum,
                        teams: d.teams
                    }
                });
                this.setState({ divisions: divisions, loading: false })

            })
    }

    render() {

        if (this.state.loading)
            return <Loading/>

        if (this.state.divisions.length === 0)
            return <h2>No divisions currently.</h2>
        return (
            <Container>
                <Row>
                    {
                        this.state.divisions.map((d, i) =>
                            <Col key={i} lg={4} md={6} sm={6}>
                                <Link style={{ textDecoration: 'none' }} className='match-card' to={{ pathname: '/rank', state: { ...d } }}>
                                    <Card className='shadow my-3 move-on-hover'>
                                        <CardBody>
                                            <CardTitle>
                                                <h2>Division {d.divNum}</h2>
                                            </CardTitle>
                                            Click to rank this division
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

export default JudgeDivisions;