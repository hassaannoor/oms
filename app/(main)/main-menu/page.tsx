import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const menuItems = [
  'EMPLOYEE', 'MANAGER', 'PROJECT', 'PROJECT_EMPLOYEE', 'DEPARTMENT',
  'DEPT_HEAD', 'BRANCH', 'BRANCH_HEAD', 'CLIENTS', 'CEO', 'HISTORY'
]

export default function MainMenu() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <Logo />
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <img src="/placeholder.svg?height=200&width=800" alt="Company Banner" className="w-full h-50 object-cover mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Link href={`/${item.toLowerCase()}`} key={item}>
                <div className="bg-primary text-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <img src="/placeholder.svg?height=100&width=100" alt={`${item} icon`} className="w-24 h-24 mx-auto mb-2" />
                  <h2 className="text-xl font-bold text-center">{item}</h2>
                  <p className="text-center mt-2">Manage {item.toLowerCase()} information</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Extra Features</h2>
        <ul className="space-y-2">
          <li><Button variant="ghost" className="w-full justify-start">Settings</Button></li>
          <li><Button variant="ghost" className="w-full justify-start">Help</Button></li>
          <li><Button variant="ghost" className="w-full justify-start">User Profile</Button></li>
        </ul>
      </aside>
    </div>
  )
}

