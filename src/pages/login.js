import React from "react";
import LoginForm from "@/component/LoginForm";
import styles from '../styles/login.module.css';

const LoginPage = () => {
    return (
        <div className={styles.Background}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;