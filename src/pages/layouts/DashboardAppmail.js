import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

const Dashboard = () => {
  const { user } = useParams();
  const [contacts, setContacts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // On récupère l'id du user
  const [userId, setUserId] = useState([]);

  const displayUser = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUserId(res.data.id);
      });
  };

  async function displayContacts() {
    await axios
      .get("http://localhost:8000/api/appmail_contacts", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const allContacts = res.data.data;
        const lastThreeContacts = allContacts.slice(-3);
        setContacts(lastThreeContacts);
      });
  }

  const displayCategories = async () => {
    await axios
      .get("http://localhost:8000/api/appmail_categories", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const allCategories = res.data.data;
        const lastThreeCategories = allCategories.slice(-3);
        setCategories(lastThreeCategories);
      });
  };

  useEffect(() => {
    displayContacts();
    displayCategories();
    displayUser();

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
          <div className="row justify-content-center mt-5 ms-3">
            <div className="col-10 col-sm-10 col-md-10">
              <a href="/appmail_contacts" className="bloc">
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
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Noms</th>
                          <th>Prénoms</th>
                          <th>Entreprises</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact) => (
                          <tr key={contact.id}>
                            <td>{contact.appmail_contact_lastname}</td>
                            <td>{contact.appmail_contact_firstname}</td>
                            <td>{contact.appmail_contact_business}</td>
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
        <Col>
          <div className="row justify-content-center mt-5">
            <div className="col-9 col-sm-9 col-md-9">
              <a href="/appmail_categories" className="bloc">
                <div className="card mt-5">
                  <div className="card-header">
                    <h3 className="card-title">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-bookmarks"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z" />
                        <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z" />
                      </svg>
                      <span className="menu">Catégories</span>
                    </h3>
                  </div>

                  <div className="card-body">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Noms des catégories</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.id}>
                            <td>{category.appmail_category_name}</td>
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
      </Row>
    </div>
  );
};
export default Dashboard;
