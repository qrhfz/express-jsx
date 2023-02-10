import { useSignal } from "@preact/signals";
import { FunctionComponent, render } from "preact";

const clickMeDiv = document.querySelector("#click-me");

const ClickMeButton: FunctionComponent = () => {
  const counter = useSignal(0)

  return (
    <button
      onClick={() => counter.value++}
      className="font-bold text-7xl">Click me {counter.value}</button>
  )
}

render(<ClickMeButton />, clickMeDiv!)