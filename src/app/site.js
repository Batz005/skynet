import { createSlice } from '@reduxjs/toolkit'


// const findDefaultSubPage = (active__page) => {
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


const initialState = {
    isSignedIn: false,
    active__page: 'HOME__ACTIVE',
    active__subPage: 'FEED__SUBPAGE__ACTIVE'
};

const siteSlice = createSlice ({
    name: 'site',
    initialState,
    reducers: {
        pageSelected(state, action) {
            const { active__page } = action.payload
            state.active__page = active__page 
        },
        subPageSelected(state, action) {
            const { active__subPage } = action.payload
            state.active__subPage = active__subPage
        },
        signInStatus(state,action) {
            const { isSignedIn } = action.payload
            state.isSignedIn = isSignedIn;
        }
    }
}
)

export const { signInStatus, pageSelected, subPageSelected } = siteSlice.actions
export default siteSlice.reducer