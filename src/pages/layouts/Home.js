import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import Button from "react-bootstrap/Button";

import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  // const [events, setEvents] = useState([]);
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   displayEvents();
  //   displayItems();
  // }, []);
  // // Sans les crochets ça tourne en boucle

  // const displayEvents = async () => {
  //   await axios.get("http://localhost:8000/api/events").then((res) => {
  //     const allEvents = res.data.data;
  //     const lastThreeEvents = allEvents.slice(-3);
  //     setEvents(lastThreeEvents);
  //   });
  // };

  // const displayItems = async () => {
  //   await axios.get("http://localhost:8000/api/items").then((res) => {
  //     const allItems = res.data.data;
  //     const lastThreeItems = allItems.slice(-3);
  //     setItems(lastThreeItems);
  //   });
  // };

  return (
    <div>
      <Navigation />
      <Row>
        <Col>
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
