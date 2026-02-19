import store from '../store'
import Activity_Tracker_Redux from './Activity_Tracker_Redux'
import './App.css'
import { Provider } from 'react-redux'

function App() {
// console.log("3432",store)
  return (
    <Provider store={store}>
      <div>Keep Working Hard ....</div>
      {/** Redux - Activity Tracker */}
      <Activity_Tracker_Redux/>
    </Provider>
  )
}

export default App
