import React from "react";
import {Input} from "antd/es";

class  AddressInformation extends  React.Component{
    render() {
        return(
            <div className="mt-5 ml-[90px] mr-[90px] ">
                <h4 className="font-bold text-black  text-[15px] mb-5"> Address Information</h4>
                <div className=" h-20 flex space-x-10 justify-start items-center flex-wrap">
                    {/*    Addresse 1*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Addresse 1</h2>
                        <Input  className="" style={{border:2,borderColor:'#cdc9c6'}}></Input>
                    </div>

                    {/*    City*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>City</h2>
                        <Input  className=""></Input>
                    </div>


                </div>
            </div>
        )
    }
}

export default AddressInformation;
