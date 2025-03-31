import { Headphones } from "lucide-react";
import { Link } from "react-router";

export default function Logo (){
    return (
        <Link to='/'>
        <h1 className="flex text-xl gap-1 items-center text-white"><Headphones /> AudioSphere</h1>
        </Link> 
    )
}

