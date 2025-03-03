'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { 
  MessageSquare, 
  Search,
  Filter,
  AlertCircle,
  History,
  CheckCircle2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface TicketHistory {
  timestamp: string
  action: string
  engineer?: string
  notes?: string
  status?: string
}

interface Ticket {
  id: string
  clientName: string
  subject: string
  description: string
  status: 'open' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  assignedEngineer?: string
  resolution?: string
  history: TicketHistory[]
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Ticket['status'] | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<Ticket['priority'] | 'all'>('all')
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [resolution, setResolution] = useState("")
  const [engineer, setEngineer] = useState("")

  useEffect(() => {
    // Load tickets from localStorage for demo
    const storedTickets = localStorage.getItem('tickets')
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets))
    } else {
      // Add demo tickets if none exist
      const demoTickets: Ticket[] = [
        {
          id: "TICK-001",
          clientName: "ABC Industries",
          subject: "pH Sensor Malfunction",
          description: "The pH sensor in Plant 2 is showing incorrect readings",
          status: "open",
          priority: "high",
          createdAt: new Date().toISOString(),
          history: [{
            timestamp: new Date().toISOString(),
            action: "Ticket Created",
          }]
        },
        {
          id: "TICK-002",
          clientName: "XYZ Manufacturing",
          subject: "Flow Meter Calibration",
          description: "Regular calibration request for flow meters",
          status: "in-progress",
          priority: "medium",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          assignedEngineer: "John Doe",
          history: [
            {
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              action: "Ticket Created"
            },
            {
              timestamp: new Date(Date.now() - 43200000).toISOString(),
              action: "Assigned to Engineer",
              engineer: "John Doe"
            }
          ]
        },
        {
          id: "TICK-003",
          clientName: "Green Solutions Ltd",
          subject: "Maintenance Schedule",
          description: "Request for quarterly maintenance schedule",
          status: "resolved",
          priority: "low",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          assignedEngineer: "Jane Smith",
          resolution: "Created and shared maintenance schedule for Q2 2024",
          history: [
            {
              timestamp: new Date(Date.now() - 172800000).toISOString(),
              action: "Ticket Created"
            },
            {
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              action: "Assigned to Engineer",
              engineer: "Jane Smith"
            },
            {
              timestamp: new Date().toISOString(),
              action: "Resolved",
              engineer: "Jane Smith",
              notes: "Created and shared maintenance schedule for Q2 2024"
            }
          ]
        }
      ]
      localStorage.setItem('tickets', JSON.stringify(demoTickets))
      setTickets(demoTickets)
    }
  }, [])

  const handleResolveTicket = (ticket: Ticket) => {
    if (!engineer || !resolution) return

    const updatedTicket = {
      ...ticket,
      status: 'resolved' as const,
      assignedEngineer: engineer,
      resolution,
      history: [
        ...(ticket.history || [{
          timestamp: ticket.createdAt,
          action: "Ticket Created"
        }]),
        {
          timestamp: new Date().toISOString(),
          action: "Resolved",
          engineer,
          notes: resolution
        }
      ]
    }

    const updatedTickets = tickets.map(t => 
      t.id === ticket.id ? updatedTicket : t
    )

    setTickets(updatedTickets)
    localStorage.setItem('tickets', JSON.stringify(updatedTickets))
    setSelectedTicket(null)
    setResolution("")
    setEngineer("")
  }

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'resolved':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    }
  }

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'high':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Support Tickets
          </h1>
          <p className="text-muted-foreground">
            View and manage client support requests
          </p>
        </div>
      </div>

      <div className="grid gap-4 mb-8">
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={(value: any) => setPriorityFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-white/50 dark:bg-slate-800/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Engineer</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No tickets found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono">{ticket.id}</TableCell>
                    <TableCell>{ticket.clientName}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.assignedEngineer || "-"}</TableCell>
                    <TableCell>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <History className="h-4 w-4 mr-2" />
                              History
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Ticket History</DialogTitle>
                              <DialogDescription>
                                History for ticket {ticket.id}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {(ticket.history || []).map((event, index) => (
                                <div key={index} className="border-l-2 border-primary pl-4 py-2">
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(event.timestamp).toLocaleString()}
                                  </p>
                                  <p className="font-medium">{event.action}</p>
                                  {event.engineer && (
                                    <p className="text-sm">Engineer: {event.engineer}</p>
                                  )}
                                  {event.notes && (
                                    <p className="text-sm mt-1">{event.notes}</p>
                                  )}
                                </div>
                              ))}
                              {(!ticket.history || ticket.history.length === 0) && (
                                <div className="text-center text-muted-foreground py-4">
                                  No history available
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        {ticket.status !== 'resolved' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedTicket(ticket)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Resolve
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Resolve Ticket</DialogTitle>
                                <DialogDescription>
                                  Provide resolution details for ticket {ticket.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Engineer Name</label>
                                  <Input
                                    placeholder="Enter your name"
                                    value={engineer}
                                    onChange={(e) => setEngineer(e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Resolution Details</label>
                                  <Textarea
                                    placeholder="Describe how the issue was resolved..."
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                  />
                                </div>
                                <Button 
                                  className="w-full"
                                  onClick={() => handleResolveTicket(ticket)}
                                  disabled={!engineer || !resolution}
                                >
                                  Mark as Resolved
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
} 