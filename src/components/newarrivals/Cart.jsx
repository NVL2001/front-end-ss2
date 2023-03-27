import React from 'react';
import Ndata from './Ndata';

function Cart() {
  return (
    <div className="content grid product">
      {Ndata.map((val) => (
        <div className="box" key={val.name}>
          <div className="img">
            <img src={val.cover} alt="" />
          </div>
          <h4>{val.name}</h4>
          <span>
            $
            {val.price}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Cart;
