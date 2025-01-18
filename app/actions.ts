"use server"

import { randomBytes } from "crypto";
import prisma from "./lib/prisma";

export async function checkAddUser(email:string,name:string){


    if(!email) return;

    try {
        const existingUser=await prisma.user.findUnique(
            {where:{email}}
        );

        if(!existingUser && name){
            await prisma.user.create({data:{email,name}});
        }
        
    } catch (error) {

        console.error(error);
        
        
    }

}


const generateId=()=>{
    let uniqueId;
    let isUnique=false;

    while(!isUnique){
        uniqueId=randomBytes(3).toString("hex");

        const existingInvoice=prisma.invoice.findUnique({where:{id:uniqueId}});

        if(!existingInvoice){
            return true;
        }   
    }
    return uniqueId;

}
export async function createInvoiceUser(email:string,name:string){

try {

    const user=await prisma.user.findUnique({
        where:{email}
    });
    const invoiceUuid=await generateId() as string;

    if(user){
    
        await prisma.invoice.create({
            data:
            {
            id:invoiceUuid,
            userId:user?.id,
            name:name,
            issuerName:"",
            issuerAddress:"",
            clientName:"",
            clientAddress:"",
            invoiceDate:"",
            dueDate:"",
            vatActive:false,
            vatRate:20

            }
        });

    }
   
    
} catch (error) {
        console.log(error);
        
}

}