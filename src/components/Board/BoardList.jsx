import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const startNum = 1; 
    const endNum = 10;  

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://211.188.51.9:8090/SpringReact/board/list?startNum=${startNum}&endNum=${endNum}`);
                setPosts(response.data);
            } catch (e) {
                setError('오류');
                console.error(e);
            }
        };

        fetchPosts();
    }, [startNum, endNum]);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // 24-hour format
            timeZone: 'Asia/Seoul', // Set timezone if needed
        };
        const date = new Date(dateString); // Convert string to Date object
        return date.toLocaleString('ko-KR', options); // Format date to Korean locale
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>게시판 목록</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <table border="1" >
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>이메일</th>
                        <th>내용</th>
                        <th>작성시간</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <tr key={post.seq}>
                               <td><Link to={`/board/detail/${post.seq}`}>{post.seq}</Link></td>
                                <td>{post.subject}</td>
                                <td>{post.author}</td>
                                <td>{post.email}</td>
                                <td>{post.content}</td>
                                <td>{formatDate(post.logtime)}</td> {/* Format logtime */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">게시물이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;
