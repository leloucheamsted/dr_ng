import {Divider} from "antd";

function AppBar(){
    return (
        <div className=" z-10 bg-[#423a38] h-[4em] shadow-sm rounded-bl-[45px]">
            <div className="bg-[#5d91a6] h-[4em]  space-x-2 flex justify-start items-center p-5 w-[40%] rounded-bl-[45px] rounded-br-[90px]">

                <div className=" flex  h-7 justify-start mt-2 items-center ">
                    <h3 className="text-white text-center flex justify-center items-center font-bold text-xl">DrNG</h3>
                </div>
                <div className="h-7 w-[2px] bg-white"></div>
                <div className=" flex justify-center text-center h-7  mt-2 items-center ">
                    <h2 className="text-white  flex justify-center items-center font-bold text-xl ">PATIENTS</h2>
                </div>
            </div>
        </div>
    )
}

export  default AppBar;
