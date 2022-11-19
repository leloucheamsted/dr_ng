import { Button, Col, Input, InputNumber, Pagination, Row, Slider, Space, Table, Tag } from "antd";
import "antd/dist/antd.css";
import React, { useState, Component, useEffect } from 'react';
import { useSelector, connect } from "react-redux";
import { IonIcon } from "@ionic/react";
import { filter, trash, search, createOutline, chevronUp, chevronDown } from "ionicons/icons";
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import Icon from "antd/es/icon";
import Highlighter from "react-highlight-words";
// import { useDispatch } from "react-redux";
import { deletePatient } from "../../../../redux/patientSlice";
import store from "../../../../redux/store";
const pageSize = 6;

class PatientsList extends React.Component {
    handleDeletePatient = (code) => {
        const { dispatch } = this.props;
        dispatch(deletePatient({
            code: code
        }));
    };
    constructor(props) {
        super(props)
        this.state = {

            orderDirection: "",
            searchText: "",
            left: 33,
            right: 50,
            totalPage: 0,
            current: 1,
            minIndex: 0,
            maxIndex: 0,
        }
    }
    componentDidMount() {
    }
    getData = (data, current, pageSize) => {
        return data.slice((current - 1) * pageSize, current * pageSize);
    };
    getColumnFiltersProps = ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
                <Row
                    type="flex"
                    gutter={10}
                    style={{ marginBottom: 8, alignItems: 'center' }}
                >
                    <Col>Range:</Col>
                    <Col>
                        <InputNumber
                            value={this.state.left}
                            onChange={e => {
                                this.setState({ left: e });
                                setSelectedKeys(this.data.filter(d => e <= d.age).map(d => d.key));
                            }}
                        />
                    </Col>
                    <Col>
                        <InputNumber
                            value={this.state.right}
                            onChange={e => {
                                this.setState({ right: e });
                                setSelectedKeys(this.data.filter(d => d.age <= e).map(d => d.key));
                            }}
                        />
                    </Col>
                </Row>
                <Row >
                    <Slider className=" w-full"
                        range
                        value={[this.state.left, this.state.right]}
                        onChange={e => this.setState({ left: e[0], right: e[1] })}
                    />
                </Row>
                <Row onClick={() => {
                    this.handleSearchAge(selectedKeys, confirm);
                    setSelectedKeys(
                        this.props.params
                            .filter(
                                d => this.state.left <= d.age && d.age <= this.state.right
                            )
                            .map(d => d.key)
                    );
                }}>
                    <Button
                        type="primary"
                        block
                        size="small"
                        onClick={() => {
                            this.handleSearchAge(selectedKeys, confirm);
                            setSelectedKeys(
                                this.props.params
                                    .filter(
                                        d => this.state.left <= d.age && d.age <= this.state.right
                                    )
                                    .map(d => d.key)
                            );
                        }}
                    >
                        Confirm
                    </Button>
                </Row>
            </div>
        ),
        filterIcon: filtered => (
            <IonIcon className="text-black h-5 w-5" style={{ color: filtered ? '#1890ff' : undefined }} icon={filter} />

        ),
        onFilter: (value, record) =>
            this.state.left <= record.age && record.age <= this.state.right,
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        )
    });
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
            <div className="custom-filter-dropdown">
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset('', confirm, clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <IonIcon className="text-black h-4 w-4" style={{ color: filtered ? '#1890ff' : undefined }} icon={search} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        )
    });
    handleSearchAge = (selectedKeys, confirm) => {
        confirm();
    };
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = (selectedKeys, confirm, clearFilters) => {
        this.searchInput = '';
        clearFilters();
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    changeOrder = (direction) => () => {
        console.log(direction);
        this.setState({ orderDirection: direction });
    };
    handleChange = (page) => {
        this.setState({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };


    render() {
        //console.log(array)

        const { current, minIndex, maxIndex } = this.state;
        //  const array = Array.from(this.props.params)
        console.log(this.props.params)
        moment.tz.setDefault("Afrca/Douala");

        const columns = [
            {
                title:
                    (
                        <div className="flex justify-between font-bold text-sm text-black p-0">
                            Name <div>
                                <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>

                                <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>

                            </div>
                        </div>
                    ),
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortOrder: this.state.orderDirection,
                ...this.getColumnSearchProps("name"),
                render: (text) => <a>{text}</a>,
            },
            {
                title: (
                    <div className="flex justify-between font-bold text-sm text-black p-0">
                        Code <div>
                            <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>

                            <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </div>
                    </div>
                ),
                dataIndex: 'code',
                key: 'code',
                sorter: (a, b) => a.code.localeCompare(b.code),
                sortOrder: this.state.orderDirection,
            },
            {
                title: (
                    <div className="flex justify-between font-bold text-sm text-black p-0">
                        Age <div>
                            <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>

                            <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </div>
                    </div>
                ),
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => a.age - b.age,
                sortOrder: this.state.orderDirection,
                ...this.getColumnFiltersProps

            },
            {
                title:
                    (
                        <div className="flex justify-between font-bold text-sm text-black p-0">
                            Gender <div>
                                <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>

                                <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>

                            </div>
                        </div>
                    ),
                dataIndex: 'gender',
                key: 'gender',
                filters: [
                    {
                        text: 'male',
                        value: 'male',
                    },
                    {
                        text: 'female',
                        value: 'female',
                    },
                ],
                sorter: (a, b) => a.gender.localeCompare(b.gender),
                sortOrder: this.state.orderDirection,
                filterIcon: filtered => <IonIcon className="text-black h-5 w-5" icon={filter} />,
                onFilter: (value, record) => record.gender.indexOf(value) === 0,


            },
            {
                title:
                    (
                        <div className="flex justify-between font-bold text-sm text-black p-0">
                            Phone
                        </div>
                    ),
                dataIndex: 'phone',
                key: 'phone',
                ...this.getColumnSearchProps("phone")

            },
            {
                title: (
                    <div className="flex justify-between font-bold text-sm text-black p-0">
                        Address
                    </div>
                ),
                dataIndex: 'address',
                key: 'address',
                ...this.getColumnSearchProps("address")
                // filterIcon: filtered=><IonIcon className="text-black h-4 w-4" icon={search}/> ,
                //  onFilter: (value, record) => record.address.indexOf(value) === 0
            },
            {
                title:
                    (
                        <div className="flex justify-between font-bold text-sm text-black p-0">
                            AppointmentDate <div>
                                <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>

                                <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>

                            </div>
                        </div>
                    ),
                dataIndex: 'appointmentDate',
                key: 'appointmentDate',
                sorter: (a, b) => a.appointmentDate.localeCompare(b.appointmentDate),
                sortOrder: this.state.orderDirection,

            },
            {
                title:
                    (
                        <div className="flex justify-between font-bold text-sm text-black p-0">
                            DateOfRecordEntry <div>
                                <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>

                                <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>

                            </div>
                        </div>
                    ),
                dataIndex: 'requestDate',
                key: 'requestDate',
                compare: (a, b) => a.requestDate.localeCompare(b.requestDate),
                sortOrder: this.state.orderDirection,

            },
            {
                title: (
                    <div className="flex justify-between font-bold text-sm text-black p-0">
                        Status <div>
                            <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>

                            <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </div>
                    </div>
                ),
                key: 'status',
                dataIndex: 'status',
                render: status => (
                    <h6 className="p-[2px] flex justify-center rounded-[5px] font-bold"
                        style={status === 'rescheduled' ? { backgroundColor: '#fff5eb', color: '#d39b4d' } : status === 'missed' ? { backgroundColor: '#faf0f1', color: '#d4383e' } : { backgroundColor: '#ebf7f3', color: '#708f7f' }} >
                        {status}
                    </h6>

                ),
                filters: [
                    {
                        text: 'passed',
                        value: 'passed',
                    },
                    {
                        text: 'missed',
                        value: 'missed',
                    },
                    {
                        text: 'rescheduled',
                        value: 'rescheduled',
                    },
                ],

                filterIcon: filtered => <IonIcon className="text-black h-5 w-5" icon={filter} />,
                onFilter: (value, record) => record.status.indexOf(value) === 0,
                sorter: (a, b) => a.status.localeCompare(b.status),
                sortOrder: this.state.orderDirection,
            },
            {
                title:
                    (
                        <div className="flex justify-between font-bold text-sm text-black p-0">
                            Action
                        </div>
                    ),
                key: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <IonIcon onClick={(e) => this.props.handleDeletePatient(e)} value={record.code} className=" h-5 w-5 cursor-pointer text-[#d4383e]" icon={trash} />

                        {/* // </button>  href={`./registration/${record.code}`} */}
                        <Link to={`./registration/${record.code}`}>
                            <div >
                                <IonIcon className=" h-5 w-5 cursor-pointer text-[#708f7f]" icon={createOutline} />
                            </div>
                        </Link>
                    </Space>
                ),
            },
        ];
        return (
            <div className="lg:m-[6em] m-[2em] mt-10  h-auto  ">
                <Table className="overflow-hidden max-[1400px]:overflow-scroll  " rowClassName={() => "rowClassName1"} pagination={false}
                    columns={columns} dataSource={this.getData(this.props.params, current, pageSize)} />
                <div className="flex  w-auto  justify-center items-center h-auto mt-8">
                    <Pagination
                        pageSize={pageSize}
                        current={current}
                        total={this.props.params.length}
                        onChange={this.handleChange}

                    />
                </div>

            </div>
        )
    }
}
export default connect()(PatientsList);