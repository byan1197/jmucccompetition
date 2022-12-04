import React, { Component } from 'react';
import { Input, Button, Label, ListGroup, ListGroupItem } from 'reactstrap';
import Fetcher from '../Fetcher';
import { toast } from 'react-toastify'

class AddViewJudge extends Component {

    constructor() {
        super();
        this.state = {
            judgeName: '',
            judgeList: []
        }
    }

    componentDidMount() {
        Fetcher.getJudges().then(res => {
            this.setState({
                judgeList: res
            })
        })
    }

    changeJudgeName = e => {
        this.setState({
            judgeName: e.target.value
        })
    }

    deleteJudge = _id => {

        Fetcher.deleteJudge({_id: _id})
            .then(res => {
                if (res.error) {
                    toast.error(res.error.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    return;
                }
                toast.success('Successfully deleted judge', {
                    position: toast.POSITION.TOP_CENTER
                })

                Fetcher.getJudges().then(res => {
                    this.setState({
                        judgeList: res,
                        judgeName: ''
                    })
                })
            })
    }

    submitJudgeName = () => {

        Fetcher.addJudge({ judgeName: this.state.judgeName })
            .then(res => {
                if (res.error) {
                    toast.error(res.error.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    return;
                }
                toast.success('Successfully added judge', {
                    position: toast.POSITION.TOP_CENTER
                })

                Fetcher.getJudges().then(res => {
                    this.setState({
                        judgeList: res,
                        judgeName: ''
                    })
                })
            })

    }

    render() {
        return <div className='my-3'>
            <h3>List of judges:</h3>
            <ListGroup className='my-2'>
                {
                    this.state.judgeList.map((j, i) => {
                        return (
                            <ListGroupItem key={i}>

                                {j.judgeName} <Button className='btn-grad-delete mx-2' onClick={() => { this.deleteJudge(j._id) }}>Delete</Button>
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
            <h3>Add another judge:</h3>
            <Label>
                Judge Name:
                <Input onChange={this.changeJudgeName} value={this.state.judgeName} />
            <Button className='mt-2 btn-grad-primary' block onClick={this.submitJudgeName}>Submit</Button>
            </Label>
        </div>
    }
}

export default AddViewJudge;