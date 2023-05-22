import React from "react";
import ReactImageZoom from "react-image-zoom";

function ZoomImage({ src, alt }) {
  return (
    <div className="zoom-image">
      <ReactImageZoom
        width={400}
        height={400}
        zoomWidth={500}
        img={src}
        alt={alt}
        zoomStyle={{
          transform: "scale(2)",
          transformOrigin: "50% 50%",
        }}
      />
    </div>
  );
}

export default ZoomImage;
