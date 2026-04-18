import { Route, Routes }  from "react-router-dom";
import Laout from './components/Layout';
import PostListPage from "../src/pages/PostListPage";
import SignupPage from "../src/pages/SignupPage";
import LoginPage from "../src/pages/LoginPage";


function App(){
  return (
    <Laout>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
    </Laout>
  )
}

export default App