import { useState } from "react"
import { UseSelector, useDispatch } from "react-redux"
import { createGoal } from '../features/goals/goalSlice'
function MealForm() {
  const [mealName, setMealName] = useState('')
  const [mealDate, setMealDate] = useState(new Date())
  const [mealTime, setMealTime] = useState('')
  const [insulinDose, setInsulinDose] = useState(0)
  const [insulinTime, setInsulinTime] = useState('')
  const [carbCount, setCarbCount] = useState(0)

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ mealName, mealDate, mealTime, insulinDose, insulinTime, carbCount }))
    setMealName('')
    window.location.reload() //it weird, have to refresh otherwise it shows as undefined until refresh
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label htmlFor="mealName">Meal Name</label>
          <input type="text" name="mealName" id="mealName" value={mealName} onChange={(e) => setMealName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="mealDate">Meal Date</label>
          <input type="date" name="mealDate" id="mealDate" value={mealDate} onChange={(e) => setMealDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="mealTime">Meal Time</label>
          <input type="time" name="mealTime" id="mealTime" value={mealTime} onChange={(e) => setMealTime(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="insulinDose">Insulin Dose (U/mL)</label>
          <input type="number" name="insulinDose" id="insulinDose" value={insulinDose} onChange={(e) => setInsulinDose(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="insulinTime">Insulin Time</label>
          <input type="time" name="insulinTime" id="insulinTime" value={insulinTime} onChange={(e) => setInsulinTime(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="carbCount">Carb Count</label>
          <input type="number" name="carbCount" id="carbCount" value={carbCount} onChange={(e) => setCarbCount(e.target.value)} />
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Meal
          </button>
        </div>
      </form>
    </section>
  )
}

export default MealForm