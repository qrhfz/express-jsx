import { render } from "preact";
import { FC, useState } from "preact/compat";

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