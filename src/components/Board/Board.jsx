import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Board = ({ loginId }) => {

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [email, setEmail] = useState(''); 
    const [author, setAuthor] = useState(''); 
    const [subjectError, setSubjectError] = useState('');
    const [contentError, setContentError] = useState('');
    const [emailError, setEmailError] = useState(''); 
    const [authorError, setAuthorError] = useState(''); 
    const [message, setMessage] = useState('');
    const navigate =useNavigate();

    const submit = (e) => {
        e.preventDefault(); 
        setSubjectError('');
        setContentError('');
        setEmailError('');
        setAuthorError('');
        setMessage('');

        const newSubjectError = !subject ? '제목을 입력하세요.' : '';
        const newContentError = !content ? '내용을 입력하세요.' : '';
        const newEmailError = !email ? '이메일을 입력하세요.' : '';
        const newAuthorError = !author ? '작성자를 입력하세요.' : '';

        setSubjectError(newSubjectError);
        setContentError(newContentError);
        setEmailError(newEmailError);
        setAuthorError(newAuthorError);

        if (!newSubjectError && !newContentError && !newEmailError && !newAuthorError) {
            const params = new URLSearchParams();
            params.append('subject', subject);
            params.append('content', content);
            params.append('email', email);
            params.append('author', author);
            params.append('loginId', loginId);

            axios.get('http://211.188.51.9:8090/SpringReact/board/write', { params })
                .then(response => {
    
                    setSubject('');
                    setContent('');
                    setEmail('');
                    setAuthor('');
                    navigate('/board/list');
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    setMessage('글 작성 중 오류가 발생했습니다.');
                });
        }
    };

    return (
        <div>
            <form id="boardWriteForm" onSubmit={submit}>
                <table border="1">
                    <tbody>
                        <tr>
                            <th width="100">제목</th>
                            <td>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    size="50"
                                    placeholder="제목 입력"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                                {subjectError && <div style={{ color: 'red' }}>{subjectError}</div>}
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows="15"
                                    cols="50"
                                    placeholder="내용 입력"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                                {contentError && <div style={{ color: 'red' }}>{contentError}</div>}
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="이메일 입력"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    placeholder="작성자 입력"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                                {authorError && <div style={{ color: 'red' }}>{authorError}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <input type="submit" value="글쓰기" id="boardWriteBtn" />
                                <input type="reset" value="다시작성" onClick={() => { 
                                    setSubject('');
                                    setContent('');
                                    setEmail('');
                                    setAuthor('');
                                    setSubjectError('');
                                    setContentError('');
                                    setEmailError('');
                                    setAuthorError('');
                                    setMessage('');
                                }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
        </div>
    );
};

export default Board;
