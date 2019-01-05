import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { FiLock, FiFileText } from 'react-icons/fi'
import { withRouter } from 'react-router-dom';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    historyPush = link => {
        this.props.history.push(link)
        this.setState({ isOpen: false })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar className='shadow' fixed='top' color="light" light expand="md">
                    <NavbarBrand style={{ color: '#D13913' }} href="/">JMUCC Scoring System</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={() => { this.historyPush('/') }}><FiFileText />Judge</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => { this.historyPush('/admin') }}><FiLock />Admin</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavBar);
