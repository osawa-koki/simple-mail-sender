import Layout from "../components/Layout";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useState } from "react";
import setting from "../setting";

export default function Info() {

  const [hostname, setHostname] = useState<string>("");
  const [port, setPort] = useState<number>(25);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [useAuth, setUseAuth] = useState<boolean>(false);
  const [mailFrom, setMailFrom] = useState<string>("");
  const [mailTo, setMailTo] = useState<string>("");
  const [mailSubject, setMailSubject] = useState<string>("");
  const [mailBody, setMailBody] = useState<string>("");

  return (
    <Layout>
      <div id='Mail'>
        <h1>Simple Mail Sender</h1>
        <Form.Group className="mt-3">
          <Form.Label>Enter hostname and port.</Form.Label>
          <InputGroup  className="HostPort">
            <Form.Control className="Host" type="text" value={hostname} onInput={(e) => {setHostname((e.target as HTMLInputElement).value)}} placeholder="smtp.example.com" />
            <Form.Control className="Port" type="number" value={port} onInput={(e) => {setPort(parseInt((e.target as HTMLInputElement).value))}} placeholder="25" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Enter username.</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={username} onInput={(e) => {setUsername((e.target as HTMLInputElement).value)}} placeholder="osawa-koki@mail.example.com" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Enter password.</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox />
            <Form.Control type="text" value={password} onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}} placeholder="p@ssw0rd" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Mail from</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={mailFrom} onInput={(e) => {setMailFrom((e.target as HTMLInputElement).value)}} placeholder="osawa-koki@mail.example.com" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Mail to</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={mailTo} onInput={(e) => {setMailTo((e.target as HTMLInputElement).value)}} placeholder="my-girlfriend@mail.example.com" />
          </InputGroup>
        </Form.Group>
        <div className="center mt-5">
          <Button variant="outline-primary" className="mt-3">Send 📨</Button>
        </div>
      </div>
    </Layout>
  );
};
