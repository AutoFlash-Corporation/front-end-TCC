import styles from "./initial.module.css";
import Menu from "../../components/Menu";

export default function Initial() {
    return (
        <main className={styles.main}>
            <Menu/>
            <h1 className={styles.title}>Home</h1>
        </main>
    );
}