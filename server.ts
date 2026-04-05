import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let pool: Pool | null = null;

  function getPool() {
    if (!pool) {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is required to connect to Neon Postgres');
      }
      pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
      });
    }
    return pool;
  }

  // Ensure DB exists on startup if URL is provided
  try {
    if (process.env.DATABASE_URL) {
      const p = getPool();
      await p.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          avatar TEXT
        )
      `);
      await p.query(`
        CREATE TABLE IF NOT EXISTS events (
          id SERIAL PRIMARY KEY,
          "dateStr" VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          time VARCHAR(255),
          description TEXT,
          equipment VARCHAR(255),
          user_id INTEGER REFERENCES users(id)
        )
      `);
      
      // Ensure user_id column exists if the table was created previously without it
      await p.query(`
        ALTER TABLE events 
        ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id)
      `);

      await p.query(`
        CREATE TABLE IF NOT EXISTS notifications (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          type VARCHAR(50) NOT NULL,
          title VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          read BOOLEAN DEFAULT FALSE
        )
      `);

      // Seed users
      const seedUsers = [
        { email: 'admin@manilab.com', pass: 'admin123', name: 'Admin User', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJcmnqFDmwNN7Q0_IoYbLge0O_2x2aCPoYjQmEb-T7w9eckcDBLpEsJld_D7lftvCpIZ3MSAiVSYSm0OYeUAz8Rl6w3PQGrJKt0U10LxnLEvqfAkJt8b4eHiiT0Rgqn_Nex5Qu8QkmxWip7CaNVWNv2Ss-eLedeb8WPw105Yd5mqaPvz7JIhcY5Poha5aEcwYZYrKbvyPFXiofxVMs75cHLga7oDOrLkjTtUQ_i8WPilZl2jORkSvvQwB7lR08f8_fpSglC1D2csL' },
        { email: 'researcher@manilab.com', pass: 'lab2026', name: 'Researcher', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKzm8hBoDYqMqgjrj29yZ4oRQj-Gh5WKLR7ObZb9-aurrZwfAtRfr2PR7Y808IJ-G2yi2UR6tBgbpRkEtJYbarRS-7jjRGZCK-D5Ki8Q4fb5P43449OM4I-5yhAXO4TllLKVhLqHdnE7Dv_li-S8kaXGGfKXmKYnzcyyvvKq8M-9STEhtLkpR-1ILwSVyFmlqlCcopHP4GcFvfhQh-7LTxaEWwP5qIobL8e93auNz7y1VbWIZlV4JoHCkNZiwud9vmQBwTrSHr1Iup' },
        { email: 'blz188465@bioschool.iitd.ac.in', pass: 'Maryam', name: 'Maryam Khursheed', avatar: 'https://ui-avatars.com/api/?name=Maryam+Khursheed&background=random' },
        { email: 'blz208323@bioschool.iitd.ac.in', pass: 'Pushka', name: 'Pushkar K Tatiya', avatar: 'https://ui-avatars.com/api/?name=Pushkar+K+Tatiya&background=random' },
        { email: 'blz208813@bioschool.iitd.ac.in', pass: 'KirtiS', name: 'Kirti Suhag', avatar: 'https://ui-avatars.com/api/?name=Kirti+Suhag&background=random' },
        { email: 'blz208816@bioschool.iitd.ac.in', pass: 'Paulom', name: 'Paulomi Goswami', avatar: 'https://ui-avatars.com/api/?name=Paulomi+Goswami&background=random' },
        { email: 'blz218474@bioschool.iitd.ac.in', pass: 'MilanL', name: 'Milan. K. Lokshman', avatar: 'https://ui-avatars.com/api/?name=Milan+K+Lokshman&background=random' },
        { email: 'blz228266@bioschool.iitd.ac.in', pass: 'Mritti', name: 'Mrittika Dasgupta', avatar: 'https://ui-avatars.com/api/?name=Mrittika+Dasgupta&background=random' },
        { email: 'blz228500@bioschool.iitd.ac.in', pass: 'RupamK', name: 'Rupam Khatua', avatar: 'https://ui-avatars.com/api/?name=Rupam+Khatua&background=random' },
        { email: 'srz238552@sire.iitd.ac.in', pass: 'Bhawna', name: 'Bhawna', avatar: 'https://ui-avatars.com/api/?name=Bhawna&background=random' },
        { email: 'blz238595@bioschool.iitd.ac.in', pass: 'Himans', name: 'Himanshu', avatar: 'https://ui-avatars.com/api/?name=Himanshu&background=random' },
        { email: 'srz238555@sire.iitd.ac.in', pass: 'KomalA', name: 'Komal Arora', avatar: 'https://ui-avatars.com/api/?name=Komal+Arora&background=random' },
        { email: 'pijushbera1998@gmail.com', pass: 'Pijush', name: 'Pijush Bera', avatar: 'https://ui-avatars.com/api/?name=Pijush+Bera&background=random' },
        { email: 'blz258027@bioschool.iitd.ac.in', pass: 'Siddha', name: 'Siddhant Raj Naik', avatar: 'https://ui-avatars.com/api/?name=Siddhant+Raj+Naik&background=random' },
        { email: 'blz258030@bioschool.iitd.ac.in', pass: 'Sudipt', name: 'Sudipto Chaki', avatar: 'https://ui-avatars.com/api/?name=Sudipto+Chaki&background=random' },
        { email: 'ird600491@iitd.ac.in', pass: 'Subhomoi', name: 'Dr. Subhomoi Borkotoky', avatar: 'https://ui-avatars.com/api/?name=Dr.+Subhomoi+Borkotoky&background=random' },
        { email: 'narula.pankhuri@gmail.com', pass: 'Pankhuri', name: 'Dr. Pankhuri Narula', avatar: 'https://ui-avatars.com/api/?name=Dr.+Pankhuri+Narula&background=random' },
        { email: 'devbrat.phd@gmail.com', pass: 'Devbrat', name: 'Dr. Devbrat Kumar', avatar: 'https://ui-avatars.com/api/?name=Dr.+Devbrat+Kumar&background=random' },
        { email: 'shaileshanandj@gmail.com', pass: 'Shaileshanand', name: 'Dr. Shaileshanand Jha', avatar: 'https://ui-avatars.com/api/?name=Dr.+Shaileshanand+Jha&background=random' }
      ];

      for (const u of seedUsers) {
        const hash = await bcrypt.hash(u.pass, 10);
        await p.query(
          `INSERT INTO users (email, password, name, avatar) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password`,
          [u.email, hash, u.name, u.avatar]
        );
      }

      // Clean up old demo notifications from the database
      await p.query(`
        DELETE FROM notifications 
        WHERE message LIKE '%Centrifuge A is%' 
           OR message LIKE '%Dr. Jacob Jones%' 
           OR message LIKE '%Weekly lab maintenance%'
      `);

      console.log('Postgres database tables initialized');
    } else {
      console.warn('Skipping database initialization because DATABASE_URL is missing.');
    }
  } catch (err) {
    console.error('Failed to initialize database tables:', err);
  }

  // SSE Clients for real-time notifications
  const clients = new Set<express.Response>();

  app.get('/api/notifications/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    clients.add(res);

    req.on('close', () => {
      clients.delete(res);
    });
  });

  // API Routes
  app.get('/api/notifications', async (req, res) => {
    try {
      if (!process.env.DATABASE_URL) return res.json([]);
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      const p = getPool();
      const result = await p.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/notifications/read', async (req, res) => {
    try {
      if (!process.env.DATABASE_URL) return res.json({ success: true });
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      const p = getPool();
      await p.query('UPDATE notifications SET read = true WHERE user_id = $1', [userId]);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating notifications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!process.env.DATABASE_URL) {
        return res.status(500).json({ error: 'Database connection not configured.' });
      }
      const p = getPool();
      const result = await p.query('SELECT id, email, password, name, avatar FROM users WHERE email = $1', [email]);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          const { password: _, ...userWithoutPassword } = user;
          res.json(userWithoutPassword);
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      if (!process.env.DATABASE_URL) {
        return res.json([]);
      }
      const p = getPool();
      const result = await p.query('SELECT id, name, avatar FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/events', async (req, res) => {
    try {
      if (!process.env.DATABASE_URL) {
        return res.json({});
      }
      
      const userId = req.query.userId;
      const p = getPool();
      let result;
      if (userId) {
        result = await p.query(`
          SELECT e.*, u.name as user_name 
          FROM events e 
          LEFT JOIN users u ON e.user_id = u.id 
          WHERE e.user_id = $1
        `, [userId]);
      } else {
        result = await p.query(`
          SELECT e.*, u.name as user_name 
          FROM events e 
          LEFT JOIN users u ON e.user_id = u.id
        `);
      }
      
      const events = result.rows.map(event => {
        if (event.user_name) {
          const firstName = event.user_name.split(' ')[0];
          event.title = `${event.title} (by ${firstName})`;
          event.description = event.description ? `Booked by: ${event.user_name}\n\n${event.description}` : `Booked by: ${event.user_name}`;
        }
        return event;
      });
      
      // Group events by dateStr to match frontend's Record<string, AppEvent[]>
      const groupedEvents: Record<string, any[]> = {};
      for (const event of events) {
        if (!groupedEvents[event.dateStr]) {
          groupedEvents[event.dateStr] = [];
        }
        groupedEvents[event.dateStr].push(event);
      }
      
      res.json(groupedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/events', async (req, res) => {
    try {
      const { dateStr, title, type, time, description, equipment, userId } = req.body;
      
      if (!dateStr || !title || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const p = getPool();
      const result = await p.query(
        'INSERT INTO events ("dateStr", title, type, time, description, equipment, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [dateStr, title, type, time, description, equipment, userId]
      );
      
      const newEvent = result.rows[0];

      let userName = 'Someone';
      if (userId) {
        const userResult = await p.query('SELECT name FROM users WHERE id = $1', [userId]);
        if (userResult.rows.length > 0) {
          userName = userResult.rows[0].name.split(' ')[0]; // Use first name
        }
      }

      const message = `<span class="font-bold">${userName}</span> booked <span class="font-bold">${equipment || title}</span> for ${dateStr}.`;

      // Insert notification for ALL users
      const notifResult = await p.query(
        `INSERT INTO notifications (user_id, type, title, message, read) 
         SELECT id, $1, $2, $3, false FROM users RETURNING *`,
        ['equipment', 'NEW BOOKING', message]
      );
      
      const newNotifs = notifResult.rows;

      // Broadcast notification to all connected clients
      for (const notif of newNotifs) {
        const notificationMsg = JSON.stringify(notif);
        for (const client of clients) {
          client.write(`data: ${notificationMsg}\n\n`);
        }
      }

      res.status(201).json(newEvent);
    } catch (error: any) {
      console.error('Error creating event:', error);
      if (error.message.includes('DATABASE_URL')) {
        return res.status(500).json({ error: 'Database connection not configured. Please set DATABASE_URL.' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/api/events/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.query;
      
      if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
      }

      const p = getPool();
      
      // Check if the event belongs to the user or if the user is an admin
      const userResult = await p.query('SELECT email FROM users WHERE id = $1', [userId]);
      const isAdmin = userResult.rows.length > 0 && userResult.rows[0].email === 'admin@manilab.com';

      const eventResult = await p.query('SELECT user_id FROM events WHERE id = $1', [id]);
      if (eventResult.rows.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      if (!isAdmin && eventResult.rows[0].user_id !== parseInt(userId as string)) {
        return res.status(403).json({ error: 'You can only delete your own bookings' });
      }
      
      await p.query('DELETE FROM events WHERE id = $1', [id]);
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
