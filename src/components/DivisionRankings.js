import React, { Component } from 'react';
import {
    Table,
    Container,
    Col,
    Row
} from 'reactstrap'
import { toast } from 'react-toastify'
import Fetcher from '../Fetcher';

class DivisionRankings extends Component {

    constructor() {
        super()
        this.state = {
            rankings: []
        }
    }

    componentDidMount() {
        Fetcher.getRankings().then(res => {
            if (res.error) {
                toast.error(res.error.message);
                return
            }
            this.setState({ rankings: res });
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Division Rankings by Judges</h2>
                            {
                                this.state.rankings.length > 0 &&
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Division
                                            </th>
                                            <th>
                                                Judge
                                            </th>
                                            <th>
                                                1st
                                            </th>
                                            <th>
                                                2nd
                                            </th>
                                            <th>
                                                3rd
                                            </th>
                                            <th>
                                                4th
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody> {
                                        this.state.rankings.map((r, i) => {
                                            return (<tr key={i}>
                                                <td>
                                                    {r.division.divNum}
                                                </td>
                                                <td>
                                                    {r.judge.judgeName}
                                                </td>
                                                <td>
                                                    {r.ranking[0].teamName}({r.ranking[0].judgeName})
                                                </td>
                                                <td>
                                                    {r.ranking[1].teamName}({r.ranking[1].judgeName})
                                                </td>
                                                <td>
                                                    {r.ranking[2].teamName}({r.ranking[2].judgeName})
                                                </td>
                                                <td>
                                                    {r.ranking[3].teamName}({r.ranking[3].judgeName})
                                                </td>
                                            </tr>)
                                        })
                                    } </tbody>
                                </Table>
                            }
                            {
                                this.state.rankings.length === 0 && 
                                <h4>No rankings to show</h4>
                            }
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default DivisionRankings;