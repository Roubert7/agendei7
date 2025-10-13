"use client";

import * as React from "react";
import { format, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { schedules } from "@/lib/data";
import { Icons } from "@/components/icons";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const eventDays = schedules.map((s) => s.date);
  const selectedDaySchedules = date
    ? schedules.filter((s) => isSameDay(s.date, date))
    : [];

  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-headline tracking-tight">
          Event Calendar
        </h1>
        <p className="text-muted-foreground">
          A visual overview of all scheduled activities.
        </p>
      </div>

      <Card className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 lg:border-r">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-4"
            modifiers={{
              events: eventDays,
            }}
            modifiersClassNames={{
              events: "bg-secondary text-secondary-foreground",
            }}
          />
        </div>
        <div className="lg:col-span-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">
                Schedules for {date ? format(date, "PPP") : "..."}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedDaySchedules.length} activit{selectedDaySchedules.length === 1 ? 'y' : 'ies'} today.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
                <Icons.google className="w-4 h-4"/> Sync
            </Button>
          </div>
          <Separator />
          <ScrollArea className="h-96">
            <div className="space-y-4 py-4">
              {selectedDaySchedules.length > 0 ? (
                selectedDaySchedules.map((schedule) => (
                  <div key={schedule.id} className="p-1">
                    <p className="font-semibold">{schedule.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {schedule.department}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {schedule.startTime} - {schedule.endTime}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {schedule.members.map((member, index) => (
                        <Badge key={index} variant="outline" className="font-normal">{member}</Badge>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-16">
                  <p>No schedules for this date.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}
