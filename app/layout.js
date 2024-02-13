import {Radley} from "next/font/google"
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })
const stoke = Radley({   weight:'400',subsets: ['latin'] })

export const metadata = {
  
  title: 'Minhaj AI World',
  description: 'Built By Minhaj Ahmed',
  link : 'href="https://db.onlinewebfonts.com/c/50cd2aad9c8f35800bb6beac3ad42f16?family=AzonixRegular" rel="stylesheet" '
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={stoke.className}>{children}</body>
    </html>
  )
}
