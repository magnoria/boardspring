import { Route, Routes }  from "react-router-dom";
import Laout from './components/Layout';


function App(){
  return (
    <Laout>
      <Routes>
        <Route path="/"></Route>
      </Routes>
    </Laout>
  )
}

export default App