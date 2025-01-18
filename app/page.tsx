"use client"
import Image from "next/image";
import { Navbar } from "./components/navbar/navbar";
import { Wrapper } from "./components/wrapper/wrapper";
import { Layers } from "lucide-react";
import { useEffect, useState } from "react";
import prisma from "./lib/prisma";
import { useUser } from "@clerk/nextjs";
import { createInvoiceUser } from "./actions";
import confetti from "canvas-confetti";

export default function Home() {
  const [invoiceName,setInvoiceName]=useState("");
  const [isInvoiceName,setIsInvoiceName]=useState(false);
  const email=useUser().user?.primaryEmailAddress?.emailAddress as string;

  useEffect(()=>{

    setIsInvoiceName(invoiceName.length < 20 && invoiceName.length > 0);

  },[invoiceName]);
  

  const handelInvoiceUser=async()=>{
    try {


        if(email){
        await createInvoiceUser(email as string,invoiceName);
        }
        setInvoiceName("");

      const modal=document.getElementById('my_modal_2') as HTMLDialogElement;

      if(modal){
        modal.close();
      }
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 999
      });
    
      
      
    } catch (error) {
      console.log(error);
      alert(error);
      
    }
  }


  

  return (

  <>
  
    
      
     <Wrapper>

     <div className="flex flex-col space-y-4 p-10">
      <h1>Mes Factures</h1>
      

      <div className="grid md:grid-cols-3 gap-4">
     
      <button className="border border-orange-500 rounded-md" onClick={()=>(document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}>
        
     <div className="flex flex-col items-center justify-center p-2">
     <h3>Créer une facture</h3>
     <div className="flex flex-col items-center justify-center  bg-neutral-800 rounded-full h-10 w-10 ">
            <Layers className="text-orange-400 h-6 w-6"/>
       </div>
     </div>



      </button>


   

      </div>
      
      </div>
  
  
  <dialog id="my_modal_2" className="modal">
    <div className="modal-box">
      <form action="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

    <div className="flex flex-col gap-4">
   
      <input type="text" className="input input-bordered "
      onChange={(e)=>setInvoiceName(e.target.value)}
      />
      {!isInvoiceName && <p className="text-error">Le nom de la facture doit avoir entre 1 et 20 caractères</p>}
      <button className="btn btn-warning w-1/3"
      onSubmit={handelInvoiceUser}
      disabled={!isInvoiceName}
      >Valider</button>
    
    </div>
     

    </div>
  </dialog>

  {/* <button className="border border-orange-500 rounded-md" onClick={()=>(document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}>
        
        <div className="flex flex-col items-center justify-center p-2">
        <h3>Créer une facture</h3>
        <div className="flex flex-col items-center justify-center  bg-neutral-800 rounded-full h-10 w-10 ">
               <Layers className="text-orange-400 h-6 w-6"/>
          </div>
        </div>
  
         </button> */}
  
      </Wrapper>

  </>

  );
}
