"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers } from "lucide-react";
import { UserButton,useUser} from "@clerk/nextjs";
import { useEffect } from "react";
import {checkAddUser} from "@/app/actions";

interface NavBarProps {
    children:React.ReactNode
}




export const Navbar = ({children}:NavBarProps) => {

    const pathname=usePathname();
    const {user}=useUser();

    useEffect(()=>{
            if(user?.primaryEmailAddress?.emailAddress && user?.fullName){
                checkAddUser(user?.primaryEmailAddress?.emailAddress,user?.fullName)
            }
    },[user])

const isActiveLink=(href:string)=>
    href.replace("//\$/","")===pathname.replace("//\$/","");

const NavbarLink=[
    {
        href:"/",
        name:"Home"
    },
    {
        href:"/service",
        name:"Service"
    }
];

const renderNavBar=(actionClass?:string)=>(

    NavbarLink.map(({href,name})=>(
        <Link href={href} key={href} className={clsx("text-sm ",isActiveLink(href) ? "btn btn-warning":"",actionClass)}>
            {name}
        </Link>
    ))
)

    return (
      <>
          <div className="min-w-full border-b border-base-300 py-2 px-5 md:p[10%]"> 

<div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
       <div className="flex flex-col items-center justify-center  bg-neutral-800 rounded-full h-10 w-10 ">
            <Layers className="text-orange-400 h-6 w-6"/>
       </div>
       <h1 className="text-2xl font-bold italic">In<span className="text-orange-400">voice</span></h1>
    </div>
   <div className="flex space-x-3 items-center">
   {renderNavBar("p-2")}
   <UserButton/>
   </div>
</div>

</div>

    {children}
    
      </>
    )

}