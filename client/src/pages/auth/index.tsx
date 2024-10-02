import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const Auth= () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confPassowrd, setconfPassowrd] = useState("")
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
                <TabsContent value="login"></TabsContent>
                <TabsContent value="signup"></TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
