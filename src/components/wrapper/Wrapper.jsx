import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i class="fas fa-shipping-fast"></i>,
      title: "Ship toan quoc",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <i class="fas fa-thumbs-up"></i>,
      title: "Uy tin",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <i class="fas fa-shield-alt"></i>,
      title: "Si le gia tot",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <i class="fas fa-headset"></i>,
      title: "Ho tro 24/7  ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
