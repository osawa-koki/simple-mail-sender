import Layout from "../components/Layout";
import { Alert, Button, Form, InputGroup, Table } from "react-bootstrap";
import { useState } from "react";
import setting from "../setting";

type MailSendStatus = -1 | 0 | 1;

export default function Info() {

  const [hostname, setHostname] = useState<string>("");
  const [port, setPort] = useState<number>(587);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [useAuth, setUseAuth] = useState<boolean>(true);
  const [mailFrom, setMailFrom] = useState<string>("");
  const [mailTo, setMailTo] = useState<string>("");
  const [mailSubject, setMailSubject] = useState<string>("💓 Love Letter 💓");
  const [mailBody, setMailBody] = useState<string>("🐙🐙🐙\r\n\r\nI love you 💖💖💖\r\n");
  const [status, setStatus] = useState<MailSendStatus>(1);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState<boolean>(false);

  const sendMail = async () => {
    setSending(true);
    setStatus(1);
    await new Promise((resolve) => setTimeout(resolve, 10)); // 少し待つ。
    const res = await fetch(`${setting.apiPath}/api/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        smtp_server: hostname,
        smtp_port: port.toString(),
        smtp_user: username,
        smtp_password: password,
        mail_from: mailFrom,
        mail_to: mailTo,
        mail_subject: mailSubject,
        mail_body: mailBody,
      }),
    });
    if (res.status === 200) {
      setStatus(0);
    } else {
      setStatus(-1);
      setError(await res.text());
    }
    setSending(false);
  };

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
            <InputGroup.Checkbox checked={useAuth} onInput={(e) => {setUseAuth(!(e.target as HTMLInputElement).checked)}} />
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
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>Enter subject.</Form.Label>
            <Form.Control type="text" value={mailSubject} onInput={(e) => {setMailSubject((e.target as HTMLInputElement).value)}} placeholder="💓 Love Letter 💓" />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Enter Content.</Form.Label>
            <Form.Control as="textarea" value={mailBody} onInput={(e) => {setMailBody((e.target as HTMLInputElement).value)}} rows={5} />
          </Form.Group>
        </Form>
        <div className="center mt-3">
          <Button variant="outline-primary" className="mt-3" disabled={sending} onClick={sendMail}>Send  📨</Button>
        </div>
        {
          status === -1 ? (
            <Alert variant="danger" className="mt-3">
              Failed to send mail🥺
              <hr />
              {error}
            </Alert>
          ) : status === 0 ? (
            <Alert variant="success" className="mt-3">
              Mail sent successfully🎉
            </Alert>
          ) : (
            <></>
          )
        }
      </div>
    </Layout>
  );
};
