/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './styles/App.scss';
import AlbumDetails from './components/AlbumDetails';
import albumData from './albumData';
import FakeStore from './components/FakeStore';

function App() {
  // function to grab current window size
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  // init states
  const [cartArray, setCart] = useState([]);
  const [subtotalState, setSubtotal] = useState(0);
  const [items, setItems] = useState(0);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  // adjust window size, accounts for resizing.
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // generates webpages for every album
  const albumRoutes = albumData.map((albums) => (
    <Route
      path={`/shop/${albums.id}`}
      element={
        <AlbumDetails
          name={albums.name}
          artist={albums.artist}
          price={albums.price}
          img={albums.image}
          id={albums.id}
          backgroundColor={albums.backgroundColor}
          cartArray={cartArray}
          setCart={setCart}
          subtotalState={subtotalState}
          setSubtotal={setSubtotal}
          items={items}
          setItems={setItems}
        />
      }
    />
  ));
  return (
    <div id="APP">
      <HashRouter>
        <Navbar cartArray={cartArray} />
        <Routes>
          <Route exact path="/" element={<Home windowSize={windowSize} />} />
          <Route path="/shop" element={<Shop />} />
          {albumRoutes}
          <Route
            path="/cart"
            element={
              <Cart
                cartArray={cartArray}
                setCart={setCart}
                subtotalState={subtotalState}
                setSubtotal={setSubtotal}
              />
            }
          />
          <Route path="/checkout" element={<FakeStore />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
