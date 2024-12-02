import React from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/component/Header";

import logo from "../image/logo.svg";

import styles from "../app/page.module.css";
import Carousel from "@/component/Carousel";

export default function Home({ siteTitle = "AutoFlash", links = [] }) {
  return (
    <div className={styles.body}>
      <Header
        siteTitle="AutoFlash"
        links={[
          {
            path: "/register/",
            label: "Cadastre-se",
            className: "HeaderLinksingup",
          },
          {
            path: "/login/",
            label: "Entrar",
            className: "HeaderLinklogin",
          },
        ]}
      />

      <div className={styles.background}> 
        <div className={styles.MainGroup}>
          <h1>Otimize sua memorização</h1>
          <p>Qualquer assunto, em qualquer hora, para todas as idades!</p>
          <a href="/register/">
            <button>Cadastre-se gratuitamente</button>
          </a>
        </div>
      </div>

      <div className={styles.backgroundSecao2}>
        <div>
          <div>
            <h2 className={styles.Secao2Title}>Para quem é o AutoFlash?</h2>
          </div>
          <div className={styles.BlankSpace1}></div>
          <div className={styles.Secao2CardsGroup}>
            <div className={styles.Secao2Card}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="50"
                viewBox="0 0 51 50"
                fill="none"
                className={styles.Secao2CardSvg}
              >
                <rect width="50" height="50" rx="19" fill="#BB6BD9" />
                <path
                  d="M26.1 14.9358L25.5 15.1615L24.9 14.9358C23.0984 14.2504 21.1645 13.9353 19.2255 14.011C17.2865 14.0868 15.3864 14.5517 13.65 15.3753L13 15.7079V35L14.8125 34.1447C16.2278 33.4772 17.7751 33.1004 19.3538 33.039C20.9325 32.9776 22.5071 33.2329 23.975 33.7883L25.5 34.3704L27.025 33.7883C28.4929 33.2329 30.0675 32.9776 31.6462 33.039C33.2249 33.1004 34.7722 33.4772 36.1875 34.1447L38 35V15.7079L37.3125 15.3753C35.5812 14.5569 33.6876 14.0947 31.7556 14.019C29.8235 13.9433 27.8964 14.2557 26.1 14.9358ZM19.85 30.6403C18.3718 30.6384 16.9029 30.863 15.5 31.3055V17.2047C18.2088 16.1358 21.2499 16.1144 23.975 17.1453L24.25 17.2523V31.353C22.8221 30.8855 21.3228 30.6446 19.8125 30.6403H19.85ZM35.5 31.3055C32.6611 30.4 29.5889 30.4 26.75 31.3055V17.2523L27.025 17.1453C29.7501 16.1144 32.7912 16.1358 35.5 17.2047V31.3055Z"
                  fill="white"
                />
              </svg>
              <h3>Na escola</h3>
              <div className={styles.text}>
                Auxílio na memorização para exames, provas e reforço escolar.
              </div>
              <a href="/register/">Saiba mais</a>
            </div>
            <div className={styles.Secao2Card}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                className={styles.Secao2CardSvg}
              >
                <g clipPath="url(#clip0_109_940)">
                  <rect width="50" height="50" rx="19" fill="#FFC43B" />
                  <path
                    d="M22.2625 27.75H25.2875C25.452 27.751 25.6151 27.7194 25.7674 27.6572C25.9197 27.595 26.0582 27.5034 26.175 27.3875L30.65 22.9125C30.8828 22.6783 31.0135 22.3615 31.0135 22.0312C31.0135 21.701 30.8828 21.3842 30.65 21.15L27.625 18.15C27.3908 17.9172 27.074 17.7865 26.7437 17.7865C26.4135 17.7865 26.0967 17.9172 25.8625 18.15L21.3875 22.625C21.152 22.8558 21.0172 23.1703 21.0125 23.5V26.5C21.0125 26.8315 21.1442 27.1495 21.3786 27.3839C21.613 27.6183 21.931 27.75 22.2625 27.75ZM23.5125 24L26.75 20.8L28 22.05L24.775 25.25H23.525L23.5125 24ZM36.75 29H35.5V16.5H36.75C37.0815 16.5 37.3995 16.3683 37.6339 16.1339C37.8683 15.8995 38 15.5815 38 15.25C38 14.9185 37.8683 14.6005 37.6339 14.3661C37.3995 14.1317 37.0815 14 36.75 14H14.25C13.9185 14 13.6005 14.1317 13.3661 14.3661C13.1317 14.6005 13 14.9185 13 15.25C13 15.5815 13.1317 15.8995 13.3661 16.1339C13.6005 16.3683 13.9185 16.5 14.25 16.5H15.5V29H14.25C13.9185 29 13.6005 29.1317 13.3661 29.3661C13.1317 29.6005 13 29.9185 13 30.25C13 30.5815 13.1317 30.8995 13.3661 31.1339C13.6005 31.3683 13.9185 31.5 14.25 31.5H24.25V32.9375L18.5625 36.6875C18.3292 36.8319 18.1498 37.0491 18.0522 37.3056C17.9546 37.5621 17.944 37.8435 18.0222 38.1066C18.1004 38.3696 18.263 38.5996 18.4849 38.7611C18.7068 38.9225 18.9757 39.0065 19.25 39C19.4958 39.0028 19.7362 38.9285 19.9375 38.7875L24.25 35.9375V37.75C24.25 38.0815 24.3817 38.3995 24.6161 38.6339C24.8505 38.8683 25.1685 39 25.5 39C25.8315 39 26.1495 38.8683 26.3839 38.6339C26.6183 38.3995 26.75 38.0815 26.75 37.75V35.9375L31.0625 38.7875C31.2638 38.9285 31.5042 39.0028 31.75 39C32.0171 38.9979 32.2764 38.9104 32.4901 38.7502C32.7038 38.59 32.8606 38.3656 32.9375 38.1098C33.0143 37.8541 33.0073 37.5804 32.9173 37.3289C32.8273 37.0775 32.6592 36.8614 32.4375 36.7125L26.75 32.9625V31.5H36.75C37.0815 31.5 37.3995 31.3683 37.6339 31.1339C37.8683 30.8995 38 30.5815 38 30.25C38 29.9185 37.8683 29.6005 37.6339 29.3661C37.3995 29.1317 37.0815 29 36.75 29ZM33 29H18V16.5H33V29Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_109_940">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h3>No trabalho</h3>
              <div className={styles.text}>
                Memorize novos conceitos e aprimore suas habilidades
                profissionais de maneira eficaz.
              </div>
              <a href="/register/">Saiba mais</a>
            </div>
            <div className={styles.Secao2Card}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.Secao2CardSvg}
              >
                <g clipPath="url(#clip0_109_945)">
                  <rect width="50" height="50" rx="19" fill="#3CC5FF" />
                  <path
                    d="M33.875 23.1563H33.0938V16.125C33.0938 15.9178 33.0114 15.7191 32.8649 15.5726C32.7184 15.4261 32.5197 15.3438 32.3125 15.3438H16.6875C16.4803 15.3438 16.2816 15.4261 16.1351 15.5726C15.9886 15.7191 15.9063 15.9178 15.9063 16.125V23.1563H15.125C14.9178 23.1563 14.7191 23.2386 14.5726 23.3851C14.4261 23.5316 14.3438 23.7303 14.3438 23.9375V33.3125C14.3438 33.5197 14.4261 33.7184 14.5726 33.8649C14.7191 34.0114 14.9178 34.0938 15.125 34.0938H16.6875V34.875C16.6875 35.0822 16.7698 35.2809 16.9163 35.4274C17.0628 35.5739 17.2615 35.6563 17.4688 35.6563C17.676 35.6563 17.8747 35.5739 18.0212 35.4274C18.1677 35.2809 18.25 35.0822 18.25 34.875V34.0938H30.75V34.875C30.75 35.0822 30.8323 35.2809 30.9788 35.4274C31.1253 35.5739 31.3241 35.6563 31.5313 35.6563C31.7385 35.6563 31.9372 35.5739 32.0837 35.4274C32.2302 35.2809 32.3125 35.0822 32.3125 34.875V34.0938H33.875C34.0822 34.0938 34.2809 34.0114 34.4274 33.8649C34.5739 33.7184 34.6563 33.5197 34.6563 33.3125V23.9375C34.6563 23.7303 34.5739 23.5316 34.4274 23.3851C34.2809 23.2386 34.0822 23.1563 33.875 23.1563ZM17.4688 16.9063H31.5313V23.1563H29.9688C29.7616 23.1563 29.5628 23.2386 29.4163 23.3851C29.2698 23.5316 29.1875 23.7303 29.1875 23.9375V26.2813H19.8125V23.9375C19.8125 23.7303 19.7302 23.5316 19.5837 23.3851C19.4372 23.2386 19.2385 23.1563 19.0313 23.1563H17.4688V16.9063ZM19.8125 27.8438H29.1875V29.4063H19.8125V27.8438ZM33.0938 32.5313H15.9063V24.7188H18.25V30.1875C18.25 30.3947 18.3323 30.5934 18.4788 30.7399C18.6253 30.8864 18.8241 30.9688 19.0313 30.9688H29.9688C30.176 30.9688 30.3747 30.8864 30.5212 30.7399C30.6677 30.5934 30.75 30.3947 30.75 30.1875V24.7188H33.0938V32.5313Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_109_945">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h3>Em casa</h3>
              <div className={styles.text}>
                Estudos de idiomas e aprimoramento pessoal.
              </div>
              <a href="/register/">Saiba mais</a>
            </div>
            <div className={styles.Secao2Card}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.Secao2CardSvg}
              >
                <g clipPath="url(#clip0_109_951)">
                  <rect width="50" height="50" rx="19" fill="#FF3B53" />
                  <g clipPath="url(#clip1_109_951)">
                    <path
                      d="M25.5 14.5625C25.397 14.5625 25.2963 14.593 25.2106 14.6503C25.125 14.7075 25.0582 14.7888 25.0188 14.884C24.9794 14.9792 24.9691 15.0839 24.9892 15.1849C25.0093 15.286 25.0589 15.3788 25.1317 15.4516C25.2046 15.5245 25.2974 15.5741 25.3984 15.5942C25.4994 15.6143 25.6041 15.6039 25.6993 15.5645C25.7945 15.5251 25.8758 15.4583 25.9331 15.3727C25.9903 15.287 26.0208 15.1863 26.0208 15.0833C26.0208 14.9452 25.966 14.8127 25.8683 14.715C25.7706 14.6174 25.6381 14.5625 25.5 14.5625ZM30.7083 13H20.2917C19.601 13 18.9386 13.2744 18.4502 13.7627C17.9619 14.2511 17.6875 14.9135 17.6875 15.6042V35.3958C17.6875 35.7378 17.7549 36.0765 17.8857 36.3924C18.0166 36.7084 18.2084 36.9954 18.4502 37.2373C18.6921 37.4791 18.9791 37.6709 19.2951 37.8018C19.611 37.9326 19.9497 38 20.2917 38H30.7083C31.0503 38 31.389 37.9326 31.7049 37.8018C32.0209 37.6709 32.3079 37.4791 32.5498 37.2373C32.7916 36.9954 32.9834 36.7084 33.1143 36.3924C33.2451 36.0765 33.3125 35.7378 33.3125 35.3958V15.6042C33.3125 14.9135 33.0381 14.2511 32.5498 13.7627C32.0614 13.2744 31.399 13 30.7083 13V13ZM32.2708 35.3958C32.2708 35.8102 32.1062 36.2077 31.8132 36.5007C31.5202 36.7937 31.1227 36.9583 30.7083 36.9583H20.2917C19.8773 36.9583 19.4798 36.7937 19.1868 36.5007C18.8938 36.2077 18.7292 35.8102 18.7292 35.3958V31.75H32.2708V35.3958ZM32.2708 30.7083H18.7292V17.1667H32.2708V30.7083ZM32.2708 16.125H18.7292V15.6042C18.7292 15.1898 18.8938 14.7923 19.1868 14.4993C19.4798 14.2063 19.8773 14.0417 20.2917 14.0417H30.7083C31.1227 14.0417 31.5202 14.2063 31.8132 14.4993C32.1062 14.7923 32.2708 15.1898 32.2708 15.6042V16.125ZM25.5 35.9167C25.809 35.9167 26.1111 35.825 26.3681 35.6533C26.625 35.4816 26.8253 35.2376 26.9436 34.9521C27.0618 34.6666 27.0928 34.3524 27.0325 34.0493C26.9722 33.7462 26.8234 33.4678 26.6049 33.2493C26.3863 33.0308 26.1079 32.882 25.8048 32.8217C25.5017 32.7614 25.1876 32.7923 24.9021 32.9106C24.6165 33.0289 24.3725 33.2291 24.2008 33.4861C24.0291 33.743 23.9375 34.0451 23.9375 34.3542C23.9375 34.7686 24.1021 35.166 24.3951 35.459C24.6882 35.752 25.0856 35.9167 25.5 35.9167ZM25.5 33.8333C25.603 33.8333 25.7037 33.8639 25.7894 33.9211C25.875 33.9783 25.9418 34.0597 25.9812 34.1549C26.0206 34.25 26.0309 34.3547 26.0108 34.4558C25.9907 34.5568 25.9411 34.6496 25.8683 34.7225C25.7954 34.7953 25.7026 34.8449 25.6016 34.865C25.5006 34.8851 25.3959 34.8748 25.3007 34.8354C25.2055 34.7959 25.1242 34.7292 25.0669 34.6435C25.0097 34.5579 24.9792 34.4572 24.9792 34.3542C24.9792 34.216 25.034 34.0836 25.1317 33.9859C25.2294 33.8882 25.3619 33.8333 25.5 33.8333Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_109_951">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                  <clipPath id="clip1_109_951">
                    <rect
                      width="25"
                      height="25"
                      fill="white"
                      transform="translate(13 13)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <h3>Em qualquer lugar</h3>
              <div className={styles.text}>
                Estude em qualquer lugar e a qualquer hora.
              </div>

              <a href="/register/">Saiba mais</a>
            </div>
          </div>
        </div>
        <a href="/register/">
          <button className={styles.singupButton2}>CADASTRE-SE AGORA</button>
        </a>
      </div>

      <div className={styles.backgroundSecao3}>
        <h2 className={styles.Secao3Title}>Benefícios da repetição espaçada</h2>
        <div className={styles.BlankSpace2}></div>
        <Carousel />
        <h3 className={styles.Secao3Subtitle}>Pronto para começar?</h3>
        <p>Vamos nessa!</p>
      </div>

      <div className={styles.backgroundSecao4}>
        <div className={styles.header4}>
          <div className={styles.HeaderLink}>
            <Link href="/">
              <Image
                src={logo}
                width={60}
                height={60}
                alt={`Logo do site ${siteTitle}`}
              />
            </Link>
            <h1>{siteTitle}</h1>
          </div>
        </div>
      </div>

      <div className={styles.backgroundSecao5}>Seção 5</div>

      <div className={styles.backgroundSecao6}>Seção 6</div>

      <div className={styles.backgroundSecao7}>Seção 7</div>

      <div className={styles.backgroundFooter}>
        <div>
          <p>Nos siga nas redes sociais:</p>
        </div>
        <div>
          <h3>Sobre</h3> <li>Soluções</li>
        </div>
        <div>
          <h3>Termos e condições</h3>
          <li>Termos e Condições</li>
          <li>Política de Privacidade</li>
          <li>LGPD</li>
          <li>Política de Inclusão e Acessibilidade</li>
        </div>
        <div className={styles.copyFooter}>
          Copyright @ 2024, AutoFlash Todos os direitos preservados.
        </div>
      </div>
    </div>
  );
}
