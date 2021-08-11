import {
  Navbar,
  VideoYoutube,
  Content,
  Resources,
  Labs,
  Infographic,
  Test
} from "./components/Block";
import React from "react";

export default function Block() {

  return (
    <div className="App">
      <Navbar blocks={4} />
      <VideoYoutube embedId={"Ylfu-8HgT04"} block={1} />
      <Content />
      <Resources />
      <Labs />
      <Infographic />
      <Test />
    </div>
  );
}
