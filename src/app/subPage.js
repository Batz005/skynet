// import React from 'react'
// import { createSlice } from '@reduxjs/toolkit'
// import { useSelector } from 'react-redux';
// import pageReducer from './page';
    


// const FindDefaultSubPage = () => {
//     const active__page = useSelector(state => state.active__page);
//     switch(active__page){
//         case 'HOME__ACTIVE':
//             return 'FEED__SUBPAGE__ACTIVE';
//         case 'FRIENDS__ACTIVE':
//             return 'FRIENDS__SUBPAGE__ACTIVE';
//         case 'CLUBS__ACTIVE':
//             return 'CLUBS__SUBPAGE__ACTIVE';
//         case 'EVENTS__ACTIVE':
//             return 'EVENTS__SUBPAGE__ACTIVE';
//         case 'ACTIVITIES__ACTIVE':
//             return 'ACTIVITIES__SUBPAGE__ACTIVE';
//         case 'RESOURCES__ACTIVE':
//             return 'RESOURCES__SUBPAGE__ACTIVE';
//         case 'HELP__ACTIVE':
//             return 'HELP__SUBPAGE__ACTIVE';
//         default:
//             return 'FEED__SUBPAGE__ACTIVE';
//     }
// }

// const initialState = {
//     active__subpage: FindDefaultSubPage()
// };

// const subPageSlice = createSlice ({
//     name: 'subPage',
//     initialState,
//     reducers: {
//         subPageSelected(state, action) {
//             const { active__subpage } = action.payload
//             state.active__subpage = active__subpage
//         }
//     }
// }
// )

// export const { subPageSelected } = subPageSlice.actions
// export default subPageSlice.reducer