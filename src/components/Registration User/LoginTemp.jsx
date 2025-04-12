import {Link} from "react-router-dom";
import Title from "../ReusableTemp/Title";
import axios from 'axios';
import {useRef, useEffect} from "react";

export default function LoginTemp() {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();

        // async function sendCredentials() {  

        // }

        // sendCredentials()
    }, [])

    async function handleCredentials() {
        // try {
            const storedCredentials = JSON.parse(localStorage.getItem("user"))
            console.log(storedCredentials);
            await axios.post("http://localhost:3001/login", ...storedCredentials)
                .then(res => console.log(res))
            
            // console.log(res.data)
        // }catch(err) {
        //     throw new Error(err)
        // }
    }


    return <div className="register">
        <div className="register-content">
            <Title title="Kirish" />
            <form>
                <label htmlFor="phone">Email manzilingiz</label>
                <input type="tel" name="phone" placeholder="namuna@gmail.com" required ref={inputRef} />
                <label htmlFor="password">Parolingiz</label>
                <input className="mb1" type="password" name="password" placeholder="**********" required/>
                <button className="register-submit mb1" type="submit" onClick={handleCredentials}>Yuborish</button>
                <div className="register-links">
                    <div className="register-links-checkbox">
                        <input type="checkbox" name="Remember" className="register-checkbox" />
                        <label htmlFor="remember">Eslab qol</label>
                    </div>
                    <div className="register-link">
                        <Link to="/register">Registratsiya qilish</Link>
                        <Link to="/forgetPassword">Parolingizni unutdingizmi?</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
}