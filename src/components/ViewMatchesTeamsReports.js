import React, { Component } from 'react';
import Fetcher from '../Fetcher';
import { toast } from 'react-toastify';
import {
    Button,
    Table
} from 'reactstrap'

class ViewMatchesTeamsReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: []
        }
    }

    componentDidMount() {
        this.fetchItemLists(this.props.type);
    }

    componentWillReceiveProps(nextProps) {
        console.log('this.props.type', this.props.type, nextProps.type)
        this.fetchItemLists(nextProps.type);
    }

    fetchItemLists = type => {

        var flattenObject = function (ob) {
            var toReturn = {};

            for (var i in ob) {
                if (!ob.hasOwnProperty(i)) continue;

                if ((typeof ob[i]) == 'object') {
                    var flatObject = flattenObject(ob[i]);
                    for (var x in flatObject) {
                        if (!flatObject.hasOwnProperty(x)) continue;

                        toReturn[i + '.' + x] = flatObject[x];
                    }
                } else {
                    toReturn[i] = ob[i];
                }
            }
            return toReturn;
        };

        var fetchPromise = null;
        if (type === 'TEAMS') {
            fetchPromise = Fetcher.getAllTeams()
                .then(res => {
                    var newList = []
                    res.forEach(r => {
                        newList.push({
                            _id: r._id,
                            'Team Name': r.teamName,
                            'Team Alias': r.judgeName,
                            'School': r.university
                        })
                    });

                    return newList;
                })
        }
        else if (type === 'MATCHES') {
            fetchPromise = Fetcher.getAllMatches()
                .then(res => {
                    console.log(res)
                    var newList = []
                    res.forEach(r => {
                        newList.push({
                            _id: r._id,
                            'Match': r.team1.teamName + ' vs ' + r.team2.teamName,
                            'Alias': r.team1.judgeName + ' vs ' + r.team2.judgeName,
                            'Match Complete': r.complete ? 'Yes' : 'No'
                        })
                    });

                    return newList;
                })
        }
        else if (type === 'REPORTS') {
            fetchPromise = Fetcher.getAllReports()
                .then(res => {
                    console.log(res)
                    var newList = []
                    res.forEach(r => {
                        newList.push({
                            _id: r._id,
                            'Team 1 Alias': r.team1,
                            'Team 2 Alias': r.team2,
                            'Team 1 Points': r.team1Points,
                            'Team 2 Points': r.team2Points,
                            'Judged by': r.judge.judgeName,
                            'Signed by Judge': r.judgeSign ? 'Yes' : 'No',
                        })
                    });

                    return newList;
                })
        }
        fetchPromise.then(res => {
            if (res.error) {
                toast.error('Could not fetch ' + type, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            else {
                var objList = []
                res.forEach(r => {
                    objList.push(flattenObject(r));
                })

                this.setState({
                    itemList: objList
                })
            }
        })
    }

    deleteItem = id => {
        console.log(id)
        var type = this.props.type;
        var deletePromise = null;
        var messageType = '';
        if (type === 'MATCHES') {
            deletePromise = Fetcher.deleteMatch({ _id: id })
            messageType = 'match';
        }
        if (type === 'TEAMS') {
            deletePromise = Fetcher.deleteTeam({ _id: id })
            messageType = 'team';
        }
        deletePromise
            .then(res => {
                if (res.error) {
                    toast.error(res.error.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    return;
                }
                toast.success('Successfully deleted ' + messageType, {
                    position: toast.POSITION.TOP_CENTER
                })
                this.fetchItemLists(type)
            })
    }

    render() {
        var type = this.props.type;

        return (
            <div>
                <h3>{type}</h3>
                {
                    this.state.itemList.length === 0 &&
                    <p>:( Empty.</p>
                }
                {
                    typeof (this.state.itemList[0]) === 'object' &&
                    <Table>
                        <thead>
                            <tr>
                                {
                                    Object.keys(this.state.itemList[0])
                                        .map((k, i) => {
                                            if (!(k.includes('_id')))
                                                return <th>{k}</th>
                                        })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.itemList.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            {
                                                Object.keys(item).map((key, key_i) => {
                                                    if (!(key.includes('_id')))
                                                        return (<td key={key_i}>
                                                            {item[key]}
                                                        </td>)
                                                })
                                            }
                                            {type !== 'REPORTS' && <td><Button onClick={() => { this.deleteItem(item._id) }}>Delete</Button></td>}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

                }
            </div>
        )

    }

}

export default ViewMatchesTeamsReports;