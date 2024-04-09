import Head from 'next/head';
import '@styles/global.css';
import Nav from '@components/Nav';

export const metadata = {
  title: "BV_algo",
  description: "Discover the power of Bernstein Vazirani algorithm.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <Head>
        <link rel="icon" type
        href="assets/images/logo.svg" /> 
      </Head>
      <body>

        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>

      </body>
    </html>
  );
};

export default RootLayout;
