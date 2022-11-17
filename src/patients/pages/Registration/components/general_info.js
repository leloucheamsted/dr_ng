import React from "react";
import { Input, Select, Form } from "antd/es";
class GeneralInformation extends React.Component {
    render() {
        return (
            <div className="mt-10 ml-[90px] mr-[90px] ">
                <h4 className="font-bold text-black  text-[15px] mb-5"> General Information</h4>
                <div className=" h-20 flex space-x-2 justify-between items-center flex-wrap">

                    {/* Unique code*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Unique Code</h2>
                        <div className="bg-[#f8f8f8] text-[#b6b6b6] font-medium h-[7px] p-4 rounded-[8px] w-auto flex justify-between items-center ">
                            <div></div>
                        </div>
                        {/*<Input disabled={true} className=" " style={{width:85}}></Input>*/}
                    </div>

                    {/*    Name*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Name</h2>
                        <Input className="" style={{ border: 2, borderColor: '#cdc9c6' }}></Input>
                    </div>

                    {/*    Gender*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Sex</h2>
                        <Select
                            defaultValue="Male"
                            style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'male',
                                    label: 'Male',
                                },
                                {
                                    value: 'female',
                                    label: 'Female',
                                },

                            ]}
                        />
                    </div>
                    {/*    Age*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Age</h2>
                        <Input className=""></Input>
                    </div>
                    {/*    Phone*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Phone</h2>
                        <Input className=""></Input>
                    </div>

                </div>
            </div>
        )
    }
}

export default GeneralInformation
