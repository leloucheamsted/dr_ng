import { Divider } from 'antd';
import {FaSearch} from "react-icons/fa";
import Card from "../../../widgets/card";

function Boards(){
    return (
        <div className="h-auto ml-[12em] mt-[2em] mr-[12em] ">
            <div className="flex w-full justify-between items-center  ">

                {/* title */}
                <div className="block">
                    <h2 className="text-[#ae5668] text-[20px] font-bold">Appointments</h2>
                    <div className="flex justify-center">
                        <div className=" -m-2 h-[0.15em] w-[5em] bg-[#bb6470]"></div>
                    </div>
                </div>

                {/* Search Bar*/}
                <div className="bg-white flex justify-center items-center w-auto rounded-xl h-auto p-2" >
                    <input type="text" className="border-b-2  ml-2 focus:outline-none mr-3 " placeholder="search"  />
                    <FaSearch className="text-[#bb6470] cursor-pointer h-4 w-4 mr-2"/>
                </div>


            </div>

            {/*    Cards*/}
            <div className="flex justify-between mt-10 space-x-10">
                <Card status={'Missed'} number={'15'}></Card>
                <Card status={'Rescheduled'} number={'21'}></Card>
                <Card status={'Passed'} number={'5'}></Card>

            </div>
        </div>
    )
}

export  default Boards;
