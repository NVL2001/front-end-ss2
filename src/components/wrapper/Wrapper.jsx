import React from 'react';
import './style.css';

function Wrapper() {
  const data = [
    {
      cover: <i className="fas fa-shipping-fast" />,
      title: 'Ship toan quoc',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
    {
      cover: <i className="fas fa-thumbs-up" />,
      title: 'Uy tin',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
    {
      cover: <i className="fas fa-shield-alt" />,
      title: 'Si le gia tot',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
    {
      cover: <i className="fas fa-headset" />,
      title: 'Ho tro 24/7  ',
      decs: 'We offer competitive prices on our 100 million plus product any range.',
    },
  ];
  return (
    <section className="wrapper background">
      <div className="container grid2">
        {data.map((val) => (
          <div className="product" key={val.title}>
            <div className="img icon-circle">
              <i>{val.cover}</i>
            </div>
            <h3>{val.title}</h3>
            <p>{val.decs}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Wrapper;
