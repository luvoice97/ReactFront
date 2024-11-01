import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
    const { seq } = useParams(); 
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState('');

    const getData = useCallback(() => {
        axios.get(`http://211.188.51.9:8090/SpringReact/board/detail?seq=${seq}`)
            .then(res => setDetail(res.data))
            .catch(err => {
                setError('오류가 발생했습니다.');
                console.error(err);
            });
    }, [seq]);

    useEffect(() => {
        if (seq) {
            getData();
        } else {
            setError('에러');
        }
    }, [seq, getData]); // Add seq directly to the dependency array

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>상세글보기</h1>
            {detail ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>이메일</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={detail.seq}>
                            <td>{detail.seq}</td>
                            <td>{detail.subject}</td>
                            <td>{detail.author}</td>
                            <td>{detail.email}</td>
                            <td>{detail.content}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default BoardDetail;
