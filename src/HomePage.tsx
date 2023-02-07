import { FC } from "preact/compat"

export const HomePage: FC<{}> = ({ }) => {

  return (
    <div className="h-screen w-screen bg-teal-500">
      <h1 className="font-bold text-9xl relative top-64 left-24">
        Hello World
      </h1>
    </div>
  )
}
