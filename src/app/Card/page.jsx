import styles from "./card.module.css";
import Menu from "../../components/Menu";

export default function Card() {
    return (
        <div>
            <div>
                <Menu/>
            </div>
        <main className={styles.card_container}>
           <h2 className={styles.subtitle}>Frente:</h2>
           <div className={styles.card_front}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae libero ut justo aliquet facilisis. Nullam sit amet nisl justo. Cras in metus augue. Sed at tristique libero. Quisque at dapibus lorem. Vestibulum pretium metus et nulla tristique fringilla. Proin rutrum velit ac erat dictum, sit amet sollicitudin nunc aliquet. Phasellus at sapien purus. Nam auctor velit vel scelerisque tempus. Nunc in egestas libero, non dapibus justo. Curabitur at tortor dolor. Duis ac urna magna. Praesent varius velit nec feugiat facilisis.
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae libero ut justo aliquet facilisis. Nullam sit amet nisl justo. Cras in metus augue. Sed at tristique libero. Quisque at dapibus lorem. Vestibulum pretium metus et nulla tristique fringilla. Proin rutrum velit ac erat dictum, sit amet sollicitudin nunc aliquet. Phasellus at sapien purus. Nam auctor velit vel scelerisque tempus. Nunc in egestas libero, non dapibus justo. Curabitur at tortor dolor. Duis ac urna magna. Praesent varius velit nec feugiat facilisis.
           </div>
           <h2 className={styles.subtitle}>Verso:</h2>
           <div className={styles.card_back}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae libero ut justo aliquet facilisis. Nullam sit amet nisl justo. Cras in metus augue. Sed at tristique libero. Quisque at dapibus lorem. Vestibulum pretium metus et nulla tristique fringilla. Proin rutrum velit ac erat dictum, sit amet sollicitudin nunc aliquet. Phasellus at sapien purus. Nam auctor velit vel scelerisque tempus. Nunc in egestas libero, non dapibus justo. Curabitur at tortor dolor. Duis ac urna magna. Praesent varius velit nec feugiat facilisis.
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae libero ut justo aliquet facilisis. Nullam sit amet nisl justo. Cras in metus augue. Sed at tristique libero. Quisque at dapibus lorem. Vestibulum pretium metus et nulla tristique fringilla. Proin rutrum velit ac erat dictum, sit amet sollicitudin nunc aliquet. Phasellus at sapien purus. Nam auctor velit vel scelerisque tempus. Nunc in egestas libero, non dapibus justo. Curabitur at tortor dolor. Duis ac urna magna. Praesent varius velit nec feugiat facilisis.
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae libero ut justo aliquet facilisis. Nullam sit amet nisl justo. Cras in metus augue. Sed at tristique libero. Quisque at dapibus lorem. Vestibulum pretium metus et nulla tristique fringilla. Proin rutrum velit ac erat dictum, sit amet sollicitudin nunc aliquet. Phasellus at sapien purus. Nam auctor velit vel scelerisque tempus. Nunc in egestas libero, non dapibus justo. Curabitur at tortor dolor. Duis ac urna magna. Praesent varius velit nec feugiat facilisis.
           </div>
        </main>
        </div>
    );
}