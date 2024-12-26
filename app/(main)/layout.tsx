import '../globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '../providers'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Office Management System',
  description: 'Efficient office management solution',
}

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="flex">
          <div className="w-64"></div>
          <aside className="w-64 bg-gray-800 text-white h-screen fixed">
            <div className="p-4">
              <h2 className="text-2xl font-bold"><Link href="/dashboard">Dashboard</Link></h2>
            </div>
            <nav className="mt-4">
              <ul>
                <li>
                  <Link href="/projects" className="block p-4 hover:bg-gray-700">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/members" className="block p-4 hover:bg-gray-700">
                    Members
                  </Link>
                </li>
                <li>
                  <Link href="/clients" className="block p-4 hover:bg-gray-700">
                    Clients
                  </Link>
                </li>
                <li>
                  <Link href="/departments" className="block p-4 hover:bg-gray-700">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link href="/branches" className="block p-4 hover:bg-gray-700">
                    Branches
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-6">
            <Providers>{children}</Providers>
          </main>
        </div>
  )
}

