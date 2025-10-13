export type Department = {
  id: string;
  name: string;
};

export type Event = {
  id: string;
  name: string;
  date: Date;
};

export type Schedule = {
  id: string;
  department: string;
  role: string;
  date: Date;
  startTime: string;
  endTime: string;
  members: string[];
};

export type User = {
  name: string;
  email: string;
  avatar: string;
};
