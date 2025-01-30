export interface GitHistProject {
    subject: string,
    branch: string,
    tag?: string | undefined,
    techStack?: string[],
    description: string,
    images?: string[],
    link?: string[],
    merge?: string
}

export interface TechWeight {
    name: string;
    weight: number;
  };