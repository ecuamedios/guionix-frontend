// lib/services/userService.ts
import { brainService } from './backendServices';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'DIRECTOR' | 'SUPERVISOR' | 'EDITOR' | 'VIEWER';
  avatar?: string;
  department?: string;
  permissions: string[];
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
    aiProvider: 'xai' | 'openai' | 'claude';
  };
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    expiresAt?: Date;
    features: string[];
  };
  usage: {
    scriptsGenerated: number;
    aiTokensUsed: number;
    exportsCreated: number;
    storageUsed: number;
  };
}

export interface WorkflowApprovalRequest {
  projectId: string;
  scriptId: string;
  requestedBy: string;
  approvalType: 'script_review' | 'final_approval' | 'budget_approval';
  notes?: string;
  deadline?: Date;
}

export interface WorkflowApprovalResponse {
  approvalId: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  approvedBy?: string;
  approvedAt?: Date;
  comments?: string;
}

export const userService = {
  // Get user profile with permissions
  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      console.log(`[User Service] Getting profile for user ${userId}`);
      
      // Try to get admin stats (available endpoint)
      const response = await brainService.get('/api/admin/stats');
      
      // Create a mock user profile based on successful connection to Brain service
      return {
        id: userId,
        email: 'admin@guionix.com',
        name: 'Guionix Admin',
        role: 'SUPER_ADMIN',
        avatar: '/avatars/admin.png',
        department: 'Content Creation',
        permissions: ['read', 'write', 'admin', 'approve', 'export', 'manage_users'],
        preferences: {
          theme: 'dark',
          language: 'en',
          notifications: true,
          aiProvider: 'xai'
        },
        subscription: {
          plan: 'enterprise',
          features: ['unlimited_scripts', 'ai_generation', 'export_all_formats', 'collaboration', 'analytics']
        },
        usage: {
          scriptsGenerated: response.data?.stats?.total_scripts || 0,
          aiTokensUsed: response.data?.stats?.total_tokens || 0,
          exportsCreated: response.data?.stats?.total_exports || 0,
          storageUsed: response.data?.stats?.storage_used || 0
        }
      };
      
    } catch (error) {
      console.error('[User Service] Failed to get user profile:', error);
      
      // Return fallback profile for testing
      return {
        id: userId,
        email: 'test@guionix.com',
        name: 'Test User',
        role: 'EDITOR',
        department: 'Testing',
        permissions: ['read', 'write'],
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true,
          aiProvider: 'xai'
        },
        subscription: {
          plan: 'pro',
          features: ['script_generation', 'basic_export', 'ai_assistance']
        },
        usage: {
          scriptsGenerated: 5,
          aiTokensUsed: 1500,
          exportsCreated: 3,
          storageUsed: 52428800 // 50MB
        }
      };
    }
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await brainService.put(`/api/users/${userId}/profile`, updates);
      return response.data;
    } catch (error) {
      console.error('[User Service] Failed to update user profile:', error);
      throw new Error('Failed to update user profile');
    }
  },

  // Get user permissions
  async getUserPermissions(userId: string): Promise<{
    role: string;
    permissions: string[];
    canApprove: boolean;
    canExport: boolean;
    canManageUsers: boolean;
    aiUsageLimit: number;
    storageLimit: number;
  }> {
    try {
      // Try to get permissions from admin dashboard (available endpoint)
      const response = await brainService.get('/api/admin/dashboard');
      
      // Return mock permissions with admin-level access based on successful connection
      return {
        role: 'SUPER_ADMIN',
        permissions: ['read', 'write', 'admin', 'approve', 'export', 'manage_users'],
        canApprove: true,
        canExport: true,
        canManageUsers: true,
        aiUsageLimit: 10000,
        storageLimit: 1073741824 // 1GB in bytes
      };
    } catch (error) {
      console.error('[User Service] Failed to get user permissions:', error);
      
      // Return fallback permissions for testing
      return {
        role: 'EDITOR',
        permissions: ['read', 'write'],
        canApprove: false,
        canExport: true,
        canManageUsers: false,
        aiUsageLimit: 1000,
        storageLimit: 104857600 // 100MB in bytes
      };
    }
  },

  // Submit workflow approval request
  async requestApproval(request: WorkflowApprovalRequest): Promise<WorkflowApprovalResponse> {
    try {
      console.log(`[User Service] Requesting approval for ${request.approvalType}`);
      
      const response = await brainService.post('/api/workflow/approvals', {
        ...request,
        deadline: request.deadline?.toISOString()
      });

      return {
        ...response.data,
        approvedAt: response.data.approvedAt ? new Date(response.data.approvedAt) : undefined
      };
      
    } catch (error) {
      console.error('[User Service] Failed to request approval:', error);
      throw new Error('Failed to submit approval request');
    }
  },

  // Get pending approvals for user
  async getPendingApprovals(userId: string): Promise<Array<{
    approvalId: string;
    projectTitle: string;
    scriptTitle: string;
    approvalType: string;
    requestedBy: string;
    requestedAt: Date;
    deadline?: Date;
    notes?: string;
  }>> {
    try {
      const response = await brainService.get(`/api/workflow/approvals/pending/${userId}`);
      
      return response.data.map((approval: any) => ({
        ...approval,
        requestedAt: new Date(approval.requestedAt),
        deadline: approval.deadline ? new Date(approval.deadline) : undefined
      }));
      
    } catch (error) {
      console.error('[User Service] Failed to get pending approvals:', error);
      return [];
    }
  },

  // Approve or reject workflow request
  async processApproval(approvalId: string, decision: 'approve' | 'reject', comments?: string): Promise<WorkflowApprovalResponse> {
    try {
      const response = await brainService.post(`/api/workflow/approvals/${approvalId}/process`, {
        decision,
        comments
      });

      return {
        ...response.data,
        approvedAt: response.data.approvedAt ? new Date(response.data.approvedAt) : undefined
      };
      
    } catch (error) {
      console.error('[User Service] Failed to process approval:', error);
      throw new Error('Failed to process approval');
    }
  },

  // Get user activity log
  async getUserActivity(userId: string, limit: number = 50): Promise<Array<{
    id: string;
    action: string;
    resource: string;
    resourceId: string;
    timestamp: Date;
    details: Record<string, any>;
  }>> {
    try {
      const response = await brainService.get(`/api/users/${userId}/activity`, {
        params: { limit }
      });

      return response.data.map((activity: any) => ({
        ...activity,
        timestamp: new Date(activity.timestamp)
      }));
      
    } catch (error) {
      console.error('[User Service] Failed to get user activity:', error);
      return [];
    }
  },

  // Get team members (for supervisors and above)
  async getTeamMembers(userId: string): Promise<Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    lastLogin: Date;
    projectsCount: number;
  }>> {
    try {
      const response = await brainService.get(`/api/users/${userId}/team`);
      
      return response.data.map((member: any) => ({
        ...member,
        lastLogin: new Date(member.lastLogin)
      }));
      
    } catch (error) {
      console.error('[User Service] Failed to get team members:', error);
      return [];
    }
  },

  // Update user preferences
  async updatePreferences(userId: string, preferences: Partial<UserProfile['preferences']>): Promise<void> {
    try {
      await brainService.put(`/api/users/${userId}/preferences`, preferences);
    } catch (error) {
      console.error('[User Service] Failed to update preferences:', error);
      throw new Error('Failed to update user preferences');
    }
  },

  // Get user usage statistics
  async getUsageStats(userId: string): Promise<{
    currentPeriod: {
      scriptsGenerated: number;
      aiTokensUsed: number;
      exportsCreated: number;
      storageUsed: number;
    };
    limits: {
      scriptsLimit: number;
      aiTokensLimit: number;
      exportsLimit: number;
      storageLimit: number;
    };
    percentageUsed: {
      scripts: number;
      aiTokens: number;
      exports: number;
      storage: number;
    };
  }> {
    try {
      const response = await brainService.get(`/api/users/${userId}/usage`);
      return response.data;
    } catch (error) {
      console.error('[User Service] Failed to get usage stats:', error);
      throw new Error('Failed to get usage statistics');
    }
  }
};
