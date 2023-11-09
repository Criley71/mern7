import {React, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import MealForm from '../components/mealForm'
import Spinner from '../components/Spinner'
import { getMeals, reset } from '../features/goals/goalSlice'
import MealItem from '../components/mealItem'
function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const { meals, isLoading, isError, message } = useSelector(
    (state) => state.meals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
      return
    }

    dispatch(getMeals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>PaxPal Meal Tracking</p>
    </section>
    < MealForm />

    <section className="content">
      {meals.length > 0 ? ( 
      <div className='meals'>
       {meals.map((meal) => (
         <MealItem key={meal._id} meal={meal} />
        ))} 
      </div> ): (<h3>No Meals Entered Yet</h3>)}
    </section>

    
    </>




  )
}

export default Dashboard

