/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, Bell, Settings, ChevronLeft, ChevronRight, Edit2, Trash2, Clock, FlaskConical, CalendarDays, Package, Users, AtSign, Lock, Eye, ArrowRight, ClipboardList, LogOut, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const user = await res.json();
        onLogin(user);
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-12 bg-background font-body text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Decorative Organic Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-secondary-fixed/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-primary-fixed/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-lg z-10">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-surface-container rounded-xl">
            <ClipboardList className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-[2.5rem] leading-tight font-extrabold text-primary tracking-tight mb-3">
            Welcome back to <span className="text-secondary italic">Manilab Equip Booking</span>
          </h1>
          <p className="text-on-surface-variant max-w-sm mx-auto font-body text-sm leading-relaxed">
            Login please
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-[0px_20px_40px_rgba(0,38,31,0.04)] p-10 md:p-12 border border-outline-variant/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="font-label text-xs tracking-widest text-on-surface-variant block ml-1 uppercase" htmlFor="email">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <AtSign className="w-5 h-5 text-outline-variant group-focus-within:text-secondary transition-colors" />
                </div>
                <input 
                  className="w-full bg-surface-container border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all duration-300 outline-none" 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="loginlease@...." 
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label text-xs tracking-widest text-on-surface-variant block ml-1 uppercase" htmlFor="password">Password</label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-secondary font-medium hover:underline transition-all">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-outline-variant group-focus-within:text-secondary transition-colors" />
                </div>
                <input 
                  className="w-full bg-surface-container border-none rounded-2xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all duration-300 outline-none" 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  <Eye className="w-5 h-5 text-outline-variant hover:text-on-surface-variant transition-colors" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-6">
              <button 
                type="submit" 
                className="w-full bg-primary text-white font-headline font-semibold py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/10"
              >
                Sign In to Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-2 text-sm text-on-surface-variant">
                <span>New to the lab team?</span>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-primary font-semibold hover:text-secondary transition-colors underline decoration-secondary-fixed/50 underline-offset-4">Request Access</a>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKzm8hBoDYqMqgjrj29yZ4oRQj-Gh5WKLR7ObZb9-aurrZwfAtRfr2PR7Y808IJ-G2yi2UR6tBgbpRkEtJYbarRS-7jjRGZCK-D5Ki8Q4fb5P43449OM4I-5yhAXO4TllLKVhLqHdnE7Dv_li-S8kaXGGfKXmKYnzcyyvvKq8M-9STEhtLkpR-1ILwSVyFmlqlCcopHP4GcFvfhQh-7LTxaEWwP5qIobL8e93auNz7y1VbWIZlV4JoHCkNZiwud9vmQBwTrSHr1Iup" alt="Lab icon 1" className="w-12 h-12 rounded-full object-cover grayscale opacity-40 mix-blend-multiply" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzbNKZot8LkdYcbfvdQNBEPvVxo4muuOZLA7hF_TBXCwdFXCVM_6To2w_hVUTZ9SpueBuaSBldeecHCOiWuCp6kbOG63sJC1IQjUTWTCf-5cjRYm8C9SelIBlL_al4HZB6KXYCQdOzZnC6PyN_7hYcd5ST3tf1XCWeUsPxfwoEum3RaVc3koDVDNaxv7JDGPMBhNO1NTJveWZ2UJ0H2sqZeDw00LZuVJXvKFtgPjQo2SCN9NGagWNVQ8SDIcC_bDRwJ_P38-CaLpAj" alt="Lab icon 2" className="w-12 h-12 rounded-full object-cover grayscale opacity-40 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </div>
  );
}

function timeAgo(dateInput: string) {
  if (!dateInput) return 'Just now';
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}

function Dashboard({ user, onLogout }: { user: any, onLogout: () => void }) {
// 1. Data Persistence (localStorage)
  const [currentDate, setCurrentDate] = useState(() => {
    try {
      const saved = localStorage.getItem('app_currentDate');
      if (saved) {
        const d = new Date(saved);
        if (!isNaN(d.getTime())) return d;
      }
    } catch (e) {}
    return new Date();
  });
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(() => {
    try {
      return localStorage.getItem('app_selectedDateStr') || new Date().toISOString().split('T')[0];
    } catch (e) {
      return new Date().toISOString().split('T')[0];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(''); // 4. Debounce Search
  
  type AppEvent = { id?: number, title: string, type: string, time?: string, description?: string, equipment?: string };
  const [events, setEvents] = useState<Record<string, AppEvent[]>>({});
  const [teamUsers, setTeamUsers] = useState<{id: number, name: string, avatar: string}[]>([]);
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/notifications?userId=${user.id}`)
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(err => console.error('Failed to fetch notifications:', err));
    }
  }, [user?.id]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setTeamUsers(data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    const eventSource = new EventSource('/api/notifications/stream');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.user_id === user?.id) {
        setNotifications(prev => [data, ...prev]);
        if (Notification.permission === 'granted') {
          const plainText = data.message.replace(/<[^>]+>/g, '');
          new Notification(data.title, { body: plainText });
        }
      }
    };
    return () => eventSource.close();
  }, [user?.id]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events:', err));
  }, []);

  const [lastDeleted, setLastDeleted] = useState<{dateStr: string, event: AppEvent, index: number} | null>(null);
  
  // New Event Modal State
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventData, setNewEventData] = useState<Partial<AppEvent>>({ type: 'general' });

  useEffect(() => {
    if (isNewEventModalOpen) {
      setNewEventDate(selectedDateStr || new Date().toISOString().split('T')[0]);
    }
  }, [isNewEventModalOpen, selectedDateStr]);

  const handleMarkAllRead = async () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
    if (user?.id) {
      try {
        await fetch('/api/notifications/read', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventData.title || !newEventDate) return;
    
    const eventToAdd: AppEvent = {
      title: newEventData.title,
      type: newEventData.type as 'active' | 'equipment' | 'general' || 'general',
      time: newEventData.time,
      description: newEventData.description,
      equipment: newEventData.equipment
    };

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventToAdd, dateStr: newEventDate, userId: user.id })
      });
      const createdEvent = await res.json();

      setEvents(prev => {
        const updated = { ...prev };
        if (!updated[newEventDate]) updated[newEventDate] = [];
        updated[newEventDate].push(createdEvent);
        return updated;
      });
      
      setIsNewEventModalOpen(false);
      setNewEventData({ type: 'general' });
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Save state to localStorage whenever it changes
  useEffect(() => localStorage.setItem('app_currentDate', currentDate.toISOString()), [currentDate]);
  useEffect(() => {
    if (selectedDateStr) localStorage.setItem('app_selectedDateStr', selectedDateStr);
    else localStorage.removeItem('app_selectedDateStr');
  }, [selectedDateStr]);

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
    
    // Auto-select next active day
    const daysInMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    let foundActive = false;
    for (let i = 1; i <= daysInMonth; i++) {
      const dStr = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      if (events[dStr]?.some(e => e.type === 'active')) {
        setSelectedDateStr(dStr);
        foundActive = true;
        break;
      }
    }
    if (!foundActive) setSelectedDateStr(`${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-01`);
  };

  // 2. Keyboard Navigation (Escape + Arrows + Undo)
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (lastDeleted) {
          try {
            const res = await fetch('/api/events', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...lastDeleted.event, dateStr: lastDeleted.dateStr, userId: user.id })
            });
            const restoredEvent = await res.json();
            
            setEvents(prev => {
              const newEvents = { ...prev };
              if (!newEvents[lastDeleted.dateStr]) newEvents[lastDeleted.dateStr] = [];
              newEvents[lastDeleted.dateStr].splice(lastDeleted.index, 0, restoredEvent);
              return newEvents;
            });
            setLastDeleted(null);
          } catch (err) {
            console.error('Failed to restore event:', err);
          }
        }
        return;
      }

      if (e.key === 'Escape') {
        setSelectedDateStr(null);
        return;
      }
      
      if (!selectedDateStr) return;
      
      const [y, m, d] = selectedDateStr.split('-').map(Number);
      const currentSelected = new Date(y, m - 1, d);
      let newDate = new Date(currentSelected);

      if (e.key === 'ArrowRight') newDate.setDate(currentSelected.getDate() + 1);
      else if (e.key === 'ArrowLeft') newDate.setDate(currentSelected.getDate() - 1);
      else if (e.key === 'ArrowDown') newDate.setDate(currentSelected.getDate() + 7);
      else if (e.key === 'ArrowUp') newDate.setDate(currentSelected.getDate() - 7);
      else return;

      e.preventDefault();
      
      const newDateStr = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
      setSelectedDateStr(newDateStr);
      
      if (newDate.getMonth() !== currentDate.getMonth() || newDate.getFullYear() !== currentDate.getFullYear()) {
        setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDateStr, currentDate, lastDeleted]);

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const startingDay = firstDay === 0 ? 6 : firstDay - 1; // Monday start
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays = [];

    for (let i = 0; i < startingDay; i++) {
      calendarDays.push({ date: daysInPrevMonth - startingDay + i + 1, isPrevMonth: true, isCurrentMonth: false, isNextMonth: false, fullDate: null, events: undefined });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      calendarDays.push({ date: i, isCurrentMonth: true, isPrevMonth: false, isNextMonth: false, fullDate: dateStr, events: events[dateStr] });
    }

    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({ date: i, isNextMonth: true, isCurrentMonth: false, isPrevMonth: false, fullDate: null, events: undefined });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const nextMonth = () => handleMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => handleMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToday = () => {
    const today = new Date();
    handleMonthChange(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDateStr(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
  };

  const handleDeleteEvent = async (dateStr: string, eventId: number | undefined, eventIndex: number) => {
    if (!eventId) return;
    try {
      const res = await fetch(`/api/events/${eventId}?userId=${user.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete event');
        return;
      }
      setEvents(prev => {
        const newEvents = { ...prev };
        if (newEvents[dateStr]) {
          setLastDeleted({ dateStr, event: newEvents[dateStr][eventIndex], index: eventIndex });
          newEvents[dateStr] = newEvents[dateStr].filter((_, i) => i !== eventIndex);
          if (newEvents[dateStr].length === 0) {
            delete newEvents[dateStr];
          }
        }
        return newEvents;
      });
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  // Calculate dynamic summary
  let activeCount = 0;
  let equipmentCount = 0;
  Object.entries(events).forEach(([dateStr, dayEvents]) => {
    const [y, m] = dateStr.split('-');
    if (parseInt(y) === currentDate.getFullYear() && parseInt(m) - 1 === currentDate.getMonth()) {
       if (Array.isArray(dayEvents)) {
         dayEvents.forEach(e => {
           if (e?.title?.toLowerCase().includes((debouncedSearchQuery || '').toLowerCase())) {
             if (e.type === 'active') activeCount++;
             if (e.type === 'equipment') equipmentCount++;
           }
         });
       }
    }
  });

  // 3. Smart Event Sorting Helper
  const getSortedEvents = (dayEvents: AppEvent[]) => {
    const order: Record<string, number> = { active: 0, equipment: 1, general: 2 };
    return [...dayEvents].sort((a, b) => (order[a?.type] ?? 3) - (order[b?.type] ?? 3));
  };

  return (
    <div className="bg-background text-on-surface min-h-screen font-body">
      {/* TopAppBar */}
      <header className="bg-background flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-primary font-headline">MANILAB Equipplanner</span>
          <nav className="hidden md:flex items-center gap-6">
            <a onClick={(e) => e.preventDefault()} className="text-on-surface/60 hover:text-primary font-headline text-sm tracking-wide font-medium hover:scale-105 transition-transform duration-200 ease-out cursor-pointer" href="#">Week</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-2 mr-2">
            <Search className="text-on-surface-variant w-4 h-4 mr-2" />
            <input 
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48 font-body" 
              placeholder="Search events..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={() => setIsNewEventModalOpen(true)} className="bg-secondary text-on-secondary px-6 py-2 rounded-full font-headline font-semibold text-sm hover:scale-105 transition-transform duration-200 active:scale-95">
            New Event
          </button>
          <div className="flex items-center gap-2 border-l border-outline-variant pl-4 ml-2">
            <button onClick={() => {}} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors"><CalendarIcon className="w-5 h-5" /></button>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 overflow-hidden border border-gray-100">
                  <div className="p-5 pb-4 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                    {notifications.length > 0 ? (
                      <button 
                        onClick={handleMarkAllRead} 
                        className="text-[10px] font-bold tracking-wider text-[#4d7c0f] bg-[#ecfccb] px-3 py-1.5 rounded-full uppercase hover:bg-[#d9f99d] transition-colors"
                      >
                        Mark all read
                      </button>
                    ) : (
                      <button onClick={handleMarkAllRead} className="text-[12px] font-bold text-[#0f3d30] hover:underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-sm text-gray-500 text-center">No new notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-5 border-b border-gray-50 last:border-0 flex gap-4 ${n.read ? 'opacity-60' : ''}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            n.type === 'equipment' ? 'bg-[#bef264] text-[#3f6212]' :
                            n.type === 'team' ? 'bg-[#bbf7d0] text-[#166534]' :
                            'bg-[#f1f5f9] text-[#334155]'
                          }`}>
                            {n.type === 'equipment' ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 22h8"/><path d="M12 22v-6"/><path d="M12 16l-4-4"/><path d="M8 12V8"/><path d="M8 8l3-3"/><path d="M8 8l-3-3"/>
                              </svg>
                            ) : n.type === 'team' ? (
                              <User className="w-5 h-5" />
                            ) : (
                              <Settings className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-[10px] font-bold text-gray-600 tracking-wider uppercase">{n.title}</span>
                              <span className="text-[10px] text-gray-400">{n.created_at ? timeAgo(n.created_at) : (n.time || 'Just now')}</span>
                            </div>
                            <div className="text-sm text-gray-800 leading-snug" dangerouslySetInnerHTML={{ __html: n.message }} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="bg-[#f8fafc] p-4 text-center border-t border-gray-50">
                      <button className="text-[11px] font-bold tracking-widest text-gray-700 uppercase hover:text-gray-900 transition-colors">
                        View Notification History
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button onClick={() => {}} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors"><Settings className="w-5 h-5" /></button>
            <button onClick={onLogout} className="p-2 text-error hover:bg-error-container rounded-full transition-colors ml-2" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container-highest ml-2">
            <img className="w-full h-full object-cover" src={user.avatar} alt="User profile" />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 py-8 pb-32">
        {/* Calendar Controls & Month Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary mb-2">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h1>
            <p className="text-on-surface-variant font-body">{activeCount} active experiments and {equipmentCount} pending equipment bookings.</p>
          </div>
          <div className="flex gap-2 bg-surface-container-low p-1.5 rounded-full">
            <button onClick={prevMonth} className="p-2 bg-surface-container-lowest rounded-full shadow-sm text-primary hover:bg-surface-container transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={goToday} className="px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-container-lowest rounded-full transition-colors">Today</button>
            <button onClick={nextMonth} className="p-2 bg-surface-container-lowest rounded-full shadow-sm text-primary hover:bg-surface-container transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Calendar Month View */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_20px_40px_rgba(0,38,31,0.03)] border border-surface-container">
          {/* Day Names */}
          <div className="grid grid-cols-7 border-b border-surface-container">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className={`py-4 text-center text-xs font-label font-bold uppercase tracking-widest ${i >= 5 ? 'text-primary/40' : 'text-on-surface-variant'}`}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)]">
            {calendarDays.map((day, i) => {
              const isSelected = day.isCurrentMonth && day.fullDate === selectedDateStr;
              const filteredEvents = Array.isArray(day.events) ? day.events.filter(e => e?.title?.toLowerCase().includes((debouncedSearchQuery || '').toLowerCase())) : undefined;
              const sortedFilteredEvents = filteredEvents ? getSortedEvents(filteredEvents) : undefined;
              const hasEvents = sortedFilteredEvents && sortedFilteredEvents.length > 0;
              const isRightSide = (i % 7) >= 4; // Friday, Saturday, Sunday
              const activeEvent = sortedFilteredEvents?.find(e => e?.type === 'active');

              return (
                <div 
                  key={i} 
                  onClick={() => day.isCurrentMonth && day.fullDate && setSelectedDateStr(isSelected ? null : day.fullDate)}
                  className={`p-4 border-r border-b border-surface-container group cursor-pointer transition-colors relative 
                    ${!day.isCurrentMonth ? 'bg-surface-container-low opacity-40' : 'hover:bg-surface-container-low'} 
                    ${isSelected ? 'bg-primary-fixed/30 hover:bg-primary-fixed/40' : ''}`}
                >
                  <span className={`text-xs font-semibold ${day.isCurrentMonth ? 'text-primary' : ''} ${isSelected ? 'font-bold' : ''}`}>
                    {day.date}
                  </span>
                  
                  {hasEvents && (
                    <div className="mt-2 space-y-1">
                      {sortedFilteredEvents.map((event, j) => (
                        <div key={j}>
                          {event?.type === 'general' && (
                            <div className="bg-secondary/10 border-l-2 border-secondary px-2 py-1 rounded-sm">
                              <p className="text-[10px] font-bold text-secondary leading-tight truncate">{event.title}</p>
                            </div>
                          )}
                          {event?.type === 'equipment' && (
                            <div className="bg-blue-50 border-l-2 border-blue-500 px-2 py-1 rounded-sm">
                              <p className="text-[10px] font-bold text-blue-600 leading-tight truncate">{event.title}</p>
                            </div>
                          )}
                          {event?.type === 'active' && (
                            <div className="bg-secondary text-white px-2 py-1 rounded-sm shadow-sm relative">
                              <p className="text-[10px] font-bold leading-tight truncate">{event.title}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      {isSelected && (
                        <div className="flex gap-1 mt-1 px-1">
                          <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                          <div className="w-1 h-1 rounded-full bg-secondary"></div>
                        </div>
                      )}
                    </div>
                  )}

                  <AnimatePresence>
                    {isSelected && sortedFilteredEvents && sortedFilteredEvents.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, x: isRightSide ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRightSide ? 10 : -10 }}
                        className={`absolute top-4 ${isRightSide ? 'right-full mr-4' : 'left-full ml-4'} z-[60] w-64 glass-panel rounded-xl shadow-xl border border-white p-5 cursor-default max-h-96 overflow-y-auto`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sortedFilteredEvents.map((ev, idx) => (
                          <div key={idx} className={idx > 0 ? "mt-4 pt-4 border-t border-surface-container" : ""}>
                            <div className="flex justify-between items-start mb-4">
                              <span className={`inline-block px-2 py-0.5 text-white text-[10px] font-bold rounded-full uppercase tracking-widest ${ev.type === 'active' ? 'bg-secondary' : ev.type === 'equipment' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                                {ev.type === 'active' ? 'Active Run' : ev.type === 'equipment' ? 'Equipment' : 'General'}
                              </span>
                              <div className="flex gap-2">
                                <Edit2 onClick={() => {}} className="w-4 h-4 text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
                                <Trash2 onClick={() => day.fullDate && handleDeleteEvent(day.fullDate, ev.id, day.events!.findIndex(e => e.id === ev.id))} className="w-4 h-4 text-error cursor-pointer hover:text-red-700 transition-colors" />
                              </div>
                            </div>
                            <h3 className="text-lg font-headline font-bold text-primary mb-1">{ev.title}</h3>
                            {ev.time && (
                              <p className="text-xs font-body text-on-surface-variant flex items-center gap-1 mb-3">
                                <Clock className="w-3.5 h-3.5" />
                                {ev.time}
                              </p>
                            )}
                            {ev.description && (
                              <p className="text-xs font-body text-on-surface-variant leading-relaxed mb-4 whitespace-pre-wrap">
                                {ev.description}
                              </p>
                            )}
                            {ev.equipment && (
                              <div className="flex items-center gap-2 border-t border-surface-container pt-4">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                  <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <span className="text-[10px] font-bold text-on-surface-variant">Equipment: {ev.equipment}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Legend & Summary */}
        <div className="fixed bottom-24 right-8 z-40 bg-surface-container-lowest/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary"></span>
            <span className="text-xs font-bold font-label uppercase text-on-surface-variant">General Experiments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-xs font-bold font-label uppercase text-on-surface-variant">Equipment Bookings</span>
          </div>
          <div className="h-6 w-px bg-outline-variant mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {teamUsers.slice(0, 2).map(u => (
                <img key={u.id} className="w-6 h-6 rounded-full border-2 border-white object-cover" src={u.avatar} alt={u.name} title={u.name} />
              ))}
              {teamUsers.length > 2 && (
                <div className="w-6 h-6 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[8px] font-bold text-primary" title={teamUsers.slice(2).map(u => u.name).join(', ')}>
                  +{teamUsers.length - 2}
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-primary">Team Active</span>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-background/80 backdrop-blur-xl shadow-[0px_-20px_40px_rgba(0,38,31,0.06)] rounded-t-3xl md:hidden">
        <a onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center bg-secondary text-on-secondary rounded-full px-5 py-2 group cursor-pointer" href="#">
          <CalendarDays className="w-5 h-5 mb-1" />
          <span className="font-body text-[10px] uppercase tracking-widest font-semibold">Schedule</span>
        </a>
        <a onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary/50 px-5 py-2 hover:text-secondary group transition-colors cursor-pointer" href="#">
          <FlaskConical className="w-5 h-5 mb-1" />
          <span className="font-body text-[10px] uppercase tracking-widest font-semibold">Experiments</span>
        </a>
        <a onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary/50 px-5 py-2 hover:text-secondary group transition-colors cursor-pointer" href="#">
          <Package className="w-5 h-5 mb-1" />
          <span className="font-body text-[10px] uppercase tracking-widest font-semibold">Inventory</span>
        </a>
        <a onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary/50 px-5 py-2 hover:text-secondary group transition-colors cursor-pointer" href="#">
          <Users className="w-5 h-5 mb-1" />
          <span className="font-body text-[10px] uppercase tracking-widest font-semibold">Team</span>
        </a>
      </nav>

      {/* New Event Modal */}
      <AnimatePresence>
        {isNewEventModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setIsNewEventModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-headline font-bold text-primary">Create New Event</h2>
                  <button onClick={() => setIsNewEventModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Date</label>
                    <input 
                      type="date" 
                      required 
                      value={newEventDate} 
                      onChange={e => setNewEventDate(e.target.value)} 
                      className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Event Title</label>
                    <input 
                      type="text" 
                      required 
                      value={newEventData.title || ''} 
                      onChange={e => setNewEventData({...newEventData, title: e.target.value})} 
                      className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" 
                      placeholder="e.g., Centrifuge Run" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Type</label>
                    <select 
                      value={newEventData.type} 
                      onChange={e => setNewEventData({...newEventData, type: e.target.value})} 
                      className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
                    >
                      <option value="active">Active Run</option>
                      <option value="equipment">Equipment Booking</option>
                      <option value="general">General Experiment</option>
                    </select>
                  </div>
                  {newEventData.type === 'active' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Time</label>
                        <input 
                          type="text" 
                          value={newEventData.time || ''} 
                          onChange={e => setNewEventData({...newEventData, time: e.target.value})} 
                          className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" 
                          placeholder="e.g., 10:00 AM - 12:00 PM" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Equipment</label>
                        <input 
                          type="text" 
                          value={newEventData.equipment || ''} 
                          onChange={e => setNewEventData({...newEventData, equipment: e.target.value})} 
                          className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" 
                          placeholder="e.g., Unit 04-A" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Description</label>
                        <textarea 
                          value={newEventData.description || ''} 
                          onChange={e => setNewEventData({...newEventData, description: e.target.value})} 
                          className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-on-surface" 
                          rows={3} 
                          placeholder="Event details..." 
                        />
                      </div>
                    </>
                  )}
                  <div className="pt-4 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setIsNewEventModalOpen(false)} 
                      className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2 text-sm font-bold bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);

  return user ? (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={(userData) => setUser(userData)} />
  );
}
