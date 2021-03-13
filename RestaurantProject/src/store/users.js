import {createSlice} from '@reduxjs/toolkit'

const slice  = createSlice ({
    name:'user',
       initialState:{
           user:[],

       },
       reducers:{
       
        addUser:(state,action) => {
          console.log(JSON.stringify("action=="+action))
          state.user.push(action.payload)
       }}
})

export default slice.reducer
const {addUser} = slice.actions
