import Link from "next/link";
import { format } from "date-fns";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { schedules } from "@/lib/data";

export default function SchedulesPage() {
  const sortedSchedules = [...schedules].sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline text-3xl">Schedules</CardTitle>
                <CardDescription>
                    Manage all department schedules for your church events.
                </CardDescription>
            </div>
            <Link href="/dashboard/schedules/new">
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    New Schedule
                    </span>
                </Button>
            </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">{schedule.department}</TableCell>
                <TableCell>{schedule.role}</TableCell>
                <TableCell>{format(schedule.date, "PPP")}</TableCell>
                <TableCell>{schedule.startTime} - {schedule.endTime}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {schedule.members.map((member, index) => (
                        <Badge key={index} variant="secondary" className="font-normal">{member}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                       <Link href={`/dashboard/schedules/${schedule.id}/edit`}>
                         <DropdownMenuItem>Edit</DropdownMenuItem>
                       </Link>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{sortedSchedules.length}</strong> of <strong>{sortedSchedules.length}</strong>{" "}
          schedules
        </div>
      </CardFooter>
    </Card>
  );
}
