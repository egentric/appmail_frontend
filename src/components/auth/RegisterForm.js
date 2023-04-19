import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import LogoRVB from "../LogoRVB";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [center, setCenter] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_firstname", firstName);
    formData.append("user_lastname", lastName);
    formData.append("user_email", email);
    formData.append("user_center", center);
    formData.append("password", password);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios
        .post(`http://127.0.0.1:8000/api/register`, formData)
        .then(navigate("/login"))
        .catch(({ response }) => {
          if (response.status === 422) {
            setValidationError(response.data.errors);
          }
        });

      const data = await response.json();
      if (data.status === "success") {
        console.log("Registration successful");
        console.log(data.authorisation.token);
        localStorage.setItem("token", data.authorisation.token);
        // window.location.href = "/";
        navigate("/", { replace: true });
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6 mt-5">
          <Row>
            <div className="mb-5 d-flex justify-content-center">
              <LogoRVB />
            </div>
          </Row>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Enregistrement</h3>
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

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formGroupFirstName">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupCenter">
                    <Form.Label>Centre</Form.Label>
                    <Form.Control
                      type="texte"
                      placeholder="Centre"
                      value={center}
                      onChange={(e) => setCenter(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="btnBlue mt-2 btn-sm"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Enregistrement
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
