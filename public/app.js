let timerInterval = null;
let startTime = null;
let currentSessionId = null;
let elapsedSeconds = 0;

const timerDisplay = document.getElementById('timerDisplay');
const projectInput = document.getElementById('projectInput');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const sessionsList = document.getElementById('sessionsList');

// Format time as HH:MM:SS
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Format duration for display
function formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 60) / 60);
    if (hrs > 0) {
        return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
}

// Update timer display
function updateTimer() {
    elapsedSeconds++;
    timerDisplay.textContent = formatTime(elapsedSeconds);
}

// Start timer
startBtn.addEventListener('click', async () => {
    const project = projectInput.value.trim() || 'Untitled';
    
    if (timerInterval) return;
    
    startTime = new Date().toISOString();
    elapsedSeconds = 0;
    
    // Create new session
    try {
        const response = await fetch('/api/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                project,
                startTime,
                duration: 0
            })
        });
        const session = await response.json();
        currentSessionId = session.id;
    } catch (error) {
        console.error('Error creating session:', error);
    }
    
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    projectInput.disabled = true;
});

// Stop timer
stopBtn.addEventListener('click', async () => {
    if (!timerInterval) return;
    
    clearInterval(timerInterval);
    timerInterval = null;
    
    // Update session
    if (currentSessionId) {
        try {
            await fetch(`/api/sessions/${currentSessionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    endTime: new Date().toISOString(),
                    duration: elapsedSeconds
                })
            });
        } catch (error) {
            console.error('Error updating session:', error);
        }
    }
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    projectInput.disabled = false;
    currentSessionId = null;
    
    loadSessions();
    updateStats();
});

// Reset timer
resetBtn.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    elapsedSeconds = 0;
    timerDisplay.textContent = formatTime(0);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    projectInput.disabled = false;
    currentSessionId = null;
});

// Load sessions
async function loadSessions() {
    try {
        const response = await fetch('/api/sessions');
        const sessions = await response.json();
        
        if (sessions.length === 0) {
            sessionsList.innerHTML = '<div class="empty-state">No sessions yet. Start tracking your time!</div>';
            return;
        }
        
        sessionsList.innerHTML = sessions
            .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
            .map(session => {
                const startDate = new Date(session.startTime);
                const dateStr = startDate.toLocaleDateString();
                const timeStr = startDate.toLocaleTimeString();
                const duration = session.duration || 0;
                
                return `
                    <div class="session-item">
                        <div class="session-info">
                            <div class="session-project">${session.project}</div>
                            <div class="session-time">${dateStr} at ${timeStr}</div>
                        </div>
                        <div class="session-duration">${formatDuration(duration)}</div>
                        <button class="delete-btn" onclick="deleteSession('${session.id}')">Delete</button>
                    </div>
                `;
            })
            .join('');
    } catch (error) {
        console.error('Error loading sessions:', error);
    }
}

// Delete session
async function deleteSession(id) {
    if (!confirm('Are you sure you want to delete this session?')) return;
    
    try {
        await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
        loadSessions();
        updateStats();
    } catch (error) {
        console.error('Error deleting session:', error);
    }
}

// Update statistics
async function updateStats() {
    try {
        const response = await fetch('/api/sessions');
        const sessions = await response.json();
        
        const totalSeconds = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
        const sessionCount = sessions.length;
        const avgSeconds = sessionCount > 0 ? Math.floor(totalSeconds / sessionCount) : 0;
        
        document.getElementById('totalTime').textContent = formatDuration(totalSeconds);
        document.getElementById('sessionCount').textContent = sessionCount;
        document.getElementById('avgTime').textContent = formatDuration(avgSeconds);
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Initialize
loadSessions();
updateStats();

// Auto-save running timer every 30 seconds
setInterval(async () => {
    if (timerInterval && currentSessionId) {
        try {
            await fetch(`/api/sessions/${currentSessionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    duration: elapsedSeconds
                })
            });
        } catch (error) {
            console.error('Error auto-saving session:', error);
        }
    }
}, 30000);
