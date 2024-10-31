import React, { useState } from 'react';
import styles from '../../css/LoginForm.module.css';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [idDiv, setIdDiv] = useState('');
    const [pwdDiv, setPwdDiv] = useState('');
    const [loginDiv, setLoginDiv] = useState('');

    const onLoginSubmit = (e) => {
        e.preventDefault();
        setIdDiv('');
        setPwdDiv('');
        setLoginDiv('');

        if (!id) {
            setIdDiv('아이디를 입력하세요');
        } else if (!pwd) {
            setPwdDiv('비밀번호를 입력하세요');
        } else {
            axios.get(`http://211.188.51.9:8090/SpringReact/member/login?id=${id}&pwd=${pwd}`)
                .then(res => {
                    if (res.data === "fail") {
                        setLoginDiv("아이디 또는 비밀번호가 틀렸습니다");
                    } else {
                        setLoginDiv(`안녕하세요 ${res.data}님`);
                        sessionStorage.setItem('userId', res.data);
                        setId(''); 
                        setPwd(''); 
                    }
                })
                .catch(error => {
                    console.error("Error during login:", error);
                    setLoginDiv("로그인 중 오류가 발생했습니다.");
                });
        }
    };

    return (
        <div className={styles.LoginForm}>
            <form>
                <table border='1'>
                    <tbody>
                        <tr>
                            <th><label>아이디 입력 :</label></th>
                            <td>
                                <input type='text' id="id" name='id' value={id} onChange={e => setId(e.target.value)} />
                                <div id={styles.idDiv}>{idDiv}</div>
                            </td>
                        </tr>
                        <tr>
                            <th><label>비밀번호 입력 :</label></th>
                            <td>
                                <input type='password' id="pwd" name='pwd' value={pwd} onChange={e => setPwd(e.target.value)} />
                                <div id={styles.pwdDiv}>{pwdDiv}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2' align='center'>
                                <button onClick={onLoginSubmit}>로그인</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div id={styles.loginDiv}>{loginDiv}</div>
        </div>
    );
};

export default LoginForm;
