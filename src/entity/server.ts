/* eslint-disable camelcase */
export interface PartialServer {
  id: string;
  name: string;
  icon: string;
  permissions: string;
}

export interface Server extends PartialServer {
  approximate_member_count: number;
  features: string[];
  owner: boolean;
}
