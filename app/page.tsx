import CloudLinkCard from "@/components/CloudLinkCard"
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBook, faBookOpen, faSeedling} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faTwitch, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

type Service = {
  name: string
  url: string
  description: string
  icon: React.ReactNode
}

type CssVars = React.CSSProperties & {
  [key: `--${string}`]: string | number
}

function hashTo01(input: string) {
  // URL 文字列から 0..1 の値を決定的に作る（擬似ランダム）
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  // 0..1 に正規化
  return (h >>> 0) / 4294967295
}
function cloudShapeIndex(url: string) {
  const raw = hashTo01(url + "#shape")
  return Math.min(4, Math.floor(raw * 5))
}

function styleFromUrl(url: string) : CssVars {
  const t = hashTo01(url)
  const x = Math.round((t * 2 - 1) * 110)
  const r = (t * 2 - 1) * 2.2
  const y = Math.round((hashTo01(url + "#y") * 2 - 1) * 18)

  return {
    "--cloud-x": `${x}px`,
    "--cloud-y": `${y}px`,
    "--cloud-r": `${r}deg`,
  } satisfies CssVars
}

export default function Page() {
  const services: Service[] = [
    {
      name: "Chrononglyph",
      url: "https://chrononglyph.net",
      description: "2004年より連載中の本家ブログ。",
      icon: <FontAwesomeIcon icon={faBook} />
    },
    {
      name: "note",
      url: "https://note.com/koppacha",
      description: "頑張って書いた記事はこっち（まだない）。",
      icon: <FontAwesomeIcon icon={faBookOpen} />
    },
    {
      name: "ピクチャレ大会",
      url: "https://pik5.net",
      description: "ピクミンシリーズのハイスコア集積サイト。",
      icon: <FontAwesomeIcon icon={faSeedling} />
    },
    {
      name: "Twitter",
      url: "https://x.com/koppachappy",
      description: "ピクミン/RTA界隈用のSNSアカウント。",
      icon: <FontAwesomeIcon icon={faTwitter} />
    },
    {
      name: "Github",
      url: "https://github.com/koppacha",
      description: "コード置き場。",
      icon: <FontAwesomeIcon icon={faGithub} />
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@koppachappy",
      description: "主にイベント会場に使っています。",
      icon: <FontAwesomeIcon icon={faYoutube} />
    },
    {
      name: "Twitch",
      url: "https://www.twitch.tv/koppacha",
      description: "個人として配信するときはこっち。",
      icon: <FontAwesomeIcon icon={faTwitch} />
    }
  ]

  return (
      <section className="page">
        <div className="hero">
          <h1 className="heroTitle">Monochmo</h1>
          <p className="heroLead">
            こっぱちゃ（@koppacha）名義の活動に関する各種リンク集です。
          </p>
        </div>

        <div className="cloudField" aria-label="サービスリンク一覧">
          {services.map(s => (
              <CloudLinkCard
                  key={s.url}
                  title={s.name}
                  href={s.url}
                  description={s.description}
                  icon={s.icon}
                  style={styleFromUrl(s.url)}
                  shapeIndex={cloudShapeIndex(s.url)}
              />
          ))}
        </div>

        <footer className="footer">
          <span className="footerText">© {new Date().getFullYear()} koppacha</span>
        </footer>
      </section>
  )
}