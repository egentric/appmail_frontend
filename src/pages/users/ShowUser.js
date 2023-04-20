import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

const ShowUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState("");

  useEffect(() => {
    displayShowUser();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${user}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        // console.log("test");

        setShowUser(res.data.data);
        // console.log(showUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navigation />
      <Row>
        <Col xs="auto" md={2} lg={1}>
          <Sidebar />
        </Col>
        <Col>
          <div className="row justify-content-center mt-5">
            <div className="col-8 col-sm-8 col-md-8">
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                    <span className="menu">
                      Compte de {showUser.user_firstname}{" "}
                      {showUser.user_lastname}
                    </span>
                  </h3>
                </div>

                <div className="card-body">
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th>Prénom</th>
                        <td>{showUser.user_firstname}</td>
                      </tr>
                      <tr>
                        <th>Nom</th>
                        <td>{showUser.user_lastname}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{showUser.user_email}</td>
                      </tr>
                      <tr>
                        <th>Centre</th>
                        <td>{showUser.user_center}</td>
                      </tr>
                      <tr>
                        <th>Role</th>
                        <td>{showUser.role}</td>
                      </tr>
                      <tr>
                        <th>Actions</th>
                        <td>
                          <Link
                            to={`/users/edit/${showUser.id}`}
                            className="btn btnBlue btn-1 btn-sm me-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                            <span className="menu">Modifier</span>
                          </Link>
                          <Button
                            className="btn btnBlue btn-sm me-2"
                            onClick={() => navigate(-1)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-arrow-return-left"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                              />
                            </svg>
                            <span className="menu">Retour</span>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShowUser;
