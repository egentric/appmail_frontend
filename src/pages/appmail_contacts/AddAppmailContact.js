import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

const AddAppmailContact = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");

  const [user, setUser] = useState([]);

  const [categories, setCategories] = useState([]);

  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getCategories();
    displayUsers();
  }, []);

  const displayUsers = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        // setRole(res.data.role_id);
      });
  };

  //Méthode pour récupérer les sites
  const getCategories = async () => {
    await axios
      .get("http://localhost:8000/api/appmail_categories", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setCategories(res.data.data);
      });
  };

  //Fonction d'ajout de l'article
  const AddContact = async (e) => {
    e.preventDefault();
    const user_id = [];
    user_id.push(user.id);

    const formData = new FormData();
    formData.append("appmail_contact_firstname", firstName);
    formData.append("appmail_contact_lastname", lastName);
    formData.append("appmail_contact_email", email);
    formData.append("appmail_contact_business", business);
    formData.append("user_id", user_id);

    // console.log(site_id);

    // =================================checkbox================================
    //Je récupère les valeurs des checkbox
    const checkCategories = document.getElementsByName("categories");
    // console.log(checkCategories.length);

    // vérifie si chaque élément est coché ou non
    // Si l'élément est coché, sa valeur est ajoutée à un objet FormData
    for (var i = 0; i < checkCategories.length; i++) {
      if (checkCategories[i].checked) {
        formData.append("category_id[]", checkCategories[i].value);
      }
    }
    // La boucle suivante utilise la méthode formData.entries() pour afficher toutes les paires clé-valeur de l'objet FormData dans la console.
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // =================================Fin checkbox================================

    // console.log(sites);
    await axios
      .post(`http://127.0.0.1:8000/api/appmail_contacts`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/appmail_contacts"))
      .catch(({ response }) => {
        if (response.status != 200) {
          setValidationError(response.data);
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
                  <h3 className="card-title">Nouveau Contact</h3>
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

                    <Form onSubmit={AddContact}>
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
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="business">
                            <Form.Label>Entreprise</Form.Label>
                            <Form.Control
                              type="text"
                              value={business}
                              onChange={(event) => {
                                setBusiness(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          {/* ////////////////////////////////////////////////////////////Checkbox////////////////////////////////////////                      */}
                          <div className="mt-4">
                            <label htmlFor="discipline">Catégories</label>
                            {categories.map((category) => (
                              <div key={category.id} className="form-check">
                                <input
                                  name="categories"
                                  className="form-check-input"
                                  type="checkbox"
                                  value={category.id}
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label inline-block text-gray-800"
                                  htmlFor="flexCheckDefault"
                                >
                                  {category.appmail_category_name}
                                </label>
                              </div>
                            ))}
                          </div>
                          {/* ////////////////////////////////////////////////////////////Fin Checkbox////////////////////////////////////////                      */}
                        </Col>
                      </Row>
                      <Button
                        className="btn btnBlue btn-sm me-2 mt-2 "
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
                      <Button
                        className="btnBlue mt-2 btn-sm"
                        size="lg"
                        block="block"
                        type="submit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span className="menu ">Créer</span>
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

export default AddAppmailContact;
