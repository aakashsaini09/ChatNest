import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import mainImg from '../../assets/about.png'

const Auth= () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassowrd, setconfirmPassowrd] = useState("")
  const handleLogin = async() => {
    
  }
  const handleSignup = async() => {

  }
  return (
    <>
      <div className="flex items-center justify-center h-[100vh] w-[100vw]">
        <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w=[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
          <div className="flex flex-col gap-10 items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-center">
                <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                <img className="h-[100px]" src="https://img.lovepik.com/element/40118/6038.png_1200.png" alt="" />
              </div>
              <p className="font-medium text-center">Fill in the detaisl to get started with the best chat app!</p>
            </div>
            <div className="flex items-center justify-center w-full">
              <Tabs className="w-3/4">
                <TabsList className="bg-transparent rounded-none w-full">
                  <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">Login</TabsTrigger>
                  <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">SignUp</TabsTrigger>
                </TabsList>
                <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                  <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => {setemail(e.target.value)}}/>
                  <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                  <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                </TabsContent>
                <TabsContent className="flex flex-col gap-5" value="signup">
                  <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => {setemail(e.target.value)}}/>
                  <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                  <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassowrd} onChange={(e) => {setconfirmPassowrd(e.target.value)}}/>
                  <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="hidden xl:flex justify-center items-center">
            <img src={mainImg} alt="Login page" className="ml-10"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
