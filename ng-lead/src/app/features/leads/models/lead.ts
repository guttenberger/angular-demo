export const LeadStatus = {
  New: 'New',
  Contacted: 'Interviewed',
  Qualified: 'Qualified',
  Placed: 'Placed',
  Rejected: 'Rejected',
} as const;

export type LeadStatusType = (typeof LeadStatus)[keyof typeof LeadStatus];

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: LeadStatusType;
  notes?: string;
  phone?: string;
  currentCompany?: string;

  // Job-related information
  positionApplied?: string;
  yearsOfExperience?: number;
  skills?: string[];
  resumeUrl?: string;
}

/**
 * Type guard to check if an unknown element is a Lead
 * @param element The element to check
 * @returns {boolean} True if the element is a Lead
 */
export const isLead = (element: unknown): element is Lead => {
  // Check if the element is an object and has the required Lead properties
  return (
    typeof element === 'object' &&
    element !== null &&
    'id' in element &&
    'name' in element &&
    'email' in element &&
    'status' in element &&
    typeof (element as Lead).id === 'number' &&
    typeof (element as Lead).name === 'string' &&
    typeof (element as Lead).email === 'string' &&
    Object.values(LeadStatus).includes((element as Lead).status)
  );
};
