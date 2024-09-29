import Image from 'next/image';
import logo from '@/assets/logo.svg';
import styles from './logo.module.css';

export default function Logo() {
  return (
    <div className={styles.container_logo}>
      <Image className={styles.logo} src={logo} alt="Logo"/>
      <h1 className={styles.title}>AutoFlash</h1>
    </div>
  );
}
