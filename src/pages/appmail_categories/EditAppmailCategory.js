import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

const EditAppmailCategory = () => {
  const { appmail_category } = useParams();
  const navigate = useNavigate();
  const [nameCategory, setNameCategory] = useState("");
  const [validationError, setValidationError] = useState({});
  const [user_id, setUserId] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getCategory = async () => {
    await axios
      .get(`http://localhost:8000/api/appmail_categories/${appmail_category}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        // console.log(res.data.appmail_category_name);
        setNameCategory(res.data.appmail_category_name);
        setUserId(res.data.user_id);
        // console.log(res.data.appmail_category_name);
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  };
  // console.log(appmail_category);
  //Fonction de modification de la catégorie
  const updateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("appmail_category_name", nameCategory);
    formData.append("user_id", user_id);

    await axios
      .post(
        `http://localhost:8000/api/appmail_categories/${appmail_category}`,
        formData,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        }
      )
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
                  <h3 className="card-title">Modifier une catégorie</h3>
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
                    <Form onSubmit={updateCategory}>
                      <Row>
                        <Col>
                          <Form.Group controlId="nameCategory">
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
                        className="btnBlue mt-2 btn-sm "
                        size="lg"
                        block="block"
                        type="submit"
                      >
                        Modifier
                      </Button>
                      <Button
                        className="btnBlue btn-sm me-2 mt-2 ms-2"
                        onClick={() => navigate(-1)}
                      >
                        Retour
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

export default EditAppmailCategory;
