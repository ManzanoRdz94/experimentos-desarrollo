import { Navbar, Content, VideoYoutube, InitiateButton } from "./components";
import React, { useEffect, useState } from "react";

export default function Intro() {

  const title = "Bienvenidos al Certificado Global de Data Science All";
  const intro =
    "Transfiere los conocimientos, habilidades y herramientas de la inteligencia de data science para la mejora de la sociedad.";

  return (
    <div className="App">
      <Navbar blocks={4} />
      <Content title={title} intro={intro} />
      <VideoYoutube embedId={"JmDKQeBgcgs"} />
      <InitiateButton number={1} />
    </div>
  );
}
