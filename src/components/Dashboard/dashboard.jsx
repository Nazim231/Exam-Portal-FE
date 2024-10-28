
import React, { useState } from 'react'
import  Button  from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Home, 
  Users, 
  FileText, 
  BarChart2, 
  Settings, 
  Bell, 
  MessageSquare, 
  HelpCircle, 
  LogOut,
  Search,
  Moon,
  Sun,
  Menu
} from 'lucide-react'
import { useTheme } from "next-themes"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'exams', icon: FileText, label: 'Exam Management' },
    { id: 'reports', icon: BarChart2, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ]

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    activeSection === item.id ? 'bg-gray-700 text-blue-400' : ''
                  }`}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsSidebarOpen(false)
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-900">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4 lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl lg:text-3xl font-semibold">Dashboard Overview</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                className="pl-10 pr-4 py-2 rounded-full border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Search..." 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Overview Section */}
        <section id="overview" className={`mb-8 ${activeSection !== 'overview' && 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-blue-500 bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">1,200</p>
                <p className="text-sm text-green-500">+20% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-green-500 bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">15</p>
                <p className="text-sm text-green-500">+2 new this week</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-yellow-500 bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Completed Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">200</p>
                <p className="text-sm text-green-500">+15% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-red-500 bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">25</p>
                <p className="text-sm text-red-500">-5 from yesterday</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* User Management Section */}
        <section id="users" className={`mb-8 ${activeSection !== 'users' && 'hidden'}`}>
          <Card className="bg-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-4">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
                <Input className="w-full sm:w-64" placeholder="Search users..." />
                <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300">
                  Add New User
                </Button>
              </div>
              <div className="rounded-md border border-gray-700 overflow-x-auto">
                <Table className="bg-gray-900">
                  <TableHeader>
                    <TableRow className="bg-gray-800">
                      <TableHead className="font-semibold">User ID</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-gray-700 transition-colors duration-200">
                      <TableCell>User ID</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                      <TableCell>Student</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-900 transition-all duration-300">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-gray-700 transition-colors duration-200">
                      <TableCell>User ID</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-900 transition-all duration-300">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Add more sections as needed */}
      </main>
    </div>
  )
}

export default Dashboard