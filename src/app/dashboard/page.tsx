import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { schedules, departments, user } from "@/lib/data";
import { Activity, Users, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {
  const upcomingSchedules = schedules
    .filter((s) => s.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-headline tracking-tight">
          Seja Bem Vindo, {user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Aqui está um resumo das atividades da sua igreja.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Agendas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schedules.length}</div>
            <p className="text-xs text-muted-foreground">
              gerenciadas em todos os departamentos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Departamentos Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">
              colaborando atualmente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Evento</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingSchedules.length > 0
                ? format(upcomingSchedules[0].date, "do 'de' MMMM")
                : "Nenhum evento próximo"}
            </div>
            <p className="text-xs text-muted-foreground">
              {upcomingSchedules.length > 0
                ? upcomingSchedules[0].role
                : "Planeje seu próximo evento"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Agendas</CardTitle>
          <CardDescription>
            Estas são as próximas 5 atividades agendadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departamento</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Membros</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">
                    {schedule.department}
                  </TableCell>
                  <TableCell>{schedule.role}</TableCell>
                  <TableCell>{format(schedule.date, "PPP")}</TableCell>
                  <TableCell>{schedule.members.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
