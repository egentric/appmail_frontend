import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

const EditEvent = () => {
  const navigate = useNavigate();
  const { appmail_contact } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [user_id, setUserId] = useState("");

  const [categories, setCategories] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getContact();
    getCategories();
  }, []);

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
  // console.log(categories);
  // GET - Récupère les valeurs de la fiche avec l'API
  const getContact = async () => {
    await axios
      .get(`http://localhost:8000/api/appmail_contacts/${appmail_contact}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setFirstName(res.data.appmail_contact_firstname);
        setLastName(res.data.appmail_contact_lastname);
        setEmail(res.data.appmail_contact_email);
        setBusiness(res.data.appmail_contact_business);
        setUserId(res.data.user_id);

        const ids = res.data.appmail_category.map((category) => category.id);
        setCheckedCategories(ids);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction de modification de l'article
  const updateContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("appmail_contact_firstname", firstName);
    formData.append("appmail_contact_lastname", lastName);
    formData.append("appmail_contact_email", email);
    formData.append("appmail_contact_business", business);
    formData.append("user_id", user_id);

    // =================================checkbox================================
    //Je récupère les valeurs des checkbox
    const checkCategories = document.getElementsByName("categories");
    console.log(checkCategories.length);

    // vérifie si chaque élément est coché ou non
    for (var i = 0; i < checkCategories.length; i++) {
      // Si l'élément est coché, sa valeur est ajoutée à un objet FormData
      if (checkCategories[i].checked) {
        formData.append("category_id[]", checkCategories[i].value);
      }
    }
    // La boucle suivante utilise la méthode formData.entries() pour afficher toutes les paires clé-valeur de l'objet FormData dans la console.
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // =================================Fin checkbox================================

    await axios
      .post(
        `http://127.0.0.1:8000/api/appmail_contacts/${appmail_contact}`,
        formData,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        }
      )
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
                    <Form onSubmit={updateContact}>
                      <Row>
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

                      {/* /////////////////////////////////////Checkbox////////////////////////////////////////////////////////////////////////////////////// */}
                      <Row>
                        <Col>
                          <div className="mt-4">
                            <label htmlFor="discipline">Catégories</label>
                            {categories.map((category) => (
                              <Form.Check
                                name="categories"
                                key={category.id}
                                type="checkbox"
                                label={category.appmail_category_name}
                                value={category.id}
                                defaultChecked={checkedCategories.includes(
                                  category.id
                                )}
                                onChange={(event) =>
                                  setIsChecked(event.target.checked)
                                }
                              />
                            ))}
                          </div>
                        </Col>
                      </Row>
                      {/* /////////////////////////////////////Fin Checkbox////////////////////////////////////////////////////////////////////////////////////// */}

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

export default EditEvent;
