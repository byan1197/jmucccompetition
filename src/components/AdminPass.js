import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Label,
    Input,
    Button
} from 'reactstrap'
import { toast } from 'react-toastify';

var config = require('../frontEndConfig.json');

class AdminPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            element: ''
        }
    }

    handlePass = e => {
        this.setState({
            password: e.target.value
        })
    }

    auth = () => {
        if (this.state.password === config.adminPass) {
            localStorage.setItem('pass', this.state.password);
            toast('Welcome.', {
                position: toast.POSITION.TOP_CENTER
            });
            this.props.updateFn();
            return;
        }
        this.setState({ password: '' })
        toast.error('Incorrect credential', {
            position: toast.POSITION.TOP_CENTER
        })
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13)
            this.auth()
    }
    render() {
        return <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Container>
                <Row style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <Col md={{ size: 4 }} sm={12}>
                        <Card className='shadow'>
                            <CardBody>
                                <CardTitle>
                                    Enter the admin password
                                </CardTitle>
                                <Label for='password'>Password</Label>
                                <Input onChange={this.handlePass} id='password' type='password' onKeyPress={this.enterPressed.bind(this)} />
                                <Button color='primary' className='mt-4' block onClick={() => { this.auth() }}>Submit</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

    }

}

export default AdminPass;