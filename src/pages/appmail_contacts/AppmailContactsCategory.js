import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const AppmailContacts = () => {
  const { appmail_category } = useParams();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [contactsBusiness, setContactsBusiness] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]); // état pour stocker les catégories
  const [selectedValue, setSelectedValue] = useState("");
  const [contactsFilter, setContactsFilter] = useState([]);
  const [selectedValueB, setSelectedValueB] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    displayCategoryContacts();
    getCategories();
    displayContactsBusiness();

    const storedCategory = localStorage.getItem("selectedValue");
    if (storedCategory) {
      setSelectedValue(storedCategory);
    }
  }, []);
  // Sans les crochets ça tourne en boucle

  // // ------------Affichage Select Catégories----------------------------------------//

  const getCategories = async () => {
    await axios
      .get("http://localhost:8000/api/appmail_categories", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        // console.log(res);

        setCategories(res.data.data);
      });
  };
  // // ------------Fin Affichage Select------------------------------------------//

  // // ------------Récupértion value du Select Catégories------------------------------------------//
  const handleSelectChange = (event) => {
    const categoryId = event.target.value;
    localStorage.setItem("selectedValue", categoryId); // stockez la catégorie sélectionnée dans localStorage
    if (!selectedValueB) {
      // si secondSelectValue n'a pas de valeur, réinitialisez selectedValue
      setSelectedValue("");
    } else {
      setSelectedValue(categoryId);
    }
    /* eslint-disable no-restricted-globals */
    navigate(`/appmail_contacts/category/${categoryId}`);
    setSelectedValue(""); // réinitialisez la variable d'état
    window.location.reload();
  };
  // // ------------ button category dans le tableau------------------------------------------//
  const handleCategoryClick = (categoryId) => {
    localStorage.setItem("selectedValue", categoryId);
    setSelectedValue(categoryId);
    navigate(`/appmail_contacts/category/${categoryId}`);
    setSelectedValueB(""); // réinitialisez la variable d'état secondSelectValue
    window.location.reload();
  };
  // ============= fonction affichage du filtre business =====================

  const displayContactsBusiness = async () => {
    await axios
      .get(`http://localhost:8000/api/appmail_contacts`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        // console.log(res.data.data);

        setContactsBusiness(res.data.data);
      });
  };

  // // ------------ Définition de la fonction qui récupère les contacts filtrés par business ------------------------------------------//

  const displayContactFilterBusiness = (value) => {
    axios
      .get(
        `http://127.0.0.1:8000/api/contacts_filter?appmail_contact_business=${value}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data);

        setContacts(res.data.data);
        // console.log(setContactsFilter);
      });
  };

  // // ------------Récupértion value du Select business et l'envoie ------------------------------------------//
  const handleSelectChangeB = (event) => {
    const value = event.target.value;
    setSelectedValueB(value);
    setSelectedValue("");
    // console.log(value);
    // console.log(selectedValueB);
    setContacts([]);
    // Vérifier si l'option "Filtrer par Entreprise" est sélectionnée ou non
    if (value === "Filtrer par Entreprise :") {
      // Si l'option est sélectionnée, afficher tous les contacts
      displayCategoryContacts();
    } else {
      // Sinon, filtrer les contacts par entreprise sélectionnée
      displayContactFilterBusiness(value);
    }
  };

  // ============= fonction affichage general par Categories =====================

  const displayCategoryContacts = async () => {
    await axios
      .get(
        `http://localhost:8000/api/appmail_contacts/category/${appmail_category}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);

        setContacts(res.data.data);
      });
  };
  // ============= fonction delete =====================

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:8000/api/appmail_contacts/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayCategoryContacts);
  };

  // ============= fonction copie des emails =====================

  const handleCopyClick = () => {
    const emails = contacts.map((contact) => contact.appmail_contact_email);
    const allEmails = emails.join(", ");

    navigator.clipboard
      .writeText(allEmails)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  const handleClose = () => setCopied(false);
  // ============= fin fonction copie des emails =====================
  // ============= fonction reset =====================

  const handleResetClick = () => {
    navigate(`/appmail_contacts`);
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
            <div className="col-11 col-sm-11 col-md-11">
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-person-rolodex"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z" />
                    </svg>
                    <span className="menu">Contacts</span>
                  </h3>
                </div>

                <div className="card-body">
                  <Row>
                    {/* // // ------------Select Business---------------------------------// */}
                    <Col>
                      <Form.Group controlId="business">
                        <Form.Select
                          value={selectedValueB}
                          onChange={handleSelectChangeB}
                        >
                          <option>Filtrer par Entreprise :</option>
                          {[
                            ...new Set(
                              contactsBusiness.map(
                                (contactB) => contactB.appmail_contact_business
                              )
                            ),
                          ].map((business, index) => (
                            <option key={index} value={business}>
                              {business}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {/* // // ------------Fin Select--------------------------------// */}

                    {/* // // ------------Select Categories---------------------------------// */}
                    <Col>
                      <Form.Group controlId="category">
                        <Form.Select
                          value={selectedValue}
                          onChange={handleSelectChange}
                        >
                          <option value="">Filtrer par Catégorie :</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.appmail_category_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {/* // // ------------Fin Select--------------------------------// */}

                    {/* // // ------------ Copie mail --------------------------------// */}
                    <Col>
                      <Button
                        className="btn btnBlue btn-sm p-2 mx-2 "
                        onClick={() => {
                          handleCopyClick();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-clipboard-plus"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
                          />
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                        <span className="menu">Copier les adresses</span>
                      </Button>
                      <Modal show={copied} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Email copié</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Les adresses email ont été copiées dans le
                          presse-papiers.
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Fermer
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      {/* // // ------------ Reset --------------------------------// */}
                      <Button
                        className="btn btnBlue btn-sm p-2 "
                        onClick={() => {
                          handleResetClick();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-arrow-clockwise"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                          />
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                        <span className="menu">Reset</span>
                      </Button>
                    </Col>
                  </Row>
                  <Link
                    to={`/appmail_contacts/add`}
                    className="btn btnBlue btn-sm me-2 mb-2 mt-2"
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
                    <span className="menu">Nouveau</span>
                  </Link>

                  <Table striped bordered hover>
                    {/* <thead>
                      <tr>
                        <th colspan="6">
                          <h4>Catégorie {category.appmail_category_name}</h4>
                        </th>
                      </tr>
                    </thead> */}
                    <thead>
                      <tr>
                        <th>Noms</th>
                        <th>Prénoms</th>
                        <th>Emails</th>
                        <th>Entreprises</th>
                        <th>Catégories</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.appmail_contact_lastname}</td>
                          <td>{contact.appmail_contact_firstname}</td>
                          <td>{contact.appmail_contact_email}</td>
                          <td>{contact.appmail_contact_business}</td>
                          <td>
                            <ul>
                              {contact.appmail_category.map((category) => (
                                <li key={category.id}>
                                  <button
                                    className="btn btnWhite btn-sm"
                                    onClick={() =>
                                      handleCategoryClick(category.id)
                                    }
                                  >
                                    <span className="menu">
                                      {category.appmail_category_name}
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <Link
                              to={`/appmail_contacts/show/${contact.id}`}
                              className="btn btnBlue btn-1 btn-sm me-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-eye"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                              </svg>
                              <span className="menu">Voir</span>
                            </Link>
                            <Link
                              to={`/appmail_contacts/edit/${contact.id}`}
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
                              className="btn btnRed btn-sm"
                              onClick={() => {
                                deleteContact(contact.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>
                              <span className="menu">Supprimer</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
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
export default AppmailContacts;
