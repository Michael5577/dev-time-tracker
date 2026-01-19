const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static('public'));

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ sessions: [] }, null, 2));
  }
}

// Get all sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const json = JSON.parse(data);
    res.json(json.sessions || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new session
app.post('/api/sessions', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const json = JSON.parse(data);
    const newSession = {
      id: Date.now().toString(),
      project: req.body.project || 'Untitled',
      startTime: req.body.startTime || new Date().toISOString(),
      endTime: req.body.endTime || null,
      duration: req.body.duration || 0,
      notes: req.body.notes || ''
    };
    json.sessions.push(newSession);
    await fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2));
    res.json(newSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a session
app.put('/api/sessions/:id', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const json = JSON.parse(data);
    const index = json.sessions.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Session not found' });
    }
    json.sessions[index] = { ...json.sessions[index], ...req.body };
    await fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2));
    res.json(json.sessions[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a session
app.delete('/api/sessions/:id', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const json = JSON.parse(data);
    json.sessions = json.sessions.filter(s => s.id !== req.params.id);
    await fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
initDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Dev Time Tracker running at http://localhost:${PORT}`);
  });
});
