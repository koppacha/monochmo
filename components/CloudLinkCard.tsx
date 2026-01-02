import Link from "next/link"
import React from "react";

type Props = {
    title: string
    href: string
    description: string
    icon: React.ReactNode
    style?: React.CSSProperties
    shapeIndex?: number
}

export default function CloudLinkCard({ title, href, description, icon, style, shapeIndex }: Props) {
    return (
        <article className="cloudCard" data-cloud-shape={shapeIndex ?? 0} style={style}>
            <Link className="cloudLink" href={href} target="_blank" rel="noreferrer">
                <div className="cloudTop">
                    <div className="cloudIcon" aria-hidden="true">
                        {icon}
                    </div>
                    <div className="cloudHead">
                        <h2 className="cloudTitle">{title}</h2>
                        <div className="cloudUrl">{href}</div>
                    </div>
                </div>

                <p className="cloudDesc">{description}</p>

                <div className="cloudCta" aria-hidden="true">
                    open →
                </div>
            </Link>
        </article>
    )
}