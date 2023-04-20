import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

const EditUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [center, setCenter] = useState("");
  const [role_id, setRole] = useState("");
  const [validationError, setValidationError] = useState({});

  // On récupère l'id du user
  const [userCo, setUserCo] = useState([]);
  const [roleCo, setRoleCo] = useState([]);

  const displayUser = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUserCo(res.data);
        setRoleCo(res.data.role_id);
      });
  };
  // console.log(role);

  useEffect(() => {
    getUser();
    displayUser();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${user}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setFirstName(res.data.data.user_firstname);
        setLastName(res.data.data.user_lastname);
        setEmail(res.data.data.user_email);
        setCenter(res.data.data.user_center);
        setRole(res.data.data.role_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Fonction de modification d'article
  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("user_firstname", firstName);
    formData.append("user_lastname", lastName);
    formData.append("user_center", center);
    formData.append("user_email", email);
    formData.append("role_id", role_id);

    await axios
      .post(`http://localhost:8000/api/users/${user}`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/users"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
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
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    <span className="menu">
                      Modifier {firstName} {lastName}
                    </span>
                  </h3>
                </div>

                <div className="card-body">
                  <div className="form-wrapper">
                    {Object.keys(validationError).length > 0 && (
                      <div className="row">
                        <div className="col-12">
                          <div className="alert alert-danger">
                            <ul className="mb-0">
                              {Object.entries(validationError).map(
                                ([key, value]) => (
                                  <li key={key}>{value}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    <Form onSubmit={updateUser}>
                      <Row>
                        <Col>
                          <Form.Group controlId="firstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                              type="text"
                              value={firstName}
                              onChange={(event) => {
                                setFirstName(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group controlId="lastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                              type="text"
                              value={lastName}
                              onChange={(event) => {
                                setLastName(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="center">
                            <Form.Label>Centre</Form.Label>
                            <Form.Control
                              type="text"
                              value={center}
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        {roleCo === 1 && (
                          <Col>
                            <Form.Group controlId="Role">
                              <Form.Label>Role</Form.Label>
                              <Form.Check
                                type="switch"
                                id="custom-switch-user"
                                label="Utilisateur"
                                value="2"
                                checked={role_id === 2}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    setRole(2);
                                  }
                                }}
                              />
                              <Form.Check
                                type="switch"
                                id="custom-switch-admin"
                                label="Administrateur"
                                value="1"
                                checked={role_id === 1}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    setRole(1);
                                  }
                                }}
                              />
                            </Form.Group>
                          </Col>
                        )}
                      </Row>

                      <Button
                        // variant="primary"
                        className="btn btnBlue mt-2 btn-2 btn-sm me-2"
                        size="lg"
                        block="block"
                        type="submit"
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
                      </Button>
                      <Button
                        className="btn btnBlue  btn-sm me-2 mt-2"
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
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default EditUser;
