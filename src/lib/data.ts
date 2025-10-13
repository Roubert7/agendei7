import { addDays } from "date-fns";
import type { Schedule, Department, User } from './types';

export const departments: Department[] = [
  { id: 'dept-1', name: 'Worship Team' },
  { id: 'dept-2', name: 'Media Team' },
  { id: 'dept-3', name: 'Welcome Team' },
  { id: 'dept-4', name: 'Kids Ministry' },
  { id: 'dept-5', name: 'Ushering' },
  { id: 'dept-6', name: 'Sanitation' },
];

const today = new Date();

export const schedules: Schedule[] = [
  {
    id: 'sch-1',
    department: 'Worship Team',
    role: 'Lead Vocalist',
    date: today,
    startTime: '09:00',
    endTime: '11:00',
    members: ['Alice Johnson'],
  },
  {
    id: 'sch-2',
    department: 'Media Team',
    role: 'Sound Engineer',
    date: today,
    startTime: '08:30',
    endTime: '11:30',
    members: ['Bob Williams'],
  },
  {
    id: 'sch-3',
    department: 'Welcome Team',
    role: 'Greeter',
    date: today,
    startTime: '08:45',
    endTime: '10:30',
    members: ['Charlie Brown', 'Diana Prince'],
  },
  {
    id: 'sch-4',
    department: 'Kids Ministry',
    role: 'Teacher',
    date: addDays(today, 1),
    startTime: '10:00',
    endTime: '12:00',
    members: ['Eve Adams'],
  },
  {
    id: 'sch-5',
    department: 'Worship Team',
    role: 'Guitarist',
    date: addDays(today, 7),
    startTime: '09:00',
    endTime: '11:00',
    members: ['Frank Miller'],
  },
  {
    id: 'sch-6',
    department: 'Media Team',
    role: 'Camera Operator',
    date: addDays(today, 7),
    startTime: '08:30',
    endTime: '11:30',
    members: ['Grace Lee'],
  },
  {
    id: 'sch-7',
    department: 'Ushering',
    role: 'Lead Usher',
    date: addDays(today, 7),
    startTime: '08:45',
    endTime: '11:15',
    members: ['Henry Davis'],
  },
];

export const user: User = {
    name: 'Admin User',
    email: 'user@church.com',
    avatar: 'user-avatar'
}
