import { Outlet } from "react-router-dom"

const Home = () => {
  return (
    <>
      Homepage
      <section>
        <Outlet/>
      </section>
    </>
  )
}

export default Home
