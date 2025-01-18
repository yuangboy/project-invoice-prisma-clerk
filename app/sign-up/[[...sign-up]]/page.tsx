import { Wrapper } from "@/app/components/wrapper/wrapper";
import {SignUp} from "@clerk/nextjs";


export default function Page() {
    return (
        <Wrapper>
            <SignUp />
        </Wrapper>
    )

}