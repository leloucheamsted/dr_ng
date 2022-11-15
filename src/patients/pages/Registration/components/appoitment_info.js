import React from "react";
import {DatePicker, Input, Select} from "antd/es";

class  AppoitermentInformation extends  React.Component{
    render() {
        return(
            <div className="mt-5 ml-[90px] mr-[90px] ">
                <h4 className="font-bold text-black  text-[15px] mb-5"> Appointment Information</h4>
                <div className=" h-20 flex space-x-2 justify-between items-center flex-wrap">

                    {/* appointment data*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Appointment date</h2>
                        <DatePicker  />

                    </div>

                    {/*    first time*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>First time</h2>
                        <Select
                            defaultValue="no"
                            style={{ width: 120 }}
                           // onChange={handleChange}
                            options={[
                                {
                                    value: 'no',
                                    label: 'No',
                                },
                                {
                                    value: 'yes',
                                    label: 'Yes',
                                },

                            ]}
                        />
                    </div>

                    {/* request data*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Request date</h2>
                        <DatePicker  />
                    </div>

                    {/*    appointment status */}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>First time</h2>
                        <Select
                            defaultValue="pending"
                            style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'pending',
                                    label: 'Pending',
                                },
                                {
                                    value: 'missed',
                                    label: 'Missed',
                                },
                                {
                                    value: 'rescheduled',
                                    label: 'Rescheduled',
                                },

                            ]}
                        />
                    </div>

                    {/*    appointment time*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Appointment time</h2>
                        <div className="bg-[#f8f8f8] text-[#b6b6b6] font-medium h-[7px] p-4 rounded-[8px] w-auto flex justify-between items-center ">
                           <div></div> AM
                        </div>
                        {/*<Input disabled={true} suffix="AM" />*/}

                    </div>

                </div>
            </div>
        )
    }
}

export default AppoitermentInformation;
