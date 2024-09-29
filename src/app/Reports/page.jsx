import Menu from "../../components/Menu";
import styles from "./reports.module.css";

export default function Reports() {
    return (
        <main className={styles.main}>
            <Menu/>
            <h1 className={styles.title}>Relatórios</h1>
        </main>
    );
}
