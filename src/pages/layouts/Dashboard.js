import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const { user } = useParams();
  const [types, setTypes] = useState([]);
  const [events, setEvents] = useState([]);
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [sites, setSites] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUser, setShowUser] = useState("");

  const [commentsUser, setCommentsUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // On récupère l'id du user
  const [role, setRole] = useState([]);

  const displayUser = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setRole(res.data.role_id);
      });
  };

  async function displayTypes() {
    await axios.get("http://localhost:8000/api/types").then((res) => {
      const allTypes = res.data.data;
      const lastThreeTypes = allTypes.slice(-3);
      setTypes(lastThreeTypes);
    });
  }

  const displayEvents = async () => {
    await axios.get("http://localhost:8000/api/events").then((res) => {
      const allEvents = res.data.data;
      const lastThreeEvents = allEvents.slice(-3);
      setEvents(lastThreeEvents);
    });
  };

  const displayItems = async () => {
    await axios.get("http://localhost:8000/api/items").then((res) => {
      const allItems = res.data.data;
      const lastThreeItems = allItems.slice(-3);
      setItems(lastThreeItems);
    });
  };
  const displayComments = async () => {
    await axios.get("http://localhost:8000/api/comments").then((res) => {
      const allComments = res.data.data;
      const lastThreeComments = allComments.slice(-3);
      setComments(lastThreeComments);
    });
  };
  const displaySites = async () => {
    await axios.get(`http://localhost:8000/api/sites`).then((res) => {
      const allSites = res.data.data;
      const lastThreeSites = allSites.slice(-3);
      setSites(lastThreeSites);
    });
  };
  const displayContacts = async () => {
    await axios
      .get("http://localhost:8000/api/contacts", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const allContacts = res.data.data;
        const lastThreeContacts = allContacts.slice(-3);
        setContacts(lastThreeContacts);
      });
  };
  const displayUsers = async () => {
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
  };

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

  const displayCommentsUser = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`http://127.0.0.1:8000/api/comments/user/${user}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setCommentsUser(res.data.data);
      });
  };
  // console.log(commentsUser);

  useEffect(() => {
    displayUser();
    displayTypes();
    displayEvents();
    displayItems();
    displayComments();
    displaySites();
    displayContacts();
    displayShowUser();
    displayUsers();
    displayCommentsUser();

    // setIsLoading(true);
    // fetchComUser().then((data) => {
    //   setCommentsUser(data);
    //   setIsLoading(false);
    // });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", display: "inline-flex" }}>
        {role === 1 && (
          <div className="container mt-5">
            <Row>
              {/* =======================EVENEMENTS======================= */}

              <div className="col-4 col-sm-12 col-md-4">
                <Link exact to="/events" className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">événements</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Titres</th>
                            {/* <th>Soustitres</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((event) => (
                            <tr key={event.id}>
                              <td>{event.titleEvent}</td>
                              {/* <td>{event.subtitleEvent}</td> */}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>

              {/* =======================ITEMS======================= */}

              <div className="col-4 col-sm-12 col-md-4">
                <Link exact to="/items" className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">articles</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Titres</th>
                            {/* <th>Soustitres</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.titleItem}</td>
                              {/* <td>{item.subtitleItem}</td> */}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>

              {/* =======================COMMENTS======================= */}
              <div className="col-4 col-sm-12 col-md-4 ">
                <Link exact to="/comments" className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Commentaires</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Titres</th>
                            <th>De l'articles</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comments.map((comment) => (
                            <tr key={comment.id}>
                              <td>{comment.titleComment}</td>
                              <td>{comment.titleItem}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>
            </Row>
            <Row className="row justify-content-center">
              {/* =======================SITES======================= */}
              <div className="col-6 col-sm-12 col-md-6 mt-3">
                <Link exact to="/sites" className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Sites</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Noms</th>
                            <th>Types</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sites.map((site) => (
                            <tr key={site.id}>
                              <td>{site.nameSite}</td>
                              <td>{site.type.nameType}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>

              {/* =======================TYPES======================= */}
              <div className="col-4 col-sm-12 col-md-4 mt-3">
                <Link exact to="/types" className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Types</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Types</th>
                          </tr>
                        </thead>
                        <tbody>
                          {types.map((type) => (
                            <tr key={type.id}>
                              <td>{type.nameType}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>
            </Row>
            <Row>
              {/* =======================Contact======================= */}
              <div className="col-6 col-sm-12 col-md-6 mt-3">
                <Link exact to="/contacts" className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Contacts</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Sujet</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map((contact) => (
                            <tr key={contact.id}>
                              <td>{contact.email}</td>
                              <td>{contact.topic}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>
              {/* =======================Utilisateurs======================= */}
              <div className="col-6 col-sm-12 col-md-6 mt-3">
                <Link exact to="/users" className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Utilisateurs</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Prénoms</th>
                            <th>Noms</th>
                            <th>Roles</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>
            </Row>
          </div>
        )}
        {/* =====================================DASHBOARD USER===================================================================================================== */}
        {role === 2 && (
          <div className="container mt-5">
            <Row>
              {/* =======================COMMENTS USER======================= */}

              <div className="col-8 col-sm-12 col-md-8 ">
                {isLoading ? (
                  <Link
                    exact
                    to={`/comments/user/${user.id}`}
                    className="cardlink"
                  >
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Commentaires</h4>
                        <hr />
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Titres</th>
                              <th>De l'articles</th>
                            </tr>
                          </thead>
                          <tbody>
                            {commentsUser.map((comment) => (
                              <tr key={comment.id}>
                                <td>{comment.titleComment}</td>
                                <td>{comment.titleItem}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Link>
                ) : (
                  "En cours de chargement"
                )}
              </div>
              {/* =======================Utilisateur======================= */}
              <div className="col-4 col-sm-12 col-md-4">
                <Link exact to={`/users/show/${user}`} className="cardlink">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Mon Compte</h4>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Prénoms</th>
                            <th>Noms</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{showUser.firstName}</td>
                            <td>{showUser.lastName}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Link>
              </div>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
