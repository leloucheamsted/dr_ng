import {Link} from "react-router-dom";
import {navigate} from "ionicons/icons";



function FloatingActionButton(){
    const goRegisterPage = ()=>{
        navigate('./registration');
    }
    return (
        // <Link href="/registration">
        <div  className="fixed cursor-pointer flex justify-center items-center bottom-5 right-10 rounded-[5px] shadow-sm w-10 h-10 bg-[#bb6470]">
            <a href='./registration'>
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" className="w-6 h-6 text-white font-bold">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </a>

        </div>
        // </Link>
    )
}
export  default  FloatingActionButton;
