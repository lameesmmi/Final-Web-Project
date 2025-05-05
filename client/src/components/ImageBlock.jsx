import React from "react";

const ImageBlock = ({ image, title, subtitle, height = "300px" }) => {
  return (
    <div
      className="image-block d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `url(${image})`,
        height,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "white",
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
      }}
    >
      {/* Optional dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // adjust opacity as needed
          zIndex: 1,
        }}
      ></div>

      {/* Text content */}
      <div style={{ zIndex: 2 }}>
        <h1 className="image-title">{title}</h1>
        {subtitle && <p className="image-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ImageBlock;
