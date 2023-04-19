import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import LogoRVB from "../LogoRVB";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_email", email);
    formData.append("password", password);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const log = await axios
      .post(`http://127.0.0.1:8000/api/login`, formData)
      .then((response) => {
        // const token = response.data.token
        console.log(response.data);
        if (response.data.status == "success") {
          localStorage.setItem(
            "access_token",
            response.data.authorisation.token
          );

          navigate("/");
        } else {
          console.error("Login failed");
        }
      });
    // .catch(( response ) => {
    //     // const data = response.json();
    //     if (response.status === 422) {
    //         setValidationError(response.data.errors);
    //     }
    // });
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
              <h3 className="card-title">Connectez-vous</h3>
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
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    Connexion
                  </Button>
                  <Row>
                    <a href="/register" className="register">
                      Enregistrez-vous
                    </a>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
