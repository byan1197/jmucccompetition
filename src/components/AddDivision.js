import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Button, Col, Container, Input, Label, Row, Table } from 'reactstrap';
import Fetcher from '../Fetcher';

class AddDivision extends Component {

    constructor() {
        super()
        this.state = {
            divisions: [],
            availTeams: [],
            selectedTeams: [],
            divisionNum: -1,
        }
    }

    fetchEverything = () => {
        Fetcher.getAllDivisions()
            .then(divs => {

                var displayDivisions = [];

                divs.forEach(d => {

                    var teamStr = '';

                    d.teams.forEach(t => {
                        teamStr = teamStr + t.teamName + '  '
                    })

                    displayDivisions.push({
                        _id: d._id,
                        divNum: d.divNum,
                        teamStr: teamStr,
                        visible: d.visible
                    })
                });

                console.log(displayDivisions);

                this.setState({
                    divisions: displayDivisions
                })
            })
            .catch(err => {
                toast.error(err.error.message);
            })

        Fetcher.getAllNonDivisionedTeams()
            .then(teams => {
                this.setState({
                    availTeams: teams.map(t => {
                        return {
                            selected: false,
                            obj: t
                        }
                    }),
                })
            })
            .catch(err => {
                toast.error(err.error.message);
            })
    }

    componentDidMount() {
        this.fetchEverything();
    }

    handleInputChange = e => {
        this.setState({ divisionNum: e.target.value })
    }

    handleTeamSelect = (e, index) => {

        console.log(e.target.checked)

        var teamArr = this.state.availTeams
        var selectedArr = this.state.selectedTeams
        var teamId = teamArr[index].obj._id
        teamArr[index].selected = e.target.checked

        if (e.target.checked) {
            selectedArr.push(teamId);
            if (selectedArr.length > 4) {
                selectedArr.pop();
                e.target.checked = false
                toast.info('Max 4 teams per division.');
            }
        } else {
            console.log('selectedArr b4', selectedArr)
            selectedArr.splice(selectedArr.indexOf(teamId), 1);
            console.log('selectedArr after', selectedArr)
        }

        this.setState({
            availTeams: teamArr,
            selectedTeams: selectedArr
        })
    }


    submit = () => {

        if (this.state.selectedTeams.length !== 4)
            return toast.error('Must have 4 teams selected.')
        if (this.state.divisionNum === -1)
            return toast.error('Please input a real division number')

        var body = {
            teamids: this.state.selectedTeams,
            divNum: this.state.divisionNum
        }

        Fetcher.createNewDivision(body)
            .then(res => {
                if (res.error)
                    return toast.error(res.error.message);
                if (res.success) {
                    this.setState({
                        divisions: [],
                        availTeams: [],
                        selectedTeams: [],
                        divisionNum: -1,
                    })
                    this.fetchEverything();
                    return toast.success(res.success.message)
                }
            });
    }

    toggleVisibility = (id, e) => {
        var body = {
            _id: id,
            visible: e.target.checked
        }

        Fetcher.toggleDivisionVisibility(body).then(res => {
            if (res.error) {
                toast.error(res.error.message || 'Could not change match completion')
                return;
            }
            if (res.success) {
                toast.info(res.success.message);
                this.fetchEverything()
            }
        })

    }

    delete = id => {
        Fetcher.deleteDivision({ _id: id })
            .then((res => {
                if (res.error) {
                    toast.error(res.error.message)
                    return;
                }
                toast.success('Successfully deleted division')
                this.fetchEverything()
            }))
    }

    render() {
        return (
            <div>
                <h3>Divisions</h3>
                <Container>
                    <Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Div #</th>
                                    <th>Team names</th>
                                    <th>Visibility</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.divisions.map((d, i) => {
                                        return <tr>
                                            <td>{d.divNum}</td>
                                            <td>{d.teamStr}</td>
                                            <td>
                                                <Input checked={d.visible} onChange={e => { this.toggleVisibility(d._id, e) }} type='checkbox' />
                                            </td>
                                            <td><Button onClick={() => { this.delete(d._id) }}>Delete</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Col md={12} sm={12}>
                            <h3>Add new:</h3>
                        </Col>
                        <Col md={12} sm={12}>
                            <Label>
                                Division #:
                                <Input value={this.state.divisionNum} onChange={e => { this.handleInputChange(e) }}></Input>
                            </Label>
                        </Col>
                        {
                            this.state.availTeams.map((t, index) =>
                                <Col md={12} sm={12}>
                                    <Label key={index} check>
                                        <Input onChange={e => { this.handleTeamSelect(e, index) }} type='checkbox' />
                                        {t.obj.teamName}
                                    </Label>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
                <Button className='mt-2' onClick={this.submit} block color='primary'>Submit</Button>
            </div>
        )
    }
}

export default AddDivision;