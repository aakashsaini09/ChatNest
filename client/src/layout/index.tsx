
import { ReactNode } from 'react';
// import logo from '../assets/img.jpg'
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
        {/* <img src={logo} height={60} width={100} alt="" /> */}
        <h1 className='font-bold text-3xl text-black'>Logo Here</h1>
      </header>
      {children}
    </>
  )
}

export default AuthLayout
