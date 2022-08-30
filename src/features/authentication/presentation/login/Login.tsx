import { NextPage } from "next"
import { ChangeEvent, MouseEvent, useState } from "react";
import styles from "../../../../../styles/Login.module.css";

export const Login: NextPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [test, setTest] = useState("")

    const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        setTest(`${username} - ${password}`)
    } 

    return (
        <>
            <div id="login-page" className={styles.rootContainer}>
                <div className={styles.welcomeContainer}>
                    <div className={styles.illustrationContainer}>
                        <div className={styles.illustrationContentContainer}>
                            <img src="/rocket.svg" />
                        </div>
                    </div>    
                </div>
                <div className={styles.loginContainer}>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center mb-8">
                            <img src="/logo.svg" className="mr-4" />
                        </div>
                        <h1 className={styles.loginWelcome}>Welcome to <p className="text-primary inline">CrossCheck</p></h1>
                        <p className={styles.loginDescription}>To keep connected with us, please sign in <br />with your personal info </p>
                        <p>{test}</p>
                    </div>
                    <div className={styles.loginFormContainer}>
                        <input type="text" className={styles.usernameField} placeholder="Username" value={username} onChange={onChangeUsername}/>
                        <input type="password" className={styles.passwordField} placeholder="Password" value={password} onChange={onChangePassword} />
                        <button className={styles.submitButton} onClick={onSubmit}>Sign in</button>
                    </div>
                    <div className="flex flex-col items-center">
                        <a href="" className="text-primary text-sm font-normal mb-12">Forgot password</a>
                        <p className="text-crosscheck-dark text-xs font-normal">Don't have an account? <a href="" className="text-primary">Sign up</a></p>
                    </div>
                </div>
            </div>
            <style global jsx>{`
                html, body, body > div {
                    height: 100%
                }
            `}</style>
        </>
    )
}