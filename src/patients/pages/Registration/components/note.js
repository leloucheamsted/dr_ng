import React from "react";
import {Input} from "antd/es";
import TextArea from "antd/es/input/TextArea";

class  Note extends  React.Component{
    render() {
        return(
            <div className=" ml-[90px] mr-[90px] ">
                <h4 className="font-bold text-black  text-[15px] mb-5"> Notes</h4>
                <div className=" h-20 flex space-x-10 justify-start items-center flex-wrap">
                    {/*    Before  1*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>Before Appointment </h2>
                        <TextArea rows={4} />
                    </div>

                    {/*    after*/}
                    <div className=" font-medium flex flex-col h-auto">
                        <h2>After Appointment </h2>
                        <TextArea rows={4} />
                    </div>


                </div>
            </div>
        )
    }
}

export default Note;
