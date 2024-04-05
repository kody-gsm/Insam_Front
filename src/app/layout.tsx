import './globals.css'

export const metadata = {
  title: 'Insam',
  description: '전공동아리 코디의 스마트팜',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
