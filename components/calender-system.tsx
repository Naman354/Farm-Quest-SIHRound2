"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Calendar,
  Clock,
  Plus,
  Bell,
  Trash2,
  MapPin,
  Users,
  Sprout,
  Droplets,
  Sun,
  Shield,
  Tractor,
  Wheat,
  Info,
} from "lucide-react"

interface CalendarEvent {
  id: number
  title: string
  description: string
  date: string
  time: string
  type: "task" | "event"
  category: string
  icon: any
  benefits?: string[]
  link?: string
  reminder?: {
    enabled: boolean
    timing: "same-day" | "day-before"
    time: string
  }
  location?: string
  attendees?: string[]
}

export function CalendarSystem() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [viewDate, setViewDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "HortiConnect India 2025",
      description: "Global horticulture summit focusing on protected cultivation, precision farming, and post-harvest solutions.",
      date: "2025-09-25",
      time: "10:00",
      type: "event",
      category: "Horticulture",
      icon: Sprout,
      benefits: ["Precision Farming", "Market Linkage", "Innovation"],
      link: "https://horticonnectindia.com/",
    },
    {
      id: 2,
      title: "Agri Asia 2025",
      description: "International exhibition on new agriculture technologies and sustainable practices.",
      date: "2025-09-18",
      time: "09:30",
      type: "event",
      category: "Agri-Tech",
      icon: Tractor,
      benefits: ["Technology", "Networking", "Sustainable Solutions"],
      link: "https://agriasia.in/",
    },
    {
      id: 3,
      title: "Organic Farming Seminar",
      description: "A local seminar on the benefits and techniques of organic farming for small landholders.",
      date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0], // 10 days from now
      time: "11:00",
      type: "task",
      category: "Organic Farming",
      icon: Wheat,
      benefits: ["Soil Health", "Certification", "Higher Premiums"],
    },
    {
      id: 4,
      title: "Workshop on Drip Irrigation",
      description: "Hands-on workshop covering installation and maintenance of drip irrigation systems.",
      date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0], // 20 days from now
      time: "14:00",
      type: "task",
      category: "Water Management",
      icon: Droplets,
      benefits: ["Water Saving", "Increased Yield", "Cost Effective"],
    },
     {
      id: 5,
      title: "Biofach India 2025",
      description: "International trade fair for the organic, natural, and millet industry.",
      date: "2025-08-30",
      time: "10:00",
      type: "event",
      category: "Organic Farming",
      icon: Users,
      benefits: ["Market Linkage", "Networking", "Latest Trends"],
    },
  ])

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    date: selectedDate,
    time: "09:00",
    type: "task",
    category: "General",
    icon: Calendar,
    reminder: { enabled: false, timing: "same-day", time: "09:00" },
  })

  const categoryIcons = {
    "Soil Care": Sprout,
    "Water Management": Droplets,
    "Crop Management": Sun,
    "Plant Protection": Shield,
    Equipment: Tractor,
    Harvest: Wheat,
    Marketing: Users,
    General: Calendar,
    Government: Users,
    Conference: Users,
  }

  const getTimeRemaining = (date: string, time: string) => {
    const eventDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const diff = eventDateTime.getTime() - now.getTime()

    if (diff < 0) return "Past due"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return

    const event: CalendarEvent = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      title: newEvent.title!,
      description: newEvent.description || "",
      date: newEvent.date!,
      time: newEvent.time!,
      type: newEvent.type as "task" | "event",
      category: newEvent.category!,
      icon: categoryIcons[newEvent.category as keyof typeof categoryIcons] || Calendar,
      reminder: newEvent.reminder,
      location: newEvent.location,
      attendees: newEvent.attendees,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      description: "",
      date: selectedDate,
      time: "09:00",
      type: "task",
      category: "General",
      icon: Calendar,
      reminder: { enabled: false, timing: "same-day", time: "09:00" },
    })
    setShowAddEvent(false)
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const upcomingEvents = events
    .filter((event) => new Date(`${event.date}T${event.time}`) >= new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
    .slice(0, 5)

  const todayEvents = events.filter((event) => event.date === new Date().toISOString().split("T")[0])

  const renderCalendarGrid = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const dayEvents = events.filter((event) => event.date === dateString);
      const isToday = dateString === new Date().toISOString().split("T")[0];
      const isSelected = dateString === selectedDate;

      const dayButton = (
        <button
          key={day}
          onClick={() => setSelectedDate(dateString)}
          className={`p-2 text-sm rounded-lg border transition-colors w-full h-16 flex flex-col justify-center items-center relative ${
            isToday
              ? "bg-primary text-primary-foreground border-primary"
              : isSelected
              ? "bg-secondary text-secondary-foreground border-secondary"
              : dayEvents.length > 0 
                ? "bg-green-100 dark:bg-green-900/30"
                : "hover:bg-muted border-transparent"
          }`}
        >
          <div className="font-medium">{day}</div>
        </button>
      );

      if (dayEvents.length > 0) {
        calendarDays.push(
          <Popover key={`popover-${day}`}>
            <PopoverTrigger asChild>{dayButton}</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-semibold">Events on {date.toLocaleDateString()}</h4>
                {dayEvents.map((event) => (
                  <div key={event.id} className="text-sm border-b pb-2 last:border-b-0">
                    <p className="font-bold">{event.title}</p>
                    <p className="text-muted-foreground">{event.description}</p>
                    {event.benefits && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {event.benefits.map((benefit) => (
                          <Badge key={benefit} variant="secondary">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    )}
                     {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary text-xs mt-1"
                    >
                      <Info className="w-3 h-3" />
                      More Info
                    </a>
                  )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        );
      } else {
        calendarDays.push(dayButton);
      }
    }

    return calendarDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Farm Calendar 📅</h1>
          <p className="text-muted-foreground">Manage your farming tasks and events</p>
        </div>
        <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Event title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent({ ...newEvent, type: value as "task" | "event" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categoryIcons).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  value={newEvent.location || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={newEvent.reminder?.enabled}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        reminder: { ...newEvent.reminder!, enabled: e.target.checked },
                      })
                    }
                  />
                  <Label htmlFor="reminder">Set Reminder</Label>
                </div>
                {newEvent.reminder?.enabled && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <Label>When</Label>
                      <Select
                        value={newEvent.reminder.timing}
                        onValueChange={(value) =>
                          setNewEvent({
                            ...newEvent,
                            reminder: { ...newEvent.reminder!, timing: value as "same-day" | "day-before" },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="same-day">Same Day</SelectItem>
                          <SelectItem value="day-before">Day Before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={newEvent.reminder.time}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            reminder: { ...newEvent.reminder!, time: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <Button onClick={handleAddEvent} className="w-full">
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No events scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => {
                  const Icon = event.icon
                  return (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge variant={event.type === "task" ? "default" : "secondary"} className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const Icon = event.icon
                const timeRemaining = getTimeRemaining(event.date, event.time)
                return (
                  <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant={event.type === "task" ? "default" : "secondary"} className="text-xs">
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>🕐 {event.time}</span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                        )}
                        {event.reminder?.enabled && (
                          <span className="flex items-center gap-1">
                            <Bell className="w-3 h-3" />
                            Reminder set
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary mb-2">{timeRemaining}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Calendar View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}>
              Previous
            </Button>
            <h3 className="text-lg font-semibold">
              {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <Button variant="outline" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}>
              Next
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarGrid()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}