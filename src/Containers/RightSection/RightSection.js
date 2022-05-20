import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './RightSection.css'
import { ViewState } from '@devexpress/dx-react-scheduler';


import {
    Scheduler,
    Appointments,
    AppointmentTooltip,
    DayView,
    AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import {Container} from '@mui/material'
import appointments from '../../Components/Events/appointments';
import { pageSelected } from '../../app/site';


// //FUNCTION FOR CALENDER
// const Calender = (props) => {
//     const [ data, setData] = useState(appointments)
    

//     return (
        
//           <Scheduler
//             data = {data}
//             height= {"80rem"}
//             maxWidth = {200}
//           >
//             <ViewState
//               defaultCurrentViewName="Day"
//             />
  
//             <DayView
//               startDayHour={9.5}
//               endDayHour={17}
//             />
            
           
//             <Appointments />
//             <AppointmentTooltip
//             showCloseButton
//             showOpenButton
//           />
          
//             <AllDayPanel />
            
//           </Scheduler>
        
//       );
// }



function RightSection() {
    const active__page = useSelector(state => state.site.active__page);
    return (
        // (active__page==='HOME__ACTIVE')?
        // <Container className = 'rightsection' maxWidth= "sm" disableGutters = {true}>
        //        <Calender className = "rightsection__calender"/>
        // </Container>
        // :
        <div className = "rightsection__empty">
          
        </div>
        
    )
}

export default RightSection
