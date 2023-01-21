import Layout from "../components/Layout";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useState } from "react";
import setting from "../setting";

type Lang = {
  name: string;
  birthday: Date;
  on_trend: boolean;
}

export default function Info() {

  return (
    <Layout>
      <div id='Mail'>
        <h1>Simple Mail Sender</h1>
        <Form.Group className="mt-3">
          <Form.Label>Enter hostname and port.</Form.Label>
          <InputGroup  className="HostPort">
            <Form.Control className="Host" type="text" placeholder="smtp.example.com" />
            <Form.Control className="Port" type="number" placeholder="25" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Enter username.</Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder="osawa-koki@mail.example.com" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Enter password.</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox />
            <Form.Control type="text" placeholder="p@ssw0rd" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Mail from</Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder="osawa-koki@mail.example.com" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Mail to</Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder="my-girlfriend@mail.example.com" />
          </InputGroup>
        </Form.Group>
        <div className="center mt-5">
          <Button variant="outline-primary" className="mt-3">Send 📨</Button>
        </div>
      </div>
    </Layout>
  );
};
