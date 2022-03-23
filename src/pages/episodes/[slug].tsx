import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { usePlayer } from "../../contexts/playerContext";
import { db } from "../../services/firebase";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { TEpisode } from "../../utils/types";
import styles from './episode.module.scss';


export default function Episode( props : TEpisode) {
  const { play } = usePlayer();

  return (
    <div className={styles.episode}>

      <Head>
        <title>{props.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href='/'>
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={props.thumbnail}
          alt={""}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(props)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{props.title}</h1>
        <span>{props.members}</span>
        <span>{props.published_at}</span>
        <span>{props.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const slug = ctx.params.slug as string;

    const colRef = collection(db, 'episodes');
    const q = query(colRef, where("slug", "==", slug))

    const snapshot = await getDocs(q);
    const episode = snapshot.docs[0]

    return {
      props: {
        id: episode.id,
        slug: episode.data().slug,
        title: episode.data().title,
        thumbnail: episode.data().thumbnail,
        members: episode.data().members,
        published_at: format(parseISO(episode.data().published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(episode.data().file.duration),
        durationAsString: convertDurationToTimeString(Number(episode.data().file.duration)),
        description: episode.data().description,
        file: episode.data().file,
        url: episode.data().file.url,
      },
      revalidate: 60 * 60 * 24, // 24 horas
    }
  } catch (err) {
    console.log(err.message)
  }
}