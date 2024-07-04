import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'


export const useAuthContext=()=>{

      const context=useContext(AuthContext)
      if(!context){
        throw Error('UseWorkoutContext must be used inside a workoutContextProvider')
      }
    
      return context


    
}

