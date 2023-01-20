import Link from "next/link";
import Layout from "../components/Layout";
import pages from "../pages";

export default function Home() {
  return (
    <Layout menu={false} footer={false}>
      <div id='Index'>
        <h1>Hello Next.js 💓💓💓</h1>
        <img id='Logo' src="./tako.png" alt="Logo" />
        <div id="IndexLink">
        {
          pages.map((page, index: number) => {
            return (
              <Link key={index} href={page.path}>
                {page.name}
              </Link>
            )
          })
        }
        </div>
      </div>
    </Layout>
  );
};
