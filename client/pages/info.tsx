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

  const [lang, setLang] = useState<Lang[]>([]);

  const FetchData = async () => {
    const res = await fetch(`${setting.apiPath}/api/lang`);
    const data = await res.json();
    setLang(data as Lang[]);
  };

  return (
    <Layout>
      <div id='Info'>
        <h1>Which lang is on trend???</h1>
        <Button variant="primary" onClick={FetchData} className="mt-3">Fetch 🐸</Button>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthday</th>
              <th>On trend</th>
            </tr>
          </thead>
          <tbody>
            {lang.map((lang) => (
              <tr key={lang.name}>
                <td>{lang.name}</td>
                <td>{lang.birthday}</td>
                <td>{lang.on_trend ? '🚀🚀🚀' : '😢'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};
