import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import reducer from '../store/users'
import logger from "../middleware/logger";

export default function () {
    return configureStore({
         reducer,
         middleware:[
              ...getDefaultMiddleware(),
              logger(),
         ]
    })
}