/**
 * Data handling module for time tracking sessions
 * Manages reading and writing session data to/from data.json
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { isToday, parseISO } = require('date-fns');

// Path to data file
const DATA_FILE = path.join(__dirname, '..', 'data.json');

/**
 * Default data structure
 */
const DEFAULT_DATA = {
  sessions: [],
  config: { dailyGoal: 8 }
};

/**
 * Read data from data.json file
 * Creates the file with default structure if it doesn't exist
 * @returns {Object} The data object containing sessions and config
 */
function readData() {
  try {
    // Check if file exists
    if (!fs.existsSync(DATA_FILE)) {
      // Create directory if it doesn't exist
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      // Create file with default data
      writeData(DEFAULT_DATA);
      console.log(chalk.gray('Created new data file with default configuration.'));
      return DEFAULT_DATA;
    }

    // Read and parse existing file
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    
    // Handle empty file
    if (!fileContent.trim()) {
      console.log(chalk.yellow('Warning: data.json is empty. Initializing with default data.'));
      writeData(DEFAULT_DATA);
      return DEFAULT_DATA;
    }

    const data = JSON.parse(fileContent);
    
    // Ensure data has required structure
    if (!data.sessions || !Array.isArray(data.sessions)) {
      console.log(chalk.yellow('Warning: Invalid sessions array. Initializing with empty array.'));
      data.sessions = [];
    }
    
    if (!data.config || typeof data.config !== 'object') {
      console.log(chalk.yellow('Warning: Invalid config object. Initializing with default config.'));
      data.config = { dailyGoal: 8 };
    }
    
    // Ensure dailyGoal exists
    if (typeof data.config.dailyGoal !== 'number' || data.config.dailyGoal <= 0) {
      console.log(chalk.yellow('Warning: Invalid dailyGoal. Setting to default (8 hours).'));
      data.config.dailyGoal = 8;
    }

    return data;
  } catch (error) {
    // If JSON parsing fails, create a new file
    if (error instanceof SyntaxError) {
      console.error(chalk.red('Error: data.json is corrupted. Creating a new file.'));
      writeData(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    
    // Re-throw other errors
    console.error(chalk.red(`Failed to read data file: ${error.message}`));
    throw new Error(`Failed to read data file: ${error.message}`);
  }
}

/**
 * Write data to data.json file
 * @param {Object} data - The data object to write
 * @throws {Error} If writing fails
 */
function writeData(data) {
  try {
    // Ensure directory exists
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Validate data structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data: must be an object');
    }

    // Ensure required properties exist
    if (!Array.isArray(data.sessions)) {
      console.log(chalk.yellow('Warning: sessions must be an array. Initializing with empty array.'));
      data.sessions = [];
    }
    
    if (!data.config || typeof data.config !== 'object') {
      console.log(chalk.yellow('Warning: config must be an object. Initializing with default config.'));
      data.config = { dailyGoal: 8 };
    }

    // Write to file with pretty formatting
    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(DATA_FILE, jsonContent, 'utf8');
  } catch (error) {
    console.error(chalk.red(`Failed to write data file: ${error.message}`));
    throw new Error(`Failed to write data file: ${error.message}`);
  }
}

/**
 * Get the currently active session (session where endTime is null)
 * @param {Object} data - The data object containing sessions (optional, will read if not provided)
 * @returns {Object|null} The active session object or null if none exists
 */
function getActiveSession(data = null) {
  try {
    const sessionData = data || readData();
    
    if (!sessionData || !Array.isArray(sessionData.sessions)) {
      return null;
    }

    // Find session without endTime (active session)
    // Also validate that it has a valid startTime
    const activeSession = sessionData.sessions.find(session => 
      session && 
      session.endTime === null && 
      session.startTime && 
      typeof session.startTime === 'string'
    );

    return activeSession || null;
  } catch (error) {
    console.error(chalk.red(`Error getting active session: ${error.message}`));
    return null;
  }
}

/**
 * Get all sessions from today
 * @param {Object} data - The data object containing sessions (optional, will read if not provided)
 * @returns {Array} Array of session objects from today
 */
function getTodaySessions(data = null) {
  try {
    const sessionData = data || readData();
    
    if (!sessionData || !Array.isArray(sessionData.sessions)) {
      return [];
    }

    // Filter sessions that started today
    return sessionData.sessions.filter(session => {
      if (!session || !session.startTime) {
        return false;
      }
      
      try {
        const startDate = parseISO(session.startTime);
        if (isNaN(startDate.getTime())) {
          return false;
        }
        return isToday(startDate);
      } catch (error) {
        // Skip invalid dates
        return false;
      }
    });
  } catch (error) {
    console.error(chalk.red(`Error getting today's sessions: ${error.message}`));
    return [];
  }
}

/**
 * Add a new session to the data
 * @param {Object} session - The session object to add
 * @returns {Object} The added session with generated ID if not provided
 */
function addSession(session) {
  try {
    if (!session || typeof session !== 'object') {
      throw new Error('Session must be an object');
    }

    const data = readData();

    // Generate ID if not provided
    if (!session.id) {
      session.id = Date.now().toString();
    }

    // Ensure required fields have defaults
    if (!session.startTime) {
      session.startTime = new Date().toISOString();
    }
    
    if (session.endTime === undefined) {
      session.endTime = null;
    }
    
    if (session.duration === undefined) {
      session.duration = null;
    }

    // Add session to array
    data.sessions.push(session);
    writeData(data);

    console.log(chalk.green(`✓ Session added successfully (ID: ${session.id})`));
    return session;
  } catch (error) {
    console.error(chalk.red(`Error adding session: ${error.message}`));
    throw error;
  }
}

/**
 * Update an existing session by ID
 * @param {string} id - The session ID to update
 * @param {Object} updates - The fields to update
 * @returns {Object|null} The updated session object or null if not found
 */
function updateSession(id, updates) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('Session ID must be a string');
    }

    if (!updates || typeof updates !== 'object') {
      throw new Error('Updates must be an object');
    }

    const data = readData();

    if (!Array.isArray(data.sessions)) {
      throw new Error('Sessions array is invalid');
    }

    // Find the session
    const sessionIndex = data.sessions.findIndex(session => session && session.id === id);

    if (sessionIndex === -1) {
      console.log(chalk.yellow(`Warning: Session with ID ${id} not found.`));
      return null;
    }

    // Update the session
    const session = data.sessions[sessionIndex];
    Object.assign(session, updates);

    // Validate updated session
    if (session.startTime && typeof session.startTime !== 'string') {
      throw new Error('startTime must be a string');
    }
    
    if (session.endTime !== null && session.endTime !== undefined && typeof session.endTime !== 'string') {
      throw new Error('endTime must be a string or null');
    }
    
    if (session.duration !== null && session.duration !== undefined && typeof session.duration !== 'number') {
      throw new Error('duration must be a number or null');
    }

    // Save updated data
    writeData(data);

    console.log(chalk.green(`✓ Session updated successfully (ID: ${id})`));
    return session;
  } catch (error) {
    console.error(chalk.red(`Error updating session: ${error.message}`));
    throw error;
  }
}

module.exports = {
  readData,
  writeData,
  getActiveSession,
  getTodaySessions,
  addSession,
  updateSession
};
