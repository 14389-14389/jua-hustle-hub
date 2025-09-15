// Mock API service layer - ready for backend integration

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: string;
  location: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  clientId: string;
  clientName: string;
  postedDate: string;
  requirements?: string[];
  applicantCount: number;
  duration?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  hustlerId: string;
  hustlerName: string;
  message: string;
  proposedBudget?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  appliedDate: string;
  hustlerProfile?: {
    rating: number;
    completedJobs: number;
    skills: string[];
    bio: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'hustler';
  createdDate: string;
  isActive: boolean;
}

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'House Cleaning Service Needed',
    description: 'Looking for a reliable person to clean a 3-bedroom house. Deep cleaning required including kitchen, bathrooms, and all living areas.',
    category: 'Cleaning',
    budget: 'KSh 3,000',
    location: 'Nairobi, Westlands',
    status: 'open',
    clientId: 'client1',
    clientName: 'Sarah Kimani',
    postedDate: '2024-01-15',
    requirements: ['Experience with deep cleaning', 'Own cleaning supplies', 'Available weekends'],
    applicantCount: 5,
    duration: '4-6 hours'
  },
  {
    id: '2',
    title: 'Plumbing Repair - Kitchen Sink',
    description: 'Kitchen sink is blocked and needs professional attention. Urgent job that needs to be completed today.',
    category: 'Plumbing',
    budget: 'KSh 2,500',
    location: 'Nairobi, Kilimani',
    status: 'open',
    clientId: 'client2',
    clientName: 'John Mwangi',
    postedDate: '2024-01-16',
    requirements: ['Licensed plumber', 'Own tools', 'Available immediately'],
    applicantCount: 3,
    duration: '2-3 hours'
  },
  {
    id: '3',
    title: 'Math Tutoring for High School Student',
    description: 'Need experienced math tutor for Form 3 student. 3 sessions per week focusing on algebra and geometry.',
    category: 'Tutoring',
    budget: 'KSh 5,000/month',
    location: 'Nairobi, Karen',
    status: 'open',
    clientId: 'client3',
    clientName: 'Grace Wanjiku',
    postedDate: '2024-01-14',
    requirements: ['Teaching experience', 'Math degree preferred', 'Flexible schedule'],
    applicantCount: 8,
    duration: 'Ongoing'
  }
];

const mockApplications: JobApplication[] = [
  {
    id: 'app1',
    jobId: '1',
    hustlerId: 'hustler1',
    hustlerName: 'Alex Mwangi',
    message: 'I have 3 years of experience in house cleaning and can provide my own supplies. Available this weekend.',
    proposedBudget: 'KSh 3,000',
    status: 'pending',
    appliedDate: '2024-01-15',
    hustlerProfile: {
      rating: 4.8,
      completedJobs: 23,
      skills: ['Cleaning', 'Organization'],
      bio: 'Professional cleaner with attention to detail'
    }
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  async login(email: string, password: string) {
    await delay(1000);
    // Simulate login logic
    return {
      success: true,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name: email.includes('client') ? 'Sarah Kimani' : 'Alex Mwangi',
        email,
        role: email.includes('client') ? 'client' : 'hustler'
      }
    };
  },

  async signup(userData: any) {
    await delay(1000);
    return {
      success: true,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        ...userData
      }
    };
  },

  async logout() {
    await delay(500);
    return { success: true };
  }
};

// Jobs API
export const jobsAPI = {
  async getAllJobs(filters?: { category?: string; search?: string; location?: string }) {
    await delay(800);
    let filteredJobs = [...mockJobs];
    
    if (filters?.category && filters.category !== 'All') {
      filteredJobs = filteredJobs.filter(job => job.category === filters.category);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredJobs;
  },

  async getJobById(id: string) {
    await delay(600);
    const job = mockJobs.find(j => j.id === id);
    if (!job) throw new Error('Job not found');
    return job;
  },

  async createJob(jobData: Omit<Job, 'id' | 'postedDate' | 'applicantCount' | 'status'>) {
    await delay(1000);
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'open',
      postedDate: new Date().toISOString().split('T')[0],
      applicantCount: 0
    };
    mockJobs.unshift(newJob);
    return newJob;
  },

  async updateJob(id: string, updates: Partial<Job>) {
    await delay(800);
    const jobIndex = mockJobs.findIndex(j => j.id === id);
    if (jobIndex === -1) throw new Error('Job not found');
    
    mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...updates };
    return mockJobs[jobIndex];
  },

  async deleteJob(id: string) {
    await delay(600);
    const jobIndex = mockJobs.findIndex(j => j.id === id);
    if (jobIndex === -1) throw new Error('Job not found');
    
    mockJobs.splice(jobIndex, 1);
    return { success: true };
  }
};

// Applications API
export const applicationsAPI = {
  async getJobApplications(jobId: string) {
    await delay(600);
    return mockApplications.filter(app => app.jobId === jobId);
  },

  async getHustlerApplications(hustlerId: string) {
    await delay(600);
    return mockApplications.filter(app => app.hustlerId === hustlerId);
  },

  async createApplication(applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) {
    await delay(800);
    const newApplication: JobApplication = {
      ...applicationData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    mockApplications.push(newApplication);
    
    // Update job applicant count
    const job = mockJobs.find(j => j.id === applicationData.jobId);
    if (job) {
      job.applicantCount += 1;
    }
    
    return newApplication;
  },

  async updateApplicationStatus(applicationId: string, status: JobApplication['status']) {
    await delay(600);
    const appIndex = mockApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) throw new Error('Application not found');
    
    mockApplications[appIndex].status = status;
    return mockApplications[appIndex];
  }
};

// Users API (for admin)
export const usersAPI = {
  async getAllUsers() {
    await delay(1000);
    // Mock users data
    return [
      { id: '1', name: 'Sarah Kimani', email: 'sarah@example.com', phone: '+254712345678', role: 'client', createdDate: '2024-01-10', isActive: true },
      { id: '2', name: 'Alex Mwangi', email: 'alex@example.com', phone: '+254787654321', role: 'hustler', createdDate: '2024-01-12', isActive: true },
      { id: '3', name: 'Grace Wanjiku', email: 'grace@example.com', phone: '+254798765432', role: 'client', createdDate: '2024-01-08', isActive: true }
    ] as User[];
  },

  async updateUserStatus(userId: string, isActive: boolean) {
    await delay(500);
    return { success: true };
  }
};

// Profile API
export const profileAPI = {
  async updateProfile(userId: string, profileData: any) {
    await delay(800);
    return {
      success: true,
      profile: profileData
    };
  },

  async uploadAvatar(userId: string, file: File) {
    await delay(1500);
    // Simulate file upload
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
    return { success: true, avatarUrl };
  }
};