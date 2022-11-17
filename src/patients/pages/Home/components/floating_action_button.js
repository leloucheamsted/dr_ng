import { Link } from "react-router-dom";
import { navigate } from "ionicons/icons";



function FloatingActionButton(props) {
    const goRegisterPage = () => {
        navigate('./registration');
    }
    return (

        //  <Link href="/registration">
        <div className="fixed cursor-pointer flex justify-center items-center bottom-5 right-10 rounded-[5px] shadow-sm w-10 h-10 bg-[#bb6470]">
            {/* <Link to ={{
          pathname: `user/${user.id}`,
          query: {
            //   param1: param1, 
            //   param2: param2, 
            //   paramobj: JSON.stringify(yourObj)
            //   }
            }> */}
            <Link to={{ pathname: `/registration/create/${props.params}`, query: { id: "lelouche" } }}>

                <a >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" className="w-6 h-6 text-white font-bold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </a> </Link>

        </div>
        // </Link>
    )
}
export default FloatingActionButton;
