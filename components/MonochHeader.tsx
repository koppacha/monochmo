import Link from "next/link"

export default function MonochHeader() {
    return (
        <header className="header">
            <div className="headerInner">
                <Link className="brand" href="/">
                    monochmo
                </Link>
            </div>
        </header>
    )
}