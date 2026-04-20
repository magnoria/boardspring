import { useEffect, useState } from "react";
import { useParams , useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../api/auth";

function PostDetailPage(){
    const { id } = useParams();
    const  navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [message, setMessage] = useState('');
    
    const loginUserId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await apiFetch(`/api/posts/${id}`);
                setPost(data);
            } catch (error) {
                setMessage(error.message);
            }
        };
        fetchPost();
    }, [id])

    const handleDelete = async () => {
        const ok = confirm('정말 삭제하시겠습니까?');
        if (!ok) return;

        try {
            await apiFetch(`/api/posts/${id}`, {
                method: 'DELETE'
            });
            alert('삭제되었습니다.');
            navigate('/');
        } catch (error) {
            setMessage(error.message);
        }
    }

    if (message) {
        return <p className="error">{message}</p>;
    }

    if (!post) {
        return <p>불러오는 중...</p>;
    }
    //console.log('전체 응답:', post)
  
    const isOwner = post?.userId != null && Number(post.userId) === loginUserId;
    //console.log(post.userId)
    //console.log(loginUserId)
    // console.log('all keys check:', {
    // userId: localStorage.getItem('userId'),
    // id: localStorage.getItem('id'),
    // userID: localStorage.getItem('userID'),
    // email: localStorage.getItem('email'),
    // userName: localStorage.getItem('userName'),
    // })

    return (
        <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.userName}</p>
      <p>{post.content}</p>

      <div className="button-group">
        <Link to="/">목록</Link>
        {isOwner && <Link to={`/posts/${post.id}/edit`}>수정</Link>}
        {isOwner && <button onClick={handleDelete}>삭제</button>}
      </div>
    </div>
  )

}

export default PostDetailPage