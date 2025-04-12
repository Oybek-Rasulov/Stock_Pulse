import {Link} from "react-router-dom";
import Title from "../ReusableTemp/Title";
import {useRef, useEffect, useState} from "react";
import axios from 'axios';
import Alert from "../ReusableTemp/Alert";

export default function RegisterTemp() {
    const inputRef = useRef();
    const [userDetails, setUserDetails] = useState({email: "", password: ""});
    const [resMessage, setResMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    function handleSetDetails(e) {
        const {name, value} = e.target;
        setUserDetails({...userDetails, [name]: value});
    }

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    async function sendUserDetails(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3001/register", userDetails);
            setResMessage(res.data.message);
            if(res.data.message === "Muvafaqqiyatli ro'yxatdan o'tdingiz!") {
                if(isChecked === true) {
                    localStorage.setItem("user", JSON.stringify([{...userDetails, password: res.data.password}]))
                }
            }
        }catch(err) {
            setResMessage(err.response?.data.message);
        }
    }

    return <div className="register">
        { resMessage.length > 0 ? <Alert message={resMessage} color={ resMessage === "Muvafaqqiyatli ro'yxatdan o'tdingiz!"? "green" : "red"} /> : ""}
        <div className="register-content">
            <Title title="Ro'yxatdan O'tish" />
            <form onSubmit={sendUserDetails}>
                <label htmlFor="email">Email manzilingiz</label>
                <input type="tel" name="email" placeholder="namuna@gmail.com" value={userDetails.email} onChange={handleSetDetails} required ref={inputRef} />
                <label htmlFor="password">Parol qo'yish</label>
                <input className="mb1" type="password" name="password" placeholder="**********" value={userDetails.password} onChange={handleSetDetails} required/>
                <button className="register-submit mb1" type="submit">Yuborish</button>
                <div className="register-links">
                    <div className="register-links-checkbox">
                        <input type="checkbox" name="Remember" className="register-checkbox" onChange={() => setIsChecked(true)} />
                        <label htmlFor="remember">Eslab qol</label>
                    </div>
                    <div className="register-link">
                        <Link to="/login">Kirish</Link>
                        <Link to="/forgetPassword">Parolingizni unutdingizmi?</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}