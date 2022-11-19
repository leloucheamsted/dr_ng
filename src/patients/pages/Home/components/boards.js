import { Divider } from 'antd';
import { FaSearch } from "react-icons/fa";
import Card from "../../../widgets/card";

function Boards(props) {

    const missed = props.data.filter((patient) => patient.status === 'missed')
    const passed = props.data.filter((patient) => patient.status === 'passed')
    const rescheduled = props.data.filter((patient) => patient.status === 'rescheduled')
    return (
        <div className="h-auto ml-[2em] lg:ml-[12em] mr-[2em] mt-[6em] lg:mr-[12em] ">
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
                    <input type="text" className="border-b-2 rounded-xl  ml-2 focus:outline-none mr-3 " placeholder="search" />
                    <FaSearch className="text-[#bb6470] cursor-pointer h-4 w-4 mr-2" />
                </div>


            </div>

            {/*    Cards*/}
            <div className="lg:flex lg:justify-center lg:space-x-[10em] sm:space-y-5 max-[640px]:space-y-5 lg:space-y-2   block w-full  mt-10 ">
                <Card status={'Missed'} number={missed.length}></Card>
                <Card status={'Rescheduled'} number={rescheduled.length}></Card>
                <Card status={'Passed'} number={passed.length}></Card>

            </div>
        </div>
    )
}

export default Boards;
