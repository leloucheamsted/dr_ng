import React from "react";
import AppBar from "../../../widgets/appBar";
import FloatingSaveButton from "../components/floating_save_button";
import { arrowBack, createOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { Input, Select, DatePicker, Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector, useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect, Component } from 'react';
import moment from 'moment-timezone';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { getPatientsByid, addPatient, updatePatient, updatePatientAsync, addPatientAsync } from "../../../../redux/patientSlice";
export default function Registration() {
    // const router = useRouter()
    let { id } = useParams();

    const dispatch = useDispatch()
    var currentState = useSelector(getPatientsByid(id))
    const navigate = useNavigate();
    const [currentPatient, setcurentPatient] = useState(currentState)
    const [Patient, setPatient] = useState({
        code: null,
        name: null,
        gender: null,
        phone: null,
        appointmentDate: null,
        isFirstTime: null,
        requestDate: null,
        status: null,
        appointmentTime: null,
        requestDate: null,
        address: null,
        city: null,
        noteBefore: null,
        noteAfter: null,
        age: null,



    })

    // create unique code of users
    const createCode = (id, date) => {
        var ar = date.split("-")
        var code = `A${id + ar[2] + ar[1] + ar[0]}`
        console.log(code)
        return code
    }
    let [query, setQuery] = useState({
        method: "POST",

        body: Patient,
        URL: null
    })

    const handleChange = (event) => {
        //   event.preventDefault();
        if (currentState?.code) {
            setcurentPatient({ ...currentPatient, [event.target.name]: event.target.value });

        } else {
            setPatient({ ...Patient, [event.target.name]: event.target.value });


        }
        console.log(currentState)
    }

    useEffect(() => {
        //  console.log(currentPatient.code)
        // if (currentState?.code) {
        //     setQuery({ method: "PUT", body: JSON.stringify(currentPatient), URL: `https://medicalserverh.herokuapp.com/api/patients/${currentPatient?._id}` })
        // } else {
        //     setQuery({ method: "POST", body: JSON.stringify(Patient), URL: `https://medicalserverh.herokuapp.com/api/patients` })

        // }

    }, [currentPatient, Patient, id])

    moment.tz.setDefault("Afrca/Douala");

    const handleSubmit = async (event) => {
        if (event.appointmentDate) {
            event.appointmentDate = moment(event.appointmentDate._d).format("YYYY-MM-DD")
        }
        if (event.requestDate) {
            event.requestDate = moment(event.requestDate._d).format("YYYY-MM-DD")
        }
        if (event.isFirstTime === "yes") {
            event.isFirstTime = true
        } else {
            event.isFirstTime = false
        }
        event.age = parseInt(event.age)
        if (currentState?.code !== undefined) {
            console.log('Update patient info....')
            console.log(event)
            event.code = currentState.code

            dispatch(updatePatientAsync({ patient: event }))
            navigate(-1)
        }
        else {
            console.log('Create patient ....')
            event.code = createCode(parseInt(id) + 1, event.appointmentDate)
            console.log(event)
            dispatch(addPatientAsync({
                patient: event
            }))
            navigate(-1)
        }
    }

    return (
        <Form autoComplete="off" onFinish={handleSubmit}>
            <div className="relative h-screen  w-screen    bg-[#ede9e6] ">
                <AppBar></AppBar>
                <Form.Item>

                </Form.Item>
                <FloatingSaveButton></FloatingSaveButton>

                {/*    Title*/}
                <div onClick={() => navigate(-1)} className=" font-bold text-black  text-[15px] flex  space-x-[40px] justify-start items-center m-[40px] mt-10 mb-0  p-3 ">
                    <IonIcon className=" h-8 w-8 text-black cursor-pointer " icon={arrowBack} /> <text className="text-[20px]">NEW RECORD</text>
                </div >
                <div className="font-bold flex  justify-center items-center">
                    <div className="bg-red-300 w-[10em] h-[3px]"></div>
                </div>
                {/*    General information*/}
                {/* <GeneralInformation/> */}
                <div className="mt-10 ml-[90px] mr-[90px] ">
                    <h4 className="font-bold text-black  text-[15px] mb-5"> General Information</h4>
                    <div className="  flex space-y-4 space-x-2 justify-between items-center flex-wrap">

                        {/* Unique code*/}
                        <div className=" mb-5 font-medium flex flex-col h-auto">
                            <h2>Unique Code</h2>
                            <div className="bg-[#f8f8f8] text-[#b6b6b6] font-medium h-[7px] p-4 rounded-[8px] w-auto flex justify-between items-center ">
                                <div>{currentPatient?.code}</div>
                            </div>
                            {/*<Input disabled={true} className=" " style={{width:85}}></Input>*/}
                        </div>

                        {/*    Name*/}
                        <div className=" font-medium flex flex-col ">
                            <h2>Name</h2>
                            <Form.Item name="name" initialValue={currentPatient?.name} onInput={handleChange}
                                rules={[{ required: true, message: 'Please input  name!' }]}>
                                <Input id="name" value={currentPatient?.name} onInput={handleChange} className="" style={{ border: 2, borderColor: '#cdc9c6' }}></Input>
                            </Form.Item>
                        </div>

                        {/*    Gender*/}
                        <div className=" font-medium flex flex-col ">
                            <h2>Sex</h2>
                            <Form.Item name="gender" initialValue={currentPatient?.gender} rules={[{ required: true, message: 'Please input  sex!' }]} >
                                <Select name="gender" id="gender" onInput={handleChange}
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
                            </Form.Item>
                        </div>
                        {/*    Age*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Age</h2>
                            <Form.Item name="age" initialValue={currentPatient?.age}
                                rules={[{ required: true, message: 'Please input  age !' }]}>
                                <Input id="age" value={currentPatient?.age} onInput={handleChange} name="age" className=""></Input>
                            </Form.Item>
                        </div>
                        {/*    Phone*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Phone</h2>
                            <Form.Item initialValue={currentPatient?.phone} name="phone" rules={[{ required: true, message: 'Please input  phone!' }]}>
                                <Input onInput={handleChange} value={currentPatient?.phone} id="phone" name="phone" className=""></Input>
                            </Form.Item>
                        </div>

                    </div>
                </div>
                <div className=" ml-[90px] bg-[#bbb7b4] mt-5 h-[2px] w-[100%-200px]"></div>
                {/*    Appoitnment information*/}
                {/* <AppoitermentInformation /> */}
                <div className="mt-5 ml-[90px] mr-[90px] ">
                    <h4 className="font-bold text-black  text-[15px] mb-5"> Appointment Information</h4>
                    <div className=" flex space-x-2 justify-between items-center flex-wrap">

                        {/* appointment data*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Appointment date</h2>
                            <Form.Item id="appointmentDate" initialValue={moment(currentPatient?.appointmentDate)} name="appointmentDate"
                                rules={[{ required: true, message: 'Please input  date!' }]}>
                                <DatePicker format="YYYY-MM-D HH:m:s" onInput={handleChange} value={moment(currentPatient?.appointmentDate)} id="appointmentDate" name="appointmentDate" />
                            </Form.Item>

                        </div>

                        {/*    first time*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>First time</h2>
                            <Form.Item initialValue={currentPatient?.isFirstTime == true ? 'yes' : 'no'} name="isFirstTime">
                                <Select name="isFirstTime" id="isFirstTime"
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
                            </Form.Item>
                        </div>

                        {/* request data*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Request date</h2>
                            <Form.Item initialValue={moment(currentPatient?.requestDate)} name="requestDate">
                                <DatePicker format="YYYY-MM-D HH:m:s" onInput={handleChange} value={moment(currentPatient?.requestDate)} id="requestDate" name="requestDate" />
                            </Form.Item>
                        </div>

                        {/*    appointment status */}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Appointment Status</h2>
                            <Form.Item initialValue={currentPatient?.status} name="status">
                                <Select onInput={handleChange} id="status" name="status"
                                    defaultValue={currentPatient?.status}
                                    style={{ width: 120 }}
                                    // onChange={handleChange}
                                    options={[
                                        {
                                            value: 'passed',
                                            label: 'Passed',
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
                            </Form.Item>
                        </div>

                        {/* appointment time*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Appointment time</h2>
                            <div className="bg-[#f8f8f8] text-[#b6b6b6] font-medium h-[7px] p-4 rounded-[8px] w-auto flex justify-between items-center ">
                                <div>{currentPatient?.dateOfRecordEntry}</div> AM
                            </div>
                            {/*<Input disabled={true} suffix="AM" />*/}

                        </div>

                    </div>
                </div>
                {/*    Address information*/}
                {/* <AddressInformation /> */}
                <div className="mt-5 ml-[90px] mr-[90px] ">
                    <h4 className="font-bold text-black  text-[15px] mb-5"> Address Information</h4>
                    <div className="  lg:flex xl:flex  space-x-5 justify-start items-center flex-wrap">
                        {/*    Addresse 1*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Addresse 1</h2>
                            <Form.Item initialValue={currentPatient?.address} name="address">
                                <Input onInput={handleChange} value={currentPatient?.address} id="address" name="address" className="" style={{ border: 2, borderColor: '#cdc9c6' }}></Input>
                            </Form.Item>
                        </div>

                        {/*    City*/}
                        <div className=" font-medium flex flex-col ">
                            <h2>City</h2>
                            <Form.Item initialValue={currentPatient?.city} name="city">
                                <Input onInput={handleChange} value={currentPatient?.city} id="city" name="city" className=""></Input>
                            </Form.Item>
                        </div>


                    </div>
                </div>
                {/*    Notes*/}
                {/* <Note /> */}
                <div className=" ml-[90px] mr-[90px] ">
                    <h4 className="font-bold text-black  text-[15px] mb-5"> Notes</h4>
                    <div className=" h-20 lg:flex xl:flex  lg:space-x-10 justify-start items-center flex-wrap">
                        {/*    Before  1*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>Before Appointment </h2>
                            <Form.Item initialValue={currentPatient?.noteBefore} name="noteBefore">
                                <TextArea onInput={handleChange} value={currentPatient?.noteBefore} id="noteBefore" name="noteBefore" rows={4} />
                            </Form.Item>
                        </div>

                        {/*    after*/}
                        <div className=" font-medium flex flex-col h-auto">
                            <h2>After Appointment </h2>
                            <Form.Item initialValue={currentPatient?.noteAfter} name="noteAfter">
                                <TextArea onInput={handleChange} value={currentPatient?.noteAfter} id="noteAfter" name="noteAfter" rows={4} />
                            </Form.Item>
                        </div>


                    </div>
                </div>
            </div>
        </Form >
    )
}


