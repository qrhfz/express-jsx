import { FC } from "preact/compat"

const HomePage: FC<{}> = ({ }) => {

  return (
    <div className="h-screen w-screen bg-teal-500 pt-64 pl-24">
      <h1 className="font-bold text-9xl mb-24">
        Hello World
      </h1>
      <div id="click-me">
        <button className="font-bold text-7xl">Click me</button>
      </div>

      <script src="/static/clickMeButton.js" />
    </div>
  )
}
export default HomePage
