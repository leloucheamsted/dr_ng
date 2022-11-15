import {Button, Col, Input, InputNumber, Pagination, Row, Slider, Space, Table, Tag} from "antd";
import "antd/dist/antd.css";
import React, {useState,Component} from 'react';
import { useSelector, useDispatch,connect } from "react-redux";
import {IonIcon} from "@ionic/react";
import {filter,trash,search,createOutline,chevronUp,chevronDown} from "ionicons/icons";
import Icon from "antd/es/icon";
import Highlighter from "react-highlight-words";
import store from "../../../../store";
import {getPatients} from "../../../../slice/patientSlicer";
// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         code:'A123IFNFV',
//         age: 32,
//         gender:'male',
//         phone:'695451282',
//         address: 'New York No. 1 Lake Park',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['passed']
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         code:'A123IVFFV',
//         age: 42,
//         gender:'female',
//         address: 'London No. 1 Lake Park',
//         phone:'695451285',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['missed'],
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         code:'A123IFNCT',
//         age: 32,
//         gender:'male',
//         phone:'695451284',
//         address: 'Sidney No. 1 Lake Park',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['rescheduled'],
//     },
//     {
//         key: '4',
//         name: 'John Brown',
//         code:'A123IFNFV',
//         age: 32,
//         gender:'male',
//         phone:'695451282',
//         address: 'New York No. 1 Lake Park',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['passed']
//     },
//     {
//         key: '5',
//         name: 'Jim Green',
//         code:'A123IVFFV',
//         age: 42,
//         gender:'female',
//         address: 'London No. 1 Lake Park',
//         phone:'695451285',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['missed'],
//     },
//     {
//         key: '6',
//         name: 'Joe Black',
//         code:'A123IFNCT',
//         age: 32,
//         gender:'male',
//         phone:'695451284',
//         address: 'Sidney No. 1 Lake Park',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['rescheduled'],
//     },
//     {
//         key: '7',
//         name: 'John Brown',
//         code:'A123IFNFV',
//         age: 32,
//         gender:'male',
//         phone:'695451282',
//         address: 'New York No. 1 Lake Park',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['passed']
//     },
//     {
//         key: '8',
//         name: 'Jim Green',
//         code:'A123IVFFV',
//         age: 42,
//         gender:'female',
//         address: 'London No. 1 Lake Park',
//         phone:'695451285',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['missed'],
//     },
//     {
//         key: '9',
//         name: 'Joe Black',
//         code:'A123IFNCT',
//         age: 32,
//         gender:'male',
//         phone:'695451284',
//         address: 'Sidney No. 1 Lake Park',
//         appointmentDate:'',
//         dateOfRecordEntry:'',
//         status: ['rescheduled'],
//     },
// ];

const pageSize = 4;
  class     PatientsList extends React.Component {
      constructor(props) {
          super(props)
          this.state = {
              data: [],
              orderDirection:"",
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
          this.setState({

          })
      }
      getData = (current, pageSize) => {
          console.log(this.props.data);
          // Normally you should get the data from the server
          return Array.from(this.props.data).slice((current - 1) * pageSize, current * pageSize);
      };
    getColumnFiltersProps=({
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
                <Row>
                    <Button
                        type="primary"
                        block
                        size="small"
                        onClick={() => {
                            this.handleSearchAge(selectedKeys, confirm);
                            setSelectedKeys(
                                this.data
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
            <IonIcon className="text-black h-5 w-5" style={{ color: filtered ? '#1890ff' : undefined }} icon={filter}/>

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
                      onClick={() => this.handleReset('',confirm,clearFilters)}
                      size="small"
                      style={{ width: 90 }}
                  >
                      Reset
                  </Button>
              </div>
          ),
          filterIcon: filtered => (
            <IonIcon className="text-black h-4 w-4" style={{ color: filtered ? '#1890ff' : undefined }} icon={search}/>
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

      handleReset = (selectedKeys, confirm,clearFilters) => {
          this.searchInput='';
          clearFilters();
          confirm();
          this.setState({ searchText: selectedKeys[0] });
      };
      changeOrder = (direction) => () => {
          console.log(direction);
          this.setState({ orderDirection: direction});
      };
      handleChange = (page) => {
          this.setState({
              current: page,
              minIndex: (page - 1) * pageSize,
              maxIndex: page * pageSize
          });
      };


    render() {
        console.log(array)
        const { current, minIndex, maxIndex } = this.state;
        const array =Array.from(this.props.data)
        console.log(array)
        const columns = [
            {
                title:
                    (
                        <div className="flex justify-between font-bold text-sm text-black p-0">
                            Name <div>
                            <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                            </svg>

                            <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
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
                title:  (
                    <div className="flex justify-between font-bold text-sm text-black p-0">
                        Code <div>
                        <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                        </svg>

                        <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-3 h-3 font-bold text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
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
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                        </svg>

                        <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-3 h-3 font-bold text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                        </svg>

                    </div>
                    </div>
                ),
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => a.age-b.age,
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
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                            </svg>

                            <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
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
                filterIcon: filtered=><IonIcon className="text-black h-5 w-5" icon={filter}/> ,
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
                title:    (
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
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                            </svg>

                            <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
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
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                            </svg>

                            <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-3 h-3 font-bold text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                            </svg>

                        </div>
                        </div>
                    ),
                dataIndex: 'dateOfRecordEntry',
                key: 'dateOfRecordEntry',
                sorter: (a, b) => a.dateOfRecordEntry.localeCompare(b.dateOfRecordEntry),
                sortOrder: this.state.orderDirection,

            },
            {
                title:  (
                    <div className="flex justify-between font-bold text-sm text-black p-0">
                        Status <div>
                        <svg onClick={this.changeOrder("ascend")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                        </svg>

                        <svg onClick={this.changeOrder("descent")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-3 h-3 font-bold text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                        </svg>

                    </div>
                    </div>
                ),
                key: 'status',
                dataIndex: 'status',
                render: (_, { status }) => (
                    <>
                        {status.map((tag) => {
                            let bColor = tag=='rescheduled' ? '#fff5eb' : tag=='missed'? '#faf0f1' : '#ebf7f3';
                            let tColor = tag=='rescheduled' ? '#d39b4d' : tag=='missed'? '#d4383e' : '#708f7f';
                            if (tag === 'loser') {
                                bColor = 'volcano';
                            }
                            return (
                                <h6 className="p-[2px] flex justify-center rounded-[5px] font-bold" style={{backgroundColor: bColor, color: tColor}}>
                                    {tag}
                                </h6>
                            );
                        })}
                    </>
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

                filterIcon: filtered=><IonIcon className="text-black h-5 w-5" icon={filter}/> ,
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
                        <IonIcon className=" h-5 w-5 cursor-pointer text-[#d4383e]" icon={trash}/>
                        <a href='./registration'>
                            <IonIcon className=" h-5 w-5 cursor-pointer text-[#708f7f]" icon={createOutline}/>
                        </a>
                    </Space>
                ),
            },
        ];
        return (
            <div className="m-[6em] mt-10 h-full ">
                <Table rowClassName={() => "rowClassName1"}   pagination={false}
                       columns={columns} dataSource={this.getData(current, pageSize)}/>
               <div  className="flex  w-auto  justify-center items-center h-auto mt-10">
                   <Pagination
                       pageSize={pageSize}
                       current={current}
                       total={this.props.data.length}
                       onChange={this.handleChange}

                   />
               </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.patient
    };
};
// pagination={false} pagination={{defaultPageSize: 10,showSizeChanger: true,position: ["bottomCenter"]}}
export default connect(mapStateToProps)(PatientsList);
