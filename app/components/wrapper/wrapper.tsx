import { Navbar } from "../navbar/navbar"

interface WrapperProps{
    children:React.ReactNode
}

export const Wrapper = ({children}:WrapperProps) => {

    return (
       <Navbar>
         {/* <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                        {children}
                </div>
            </div>
        </div> */}
          {children}
        </Navbar>
    )
    
}