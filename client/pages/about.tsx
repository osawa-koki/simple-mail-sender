import Layout from "../components/Layout";

export default function HelloWorld() {
  return (
    <Layout>
      <div id="About">
        <h1>Here, About page.</h1>
        <p className="mt-3">Go言語×Next.jsで実装した簡単なメール送信ページです。<br />Goの標準ライブラリ"net/smtp"でメールを送信しています。<br /><br />Yeah!!!</p>
      </div>
    </Layout>
  );
};
