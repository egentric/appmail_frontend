import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

const AddAppmailCategory = () => {
  const navigate = useNavigate();
  const [nameCategory, setNameCategory] = useState("");
  const [validationError, setValidationError] = useState({});

  // On récupère l'id du user
  const [user, setUser] = useState([]);

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
  // console.log(role);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  //Fonction d'ajout de la categorie
  const AddCategory = async (e) => {
    e.preventDefault();
    const user_id = [];
    user_id.push(user.id);

    const formData = new FormData();
    formData.append("appmail_category_name", nameCategory);
    formData.append("user_id", user_id);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/appmail_categories`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/appmail_categories"))
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
                  <h3 className="card-title">Nouvelle catégorie</h3>
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
                    <Form onSubmit={AddCategory}>
                      <Row>
                        <Col>
                          <Form.Group controlId="nameType">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control
                              type="text"
                              value={nameCategory}
                              onChange={(event) => {
                                setNameCategory(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        className="btnBlue mt-2 btn-sm"
                        size="lg"
                        block="block"
                        type="submit"
                      >
                        Créer
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

export default AddAppmailCategory;
