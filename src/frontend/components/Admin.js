import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Collapse,
} from "reactstrap";
import {
  FiPlus,
  FiCrosshair,
  FiX,
  FiFile,
  FiLogOut,
  FiEye,
  FiShuffle,
} from "react-icons/fi";
import { TiDivide, TiThList, TiGroup } from "react-icons/ti";
import AdminPass from "./AdminPass";
import { toast } from "react-toastify";

import AddViewJudge from "./AddViewJudge";
import ViewMatchesTeamsReports from "./ViewMatchesTeamsReports";
import Fetcher from "../Fetcher";
import AddTeam from "./AddTeam";
import AddMatch from "./AddMatch";
import AddDivision from "./AddDivision";
import DivisionRankings from "./DivisionRankings";

const options = [
  {
    icon: <FiPlus />,
    title: "Add a team",
    color: "#3DCC91",
    type: "ADD_TEAM",
  },
  {
    icon: <FiCrosshair />,
    title: "Add a match",
    color: "#3DCC91",
    type: "ADD_MATCH",
  },
  {
    icon: <TiGroup />,
    title: "Add/View Judges",
    color: "#3DCC91",
    type: "ADD_JUDGE",
  },
  {
    icon: <TiDivide />,
    title: "Add/View Division",
    color: "#3DCC91",
    type: "ADD_DIVISION",
  },
  {
    icon: <FiCrosshair />,
    title: "View matches",
    color: "#2B95D6",
    type: "VIEW_MATCHES",
  },
  {
    icon: <FiFile />,
    title: "View Reports",
    color: "#2B95D6",
    type: "VIEW_REPORTS",
  },
  {
    icon: <FiEye />,
    title: "View Teams",
    color: "#2B95D6",
    type: "VIEW_TEAMS",
  },
  {
    icon: <TiThList />,
    title: "Division Rankings",
    color: "#2B95D6",
    type: "DIVISION_RANKINGS",
  },
  {
    icon: <FiShuffle />,
    title: "Scramble matchups",
    color: "#D9822B",
    type: "SCRAMBLE",
  },
  {
    icon: <FiLogOut />,
    title: "Logout",
    color: "#D9822B",
    type: "LOGOUT",
  },
  {
    icon: <FiX />,
    title: "Reset db",
    color: "#DB3737",
    type: "RESET",
  },
];

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      isOpen: false,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("pass")) {
      this.setState({
        auth: false,
      });
      return;
    }

    Fetcher.auth()
      .then((res) => {
        this.setState({
          auth: Buffer.from(localStorage.getItem("pass")).toString("base64") === res.password,
        });
      })
      .catch((err) => {
        toast.error(err.error.message);
      });
  }

  refresh = () => {
    Fetcher.auth()
      .then((res) => {
        this.setState({
          auth: Buffer.from(localStorage.getItem("pass") || '').toString("base64") === res.password,
        });
      })
    setTimeout(() => {
      this.forceUpdate();
    }, 750);
  };

  handleTaskClick = (type) => {
    var element = null;
    if (type === "ADD_JUDGE") element = <AddViewJudge />;
    if (type === "VIEW_MATCHES")
      element = <ViewMatchesTeamsReports {...{ type: "MATCHES" }} />;
    if (type === "VIEW_TEAMS")
      element = <ViewMatchesTeamsReports {...{ type: "TEAMS" }} />;
    if (type === "VIEW_REPORTS")
      element = <ViewMatchesTeamsReports {...{ type: "REPORTS" }} />;
    if (type === "ADD_TEAM") element = <AddTeam />;
    if (type === "ADD_MATCH") element = <AddMatch />;
    if (type === "ADD_DIVISION") element = <AddDivision />;
    if (type === "DIVISION_RANKINGS") element = <DivisionRankings />;
    if (type === "LOGOUT") {
      localStorage.clear();
      toast.success("Successfully logged out");
      this.refresh();
    }
    if (type === "SCRAMBLE") {
      toast("Scrambling...");
      Fetcher.scrambleBrackets().then((res) => {
        if (res.error) {
          toast.error("Error while scrambling teams");
          return;
        }
        toast.success(res.success.message);
      });
    }
    if (type === "RESET") {
      if (window.confirm("This will erase everything. Are you sure?")) {
        Fetcher.clearDb().then((res) => {
          if (res.error) {
            toast.error(res.error.message);
            return;
          }
          toast.info("Successfully cleared database.");
        });
      } else {
        toast.info("Cancelled.");
      }
    }
    if (type !== "LOGOUT" && type !== "RESET" && type !== "SCRAMBLE")
      this.setState({
        isOpen: true,
        element: element,
      });
  };

  closeCollapse = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    if (!this.state.auth)
      return (
        <AdminPass
          {...{
            updateFn: () => {
              this.refresh();
            },
          }}
        />
      );
    return (
      <Container>
        <Collapse isOpen={this.state.isOpen}>
          <Row>
            <Col md={12}>
              <Card className="shadow mb-3">
                <CardBody>
                  <Container>
                    <Row>
                      <Col md={12}>{this.state.element}</Col>
                      <Col md={12}>
                        <Button
                          className="mt-3 ml-auto"
                          block
                          outline
                          onClick={this.closeCollapse}
                        >
                          Close
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Collapse>
        <Row>
          {options.map((o, i) => {
            return (
              <Col lg={3} md={4} sm={6} key={i}>
                <Card
                  className="shadow my-3 move-on-hover"
                  onClick={() => {
                    this.handleTaskClick(o.type);
                  }}
                >
                  <CardBody>
                    <h5
                      style={{
                        fontSize: "50px",
                        color: o.color,
                      }}
                    >
                      {o.icon}
                    </h5>
                    <h5 style={{ whiteSpace: "nowrap" }}>{o.title}</h5>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Admin;
