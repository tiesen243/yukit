import { Inter, Fira_Code } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-sans' })
const firaCode = Fira_Code({ subsets: ['latin'], display: 'swap', variable: '--font-mono' })

export const fonts = `${inter.variable} ${firaCode.variable}`
