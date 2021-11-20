/* eslint-disable camelcase */
export interface PartialServer {
  id: string;
  name: string;
  icon: string;
  permissions: string;
  features: string[];
  owner: boolean;
}

export interface Server extends PartialServer {
  approximate_member_count: number;
}
