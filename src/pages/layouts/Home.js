import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import Button from "react-bootstrap/Button";

import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // On récupère l'id du user
  const [userId, setUserId] = useState([]);
  const [userFirstname, setUserFirstname] = useState([]);
  const [userLastname, setUserLastname] = useState([]);

  const displayUser = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res);
        setUserId(res.data.id);
        setUserFirstname(res.data.user_firstname);
        setUserLastname(res.data.user_lastname);
      });
  };

  async function displayUsers() {
    await axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const allUsers = res.data.data;
        const lastThreeUsers = allUsers.slice(-3);
        setUsers(lastThreeUsers);
      });
  }

  useEffect(() => {
    displayUser();
    displayUsers();

    // setIsLoading(true);
    // fetchComUser().then((data) => {
    //   setCommentsUser(data);
    //   setIsLoading(false);
    // });
  }, []);

  return (
    <div>
      <Navigation />
      <Row>
        <Col xs="auto" md={2} lg={1}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            {/* ===================================================================== APPLI 1 =============================================== */}
            <Col>
              <div className="row justify-content-center mt-5 ms-4">
                <div className="col-11 col-sm-11 col-md-11">
                  <a href="/appmail_contacts" className="bloc">
                    <div className="card mt-5">
                      <div className="card-header">
                        <h3 className="card-title">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            class="bi bi-envelope-at"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                          </svg>
                          <span className="menu">Appmail</span>
                        </h3>
                      </div>

                      <div className="card-body">
                        <p>
                          Application permettant de classer ses emails par
                          Catégories et de copier les emails par liste de
                          catégorie.
                        </p>
                        <p>
                          <Link
                            to={`/appmail_contacts`}
                            className="btn btnWhite btn-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-person-rolodex"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                              <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                            </svg>
                            <span className="menu">Contacts</span>
                          </Link>
                          <br />
                          <Link
                            to={`/appmail_categories`}
                            className="btn btnWhite btn-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-bookmarks"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z" />
                              <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z" />
                            </svg>
                            <span className="menu">Catégories</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Col>
            {/* ===================================================================== APPLI 2 =============================================== */}
            <Col>
              <div className="row justify-content-center mt-5">
                <div className="col-11 col-sm-11 col-md-11">
                  <a href="/appmail_contacts" className="bloc">
                    <div className="card mt-5">
                      <div className="card-header">
                        <h3 className="card-title">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            class="bi bi-envelope-at"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                          </svg>
                          <span className="menu">Appmail</span>
                        </h3>
                      </div>

                      <div className="card-body">
                        <p>
                          Application permettant de classer ses emails par
                          Catégories et de copier les emails par liste de
                          catégorie.
                        </p>
                        <p>
                          <Link
                            to={`/appmail_contacts`}
                            className="btn btnWhite btn-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-person-rolodex"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                              <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                            </svg>
                            <span className="menu">Contacts</span>
                          </Link>
                          <br />
                          <Link
                            to={`/appmail_categories`}
                            className="btn btnWhite btn-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-bookmarks"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z" />
                              <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z" />
                            </svg>
                            <span className="menu">Catégories</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {/* ===================================================================== UTILISATEURS =============================================== */}

            <Col>
              <div className="row justify-content-center mt-2 ms-4">
                <div className="col-11 col-sm-11 col-md-11">
                  <a href="/users" className="bloc">
                    <div className="card mt-5">
                      <div className="card-header">
                        <h3 className="card-title">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            class="bi bi-people"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                          </svg>
                          <span className="menu">Utilisateurs</span>
                        </h3>
                      </div>

                      <div className="card-body">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Prénoms</th>
                              <th>Noms</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => (
                              <tr key={user.id}>
                                <td>{user.user_firstname}</td>
                                <td>{user.user_lastname}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Col>
            {/* ===================================================================== MON COMPTE =============================================== */}

            <Col>
              <div className="row justify-content-center mt-2">
                <div className="col-11 col-sm-11 col-md-11">
                  <a href={`/users/show/${userId}`} className="bloc">
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
                          <span className="menu d-none d-md-inline">
                            Mon Compte
                          </span>
                        </h3>
                      </div>

                      <div className="card-body">
                        <p>
                          Gestion du compte de {userFirstname} {userLastname}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
