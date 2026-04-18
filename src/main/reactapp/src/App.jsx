import { Route, Routes }  from "react-router-dom";
import Laout from './components/Layout';


function App(){
  return (
    <Laout>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/new" element={<PostCreatePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<PostEditPage />} />
      </Routes>
    </Laout>
  )
}

export default App