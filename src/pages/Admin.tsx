import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, DollarSign, TrendingUp, Search, Eye, Ban } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Alex Mwangi",
    email: "alex@email.com",
    role: "Hustler",
    status: "Active",
    joinDate: "2024-01-15",
    completedJobs: 23,
    rating: 4.8
  },
  {
    id: 2,
    name: "Sarah Kimani",
    email: "sarah@email.com",
    role: "Client",
    status: "Active", 
    joinDate: "2024-01-10",
    postedJobs: 5,
    rating: 4.9
  },
  {
    id: 3,
    name: "John Mutiso",
    email: "john@email.com",
    role: "Hustler",
    status: "Suspended",
    joinDate: "2024-01-05",
    completedJobs: 8,
    rating: 3.2
  }
];

const mockJobs = [
  {
    id: 1,
    title: "House Cleaning Service",
    client: "Sarah Kimani",
    category: "Cleaning",
    budget: "KSh 3,000",
    status: "Completed",
    applicants: 5,
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Logo Design Project",
    client: "Mary Wanjiku",
    category: "Design",
    budget: "KSh 8,000",
    status: "In Progress",
    applicants: 15,
    postedDate: "2024-01-12"
  },
  {
    id: 3,
    title: "Math Tutoring Session",
    client: "Peter Otieno",
    category: "Tutoring", 
    budget: "KSh 5,000",
    status: "Open",
    applicants: 8,
    postedDate: "2024-01-10"
  }
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(mockUsers);
  const [jobs] = useState(mockJobs);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === "Active").length,
    totalJobs: jobs.length,
    completedJobs: jobs.filter(j => j.status === "Completed").length,
    totalRevenue: "KSh 145,000",
    monthlyGrowth: "+12%"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-50 text-green-700 border-green-200";
      case "Suspended": return "bg-red-50 text-red-700 border-red-200";
      case "Open": return "bg-blue-50 text-blue-700 border-blue-200";
      case "In Progress": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Completed": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, jobs, and platform analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Briefcase className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{stats.totalJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">{stats.totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users Management</TabsTrigger>
          <TabsTrigger value="jobs">Jobs Management</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Users Management</CardTitle>
                  <CardDescription>Manage all registered users on the platform</CardDescription>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant="secondary">{user.role}</Badge>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Joined: {user.joinDate}</span>
                        <span>Rating: {user.rating}/5</span>
                        {user.role === "Hustler" && <span>Jobs: {user.completedJobs}</span>}
                        {user.role === "Client" && <span>Posted: {user.postedJobs}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Ban className="h-4 w-4 mr-2" />
                        {user.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Jobs Management</CardTitle>
                  <CardDescription>Monitor and manage all jobs on the platform</CardDescription>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{job.title}</h3>
                        <Badge variant="secondary">{job.category}</Badge>
                        <Badge variant="outline" className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Client: {job.client}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Budget: {job.budget}</span>
                        <span>Applicants: {job.applicants}</span>
                        <span>Posted: {job.postedDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;