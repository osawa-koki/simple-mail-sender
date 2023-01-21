import Layout from "../components/Layout";
import { Button, Table } from "react-bootstrap";
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
      <div id='Info'>
        <h1>Simple Mail Sender</h1>
        <Button variant="primary" className="mt-3">Fetch 🐸</Button>
      </div>
    </Layout>
  );
};
