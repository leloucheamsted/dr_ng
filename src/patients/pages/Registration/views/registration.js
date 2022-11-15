import React from "react";
import AppBar from "../../../widgets/appBar";
import FloatingSaveButton from "../components/floating_save_button";
import {arrowBack, createOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/react";
import {Input} from "antd/es";
import GeneralInformation from "../components/general_info";
import AppoitermentInformation from "../components/appoitment_info";
import AddressInformation from "../components/address_info";
import Note from "../components/note";

class  Registration extends React.Component {
    render() {
        return(
            <div className="relative h-screen  bg-[#ede9e6] ">
                <AppBar></AppBar>
                <FloatingSaveButton></FloatingSaveButton>

            {/*    Title*/}
                <div className=" font-bold text-black  text-[15px] flex  space-x-[40px] justify-start items-center m-[40px] mt-10 mb-0  p-3 ">
                    <IonIcon className=" h-8 w-8 text-black cursor-pointer " icon={arrowBack}/> <text className="text-[20px]">NEW RECORD</text>
                </div >
                <div className="font-bold flex  justify-center items-center">
                    <div className="bg-red-300 w-[100px] h-1"></div>
                </div>
            {/*    General information*/}
                <GeneralInformation/>
                <div className=" ml-[90px] bg-[#bbb7b4] mt-5 h-[2px] w-full"></div>
            {/*    Appoitnment information*/}
                <AppoitermentInformation/>
            {/*    Address information*/}
                <AddressInformation/>
            {/*    Notes*/}
                <Note/>
            </div>
        )
    }

}
export  default Registration;
