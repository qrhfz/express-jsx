import { render } from "preact";
import { FC } from "preact/compat";
import { useState } from "react";

const clickMeDiv = document.querySelector("#click-me");

const ClickMeButton: FC = () => {
  const [click, setClick] = useState(0)

  return (
    <button
      onClick={() => setClick(click + 1)}
      className="font-bold text-7xl">Click me {click}</button>
  )
}

render(<ClickMeButton />, clickMeDiv!)