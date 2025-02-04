import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@dhis2/ui-core'
import { Icon, LoadingIcon, icons } from '@hisp-amr/icons'
import { Table } from './Table'
import { followEvent } from '@hisp-amr/app'
import Link from '@material-ui/core/Link';


export const TableList = (props) => {
    const dispatch = useDispatch()
    // var rows = props.rows
    var title = props.title
    var isFollowUp = useSelector(state => state.data.followup)
    var eventStatus = props.eventStatus
    var code = props.code
    var [followupMaps, setFollowupMaps] = useState(isFollowUp);
    var [followValues, setFollowValues] = useState([]);
    const [rows, setRows] = useState([])



    useEffect(() => {
        if (props?.rows?.length) {
            let data = props.rows.map(item => {
                return {
                    type: item[0],
                    id: item[1],
                    gender: item[3],
                    lab: item[6],
                    date: item[10],
                    follow: '',
                    trakedid: item[7],
                    trackedProgram: item[9],
                    trackedOrg: item[9],


                }
            })
            setRows([...data])
        }
    }, [props])
    var isPink = eventStatus == "COMPLETED" && code == "GP" ? true : false


    // const starbuttons = async (e, tableMeta, isFollowUp) => {
    //     var registration = tableMeta.rowData[0].toString();
    //     var followValue = !isFollowUp[tableMeta.rowData[0]];
    //     setFollowupMaps({ ...followupMaps, [registration]: followValue })
    //     var trackedType = tableMeta.rowData[8]?.toString();
    //     var trackedID = tableMeta.rowData[7]?.toString();
    //     var trackedOrg = tableMeta.rowData[6].toString();
    //     var trackedProgram = tableMeta.rowData[9].toString();
    //     setFollowValues([trackedOrg, trackedID, trackedType, followValue, trackedProgram])
    // }

    const starbuttons = async (e, row, isFollowUp) => {
        var registration = row[0];
        var followValue = !isFollowUp[row[0]];
        setFollowupMaps({ ...followupMaps, [registration]: followValue })
        var trackedType = row.rowData[8];//
        var trackedID = row.rowData[6]
        var trackedOrg = row.rowData[7]
        var trackedProgram = row.rowData[9];//
        setFollowValues([trackedOrg, trackedID, trackedType, followValue, trackedProgram])
    }


    useEffect(() => {
        dispatch(followEvent(followupMaps, followValues))
    }, [followupMaps, isFollowUp, followValues])

    // if (eventStatus == "COMPLETED" && code == "GP") {
    //     headers = [
    //         {
    //             name: 'Patient type',
    //             options: {
    //                 customBodyRender: (value, tableMeta, updateValue) => {
    //                     return (
    //                         <Link
    //                             component="button"
    //                             variant="body2"
    //                             color = "inherit"
    //                             onClick={() => {
    //                                 onEventClick(tableMeta.rowData,tableMeta.rowData[6], tableMeta.rowData[7])
    //                             }}
    //                         >
    //                             {tableMeta.rowData[0]}
    //                         </Link>
    //                     );
    //                 }
    //             }
    //         },
    //         {
    //             name: 'Unique patient ID',
    //                             options: {
    //                 customBodyRender: (value, tableMeta, updateValue) => {
    //                     return (
    //                         <Link
    //                             component="button"
    //                             variant="body2"
    //                             color = "inherit"
    //                             onClick={() => {
    //                                 onEventClick(tableMeta.rowData,tableMeta.rowData[6], tableMeta.rowData[7])
    //                             }}
    //                         >
    //                             {tableMeta.rowData[1]}
    //                         </Link>
    //                     );
    //                 }
    //             }
    //         },
    //         {
    //             name: 'Ward',
    //             options: { display: false },
    //         },
    //         {
    //             // name: 'Age',
    //             name: 'Gender',
    //                             options: {
    //                 customBodyRender: (value, tableMeta, updateValue) => {
    //                     return (
    //                         <Link
    //                             component="button"
    //                             variant="body2"
    //                             color = "inherit"
    //                             onClick={() => {
    //                                 onEventClick(tableMeta.rowData,tableMeta.rowData[6], tableMeta.rowData[7])
    //                             }}
    //                         >
    //                             {tableMeta.rowData[3]}
    //                         </Link>
    //                     );
    //                 }
    //             }
    //         },
    //         // {
    //         //     name: 'Sex',

    //         //                     options: { display: false,
    //         //         customBodyRender: (value, tableMeta, updateValue) => {
    //         //             return (
    //         //                 <Link
    //         //                     component="button"
    //         //                     variant="body2"
    //         //                     color = "inherit"
    //         //                     onClick={() => {
    //         //                         onEventClick(tableMeta.rowData,tableMeta.rowData[6], tableMeta.rowData[7])
    //         //                     }}
    //         //                 >
    //         //                     {tableMeta.rowData[4]}
    //         //                 </Link>
    //         //             );
    //         //         }
    //         //     }
    //         // },
    //         // {
    //         //     name: 'Location',

    //         //                     options: { display: false,
    //         //         customBodyRender: (value, tableMeta, updateValue) => {
    //         //             return (
    //         //                 <Link
    //         //                     component="button"
    //         //                     variant="body2"
    //         //                     color = "inherit"
    //         //                     onClick={() => {
    //         //                         onEventClick(tableMeta.rowData,tableMeta.rowData[6], tableMeta.rowData[7])
    //         //                     }}
    //         //                 >
    //         //                     {tableMeta.rowData[5]}
    //         //                 </Link>
    //         //             );
    //         //         }
    //         //     }
    //         // },
    //         {
    //             name: 'Lab ID',
    //                             options: {
    //                 customBodyRender: (value, tableMeta, updateValue) => {
    //                     return (
    //                         <Link
    //                             component="button"
    //                             variant="body2"
    //                             color = "inherit"
    //                             onClick={() => {
    //                                 onEventClick(tableMeta.rowData,tableMeta.rowData[6], tableMeta.rowData[7])
    //                             }}
    //                         >
    //                             {tableMeta.rowData[6]}
    //                         </Link>
    //                     );
    //                 }
    //             }
    //         },
    //         {
    //             name: 'Sample Collection Date',
    //                             options: {
    //                 customBodyRender: (value, tableMeta, updateValue) => {
    //                     return (
    //                         <Link
    //                             component="button"
    //                             variant="body2"
    //                             color = "inherit"
    //                             onClick={() => {
    //                                 onEventClick(tableMeta.rowData,tableMeta.rowData[6], tableMeta.rowData[7])
    //                             }}
    //                         >
    //                             {tableMeta.rowData[10]}
    //                         </Link>
    //                     );
    //                 }
    //             }
    //         },
    //         {
    //             name: 'Organisation unit ID',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Tracked Entity Instance ID',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Tracked Entity Type',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Program',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Follow up',
    //             options: {
    //                 display: eventStatus == "COMPLETED" && code == "GP" ? true : false,
    //                 customBodyRender: (value, tableMeta, updateValue) => {
    //                     var opt = {}
    //                     var rowVal = tableMeta.rowData[0] + ''
    //                     if (Object.keys(followupMaps).length == 0) {
    //                         opt['destructive'] = true;
    //                     }
    //                     else if ((followupMaps[rowVal] == true) && (Object.keys(followupMaps).includes(rowVal))) {
    //                         opt['destructive'] = true;
    //                     }
    //                     else if ((followupMaps[rowVal] == false) && (Object.keys(followupMaps).includes(rowVal))) {
    //                         opt['secondary'] = true;
    //                     }
    //                     else {
    //                         opt['destructive'] = true;
    //                     }
    //                     return (
    //                         <Button {...opt}
    //                             icon={"star_filled" && <Icon icon={icons["star_filled"]} />}
    //                             className="FollowUp"
    //                             tooltip="Mark for un follow"
    //                             id="mybutton"
    //                             onClick={(e) => starbuttons(e, tableMeta, isFollowUp)}
    //                             size={15}
    //                         ></Button>
    //                     )

    //                 }
    //             }
    //         }]
    // }
    // else {
    //             headers = [
    //         {
    //             name: 'Patient type',
    //         },
    //         {
    //             name: 'Unique patient ID',
    //         },
    //         {
    //             name: 'Ward',
    //             options: { display: false },
    //         },
    //         {
    //             // name: 'Age',
    //             name: 'Sex',
    //         },
    //         {
    //             name: 'Sex',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Location',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Lab ID',
    //         },

    //         {
    //             name: 'Organisation unit ID',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Tracked Entity Instance ID',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Tracked Entity Type',
    //             options: { display: false },
    //         },
    //         {
    //             name:'Sample Collection Date',
    //          },
    //         {
    //             name: 'Program',
    //             options: { display: false },
    //         },
    //         {
    //             name: 'Follow up',
    //             options: {
    //                 display: eventStatus == "COMPLETED" && code == "GP" ? true : false,
    //                 customBodyRender: (value, tableMeta, updateValue) => {
    //                     var opt = {}
    //                     var rowVal = tableMeta.rowData[0] + ''
    //                     if (Object.keys(followupMaps).length == 0) {
    //                         opt['destructive'] = true;
    //                     }
    //                     else if ((followupMaps[rowVal] == true) && (Object.keys(followupMaps).includes(rowVal))) {
    //                         opt['destructive'] = true;
    //                     }
    //                     else if ((followupMaps[rowVal] == false) && (Object.keys(followupMaps).includes(rowVal))) {
    //                         opt['secondary'] = true;
    //                     }
    //                     else {
    //                         opt['destructive'] = true;
    //                     }
    //                     return (
    //                         <Button {...opt}
    //                             icon={"star_filled" && <Icon icon={icons["star_filled"]} />}
    //                             className="FollowUp"
    //                             tooltip="Mark for un follow"
    //                             id="mybutton"
    //                             onClick={(e) => starbuttons(e, tableMeta, isFollowUp)}
    //                             size={15}
    //                         ></Button>
    //                     )

    //                 }
    //             }
    //         }]
    // }//back up code 
    var headers = [
        {
            name: 'type',
            label: 'Patient type',
            options: {
                customBodyRender: (value, row, updateValue) => {
                    return (
                        <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            onClick={() => {
                                onEventClick(row.rowData, row.rowData[7], row.rowData[6])
                            }}
                        >
                            {value}

                        </Link>
                    );
                }
            }
        },
        {
            name: 'id',
            label: 'Unique patient ID',
            options:{
                customBodyRender: (value, row, updateValue) => {
                    return (
                        <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            onClick={() => {
                                onEventClick(row.rowData, row.rowData[7], row.rowData[6])
                            }}
                        >
                            {value}

                        </Link>
                    );
                }
            }
        },

        {
            name: 'gender',
            label: 'Gender',
            options:{
                customBodyRender: (value, row, updateValue) => {
                    return (
                        <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            onClick={() => {
                                onEventClick(row.rowData, row.rowData[7], row.rowData[6])
                            }}
                        >
                            {value}

                        </Link>
                    );
                }
            }
            
        },
        {
            name: 'lab',
            label: 'Lab ID',
            options:{
                customBodyRender: (value, row, updateValue) => {
                    return (
                        <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            onClick={() => {
                                onEventClick(row.rowData, row.rowData[7], row.rowData[6])
                            }}
                        >
                            {value}

                        </Link>
                    );
                }
            }
        },


        {
            name: 'date',
            label: 'Sample Collection Date',
        },


      
        // {
        //     name: 'follow',
        //     label: 'Follow up',
        //     options: {
        //         display: eventStatus == "COMPLETED" && code == "GP" ? true : false,
        //         customBodyRender: (value, row, updateValue) => {
        //             var opt = {}
        //             var rowVal = row.rowData[0] + ''
        //             if (Object.keys(followupMaps).length == 0) {
        //                 opt['destructive'] = true;
        //             }
        //             else if ((followupMaps[rowVal] == true) && (Object.keys(followupMaps).includes(rowVal))) {
        //                 opt['destructive'] = true;
        //             }
        //             else if ((followupMaps[rowVal] == false) && (Object.keys(followupMaps).includes(rowVal))) {
        //                 opt['secondary'] = true;
        //             }
        //             else {
        //                 opt['destructive'] = true;
        //             }
        //             return (
        //                 <Button {...opt}
        //                     icon={"star_filled" && <Icon icon={icons["star_filled"]} />}
        //                     className="FollowUp"
        //                     tooltip="Mark for un follow"
        //                     id="mybutton"
        //                     onClick={(e) => starbuttons(e, row, isFollowUp)}
        //                     size={15}
        //                 ></Button>
        //             )

        //         }
        //     }
        // },
        
        {
            name: 'trakedid',
            label: 'Track Entity ID',
            options:{
                display:false,
            }
        },
        {
            name: 'trackedProgram',
            label: 'Program',
            options:{
                display:false,
            }
        },


        {
            name: 'trackedOrg',
            label: 'org',
            options:{
                display:false,
            }
        },
    ]


    const onEventClick = (row, org, tei) => {
        props.onEventClick(row, org, tei)
    }

    return (
        <Table
            rows={rows}
            headers={headers}
            onEventClick={!isPink && onEventClick}
            title={title}
        />
    )

}
