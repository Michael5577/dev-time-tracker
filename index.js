#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const { format, differenceInMinutes, isToday, parseISO } = require('date-fns');
const { readData, writeData, getActiveSession, getTodaySessions, addSession, updateSession } = require('./utils/data');

const program = new Command();

// Helper functions

/**
 * Safely parse a date string and return a Date object
 * Returns null if the date string is invalid or null/undefined
 */
function safeParseDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }
  
  return date;
}


/**
 * Calculate total minutes for today
 */
function getTodayTotalMinutes(data) {
  const todaySessions = getTodaySessions(data);
  return todaySessions.reduce((total, session) => {
    return total + (session.duration || 0);
  }, 0);
}

// Banner
console.log(chalk.blue(figlet.textSync('Dev Tracker')));

// Setup commands
program
  .version('1.0.0')
  .description('Track your development time');

program
  .command('start')
  .description('Start a new coding session')
  .argument('[project-name]', 'Project name for this session')
  .option('-p, --project <project>', 'Project name for this session (alternative to argument)')
  .action((projectName, options) => {
    try {
      // Get project name from argument or option (argument takes precedence)
      const project = projectName || options.project || null;
      
      // Check if there's already an active session
      const activeSession = getActiveSession();
      
      if (activeSession) {
        // Show warning with formatted start time
        const startDate = parseISO(activeSession.startTime);
        if (!isNaN(startDate.getTime())) {
          console.log(chalk.yellow('⚠️  There is already an active session running.'));
          console.log(chalk.gray(`Started at: ${format(startDate, 'PPpp')}`));
          if (activeSession.project) {
            console.log(chalk.gray(`📁 Project: ${activeSession.project}`));
          }
        } else {
          console.log(chalk.yellow('⚠️  There is already an active session running.'));
        }
        return;
      }

      // Create new session
      const newSession = {
        startTime: new Date().toISOString(),
        endTime: null,
        duration: null,
        project: project
      };

      // Save using addSession from data module
      const savedSession = addSession(newSession);

      // Show success message with formatted time
      const sessionStartDate = parseISO(savedSession.startTime);
      if (!isNaN(sessionStartDate.getTime())) {
        console.log(chalk.green('✅ Session started successfully!'));
        console.log(chalk.gray(`🕐 Started at: ${format(sessionStartDate, 'PPpp')}`));
        if (savedSession.project) {
          console.log(chalk.gray(`📁 Project: ${savedSession.project}`));
        }
      } else {
        console.log(chalk.green('✅ Session started successfully!'));
        if (savedSession.project) {
          console.log(chalk.gray(`📁 Project: ${savedSession.project}`));
        }
      }
    } catch (error) {
      console.error(chalk.red('❌ Error starting session:'), error.message);
      process.exit(1);
    }
  });

program
  .command('stop')
  .description('Stop current session')
  .action(() => {
    try {
      // Get active session (error if none)
      const activeSession = getActiveSession();

      if (!activeSession) {
        console.error(chalk.red('❌ Error: No active session found.'));
        console.log(chalk.gray('Use "track start" to begin a new session.'));
        process.exit(1);
      }

      // Parse start time
      const startTime = parseISO(activeSession.startTime);
      if (isNaN(startTime.getTime())) {
        console.error(chalk.red('❌ Error: Active session has invalid startTime.'));
        process.exit(1);
      }

      // Calculate duration using date-fns differenceInMinutes
      const endTime = new Date();
      const totalMinutes = differenceInMinutes(endTime, startTime);
      
      // Convert minutes to seconds for storage
      const durationInSeconds = totalMinutes * 60;

      // Update session with end time and duration using updateSession
      const updatedSession = updateSession(activeSession.id, {
        endTime: endTime.toISOString(),
        duration: durationInSeconds
      });

      if (!updatedSession) {
        console.error(chalk.red('❌ Error: Failed to update session.'));
        process.exit(1);
      }

      // Format duration nicely (e.g., "2 hours 15 minutes")
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      let durationText = '';
      
      if (hours > 0 && minutes > 0) {
        durationText = `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      } else if (hours > 0) {
        durationText = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
      } else if (minutes > 0) {
        durationText = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      } else {
        durationText = 'less than 1 minute';
      }

      // Show summary: start time, end time, total minutes/hours
      console.log(chalk.green('✅ Session stopped successfully!'));
      console.log(chalk.gray(`🕐 Started: ${format(startTime, 'PPpp')}`));
      console.log(chalk.gray(`🕐 Ended: ${format(endTime, 'PPpp')}`));
      console.log(chalk.gray(`⏱️  Duration: ${durationText} (${totalMinutes} minutes)`));
      
      if (updatedSession.project) {
        console.log(chalk.gray(`📁 Project: ${updatedSession.project}`));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error stopping session:'), error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Check current status')
  .action(() => {
    try {
      const data = readData();
      const activeSession = getActiveSession(data);

      if (!activeSession) {
        console.log(chalk.yellow('No active session.'));
        
        // Show today's summary
        const todayMinutes = getTodayTotalMinutes(data);
        const dailyGoal = data.config.dailyGoal || 8;
        const dailyGoalMinutes = dailyGoal * 60;
        
        if (todayMinutes > 0) {
          console.log(chalk.cyan(`\nToday's Total: ${Math.floor(todayMinutes / 60)}h ${todayMinutes % 60}m / ${dailyGoal}h`));
          const progress = Math.min((todayMinutes / dailyGoalMinutes) * 100, 100);
          const remaining = Math.max(0, dailyGoalMinutes - todayMinutes);
          if (progress >= 100) {
            console.log(chalk.green('🎉 Daily goal achieved!'));
          } else {
            console.log(chalk.gray(`Remaining: ${Math.floor(remaining / 60)}h ${remaining % 60}m`));
          }
        }
        return;
      }

      // Validate startTime
      const startTime = parseISO(activeSession.startTime);
      if (isNaN(startTime.getTime())) {
        console.error(chalk.red('❌ Error: Active session has invalid startTime.'));
        process.exit(1);
      }

      const now = new Date();
      const elapsed = Math.floor((now - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;

      console.log(chalk.cyan('Current Session:'));
      console.log(chalk.gray(`Started: ${format(startTime, 'PPpp')}`));
      console.log(chalk.gray(`Elapsed: ${hours}h ${minutes}m ${seconds}s`));
      if (activeSession.project) {
        console.log(chalk.gray(`Project: ${activeSession.project}`));
      }

      // Show today's progress
      const todayMinutes = getTodayTotalMinutes(data);
      const currentSessionMinutes = Math.floor(elapsed / 60);
      const totalTodayMinutes = todayMinutes + currentSessionMinutes;
      const dailyGoal = data.config.dailyGoal || 8;
      const dailyGoalMinutes = dailyGoal * 60;
      
      console.log(chalk.cyan(`\nToday's Progress: ${Math.floor(totalTodayMinutes / 60)}h ${totalTodayMinutes % 60}m / ${dailyGoal}h`));
      const progress = Math.min((totalTodayMinutes / dailyGoalMinutes) * 100, 100);
      if (progress >= 100) {
        console.log(chalk.green('🎉 Daily goal achieved!'));
      } else {
        const remaining = dailyGoalMinutes - totalTodayMinutes;
        console.log(chalk.gray(`Remaining: ${Math.floor(remaining / 60)}h ${remaining % 60}m to reach goal`));
      }
    } catch (error) {
      console.error(chalk.red('✗ Error getting status:'), error.message);
      process.exit(1);
    }
  });

program
  .command('report')
  .description('Show time tracking reports')
  .option('-t, --today', 'Show today\'s sessions')
  .action((options) => {
    try {
      const data = readData();
      
      if (options.today) {
        const todaySessions = getTodaySessions(data);
        console.log(chalk.cyan('Today\'s Sessions:'));
        
        if (todaySessions.length === 0) {
          console.log(chalk.gray('No sessions today.'));
          return;
        }

        let totalSeconds = 0;
        todaySessions.forEach((session) => {
          if (session.duration && session.endTime && session.startTime) {
            totalSeconds += session.duration;
            const hours = Math.floor(session.duration / 3600);
            const minutes = Math.floor((session.duration % 3600) / 60);
            const seconds = session.duration % 60;
            
            const startDate = parseISO(session.startTime);
            const endDate = parseISO(session.endTime);
            
            if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
              console.log(chalk.gray(`  • ${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm')} (${hours}h ${minutes}m ${seconds}s)`));
              if (session.project) {
                console.log(chalk.gray(`    Project: ${session.project}`));
              }
            }
          }
        });

        const totalHours = Math.floor(totalSeconds / 3600);
        const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
        const dailyGoal = data.config.dailyGoal || 8;
        console.log(chalk.cyan(`\nTotal today: ${totalHours}h ${totalMinutes}m / ${dailyGoal}h`));
      } else {
        // Default: show all sessions summary
        const completedSessions = data.sessions.filter(s => {
          if (!s.duration || !s.endTime || !s.startTime) return false;
          const startDate = parseISO(s.startTime);
          const endDate = parseISO(s.endTime);
          return !isNaN(startDate.getTime()) && !isNaN(endDate.getTime());
        });
        const totalSeconds = completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0);
        const totalHours = Math.floor(totalSeconds / 3600);
        const totalMinutes = Math.floor((totalSeconds % 3600) / 60);

        console.log(chalk.cyan('Time Tracking Summary:'));
        console.log(chalk.gray(`Total sessions: ${completedSessions.length}`));
        console.log(chalk.gray(`Total time: ${totalHours}h ${totalMinutes}m`));
      }
    } catch (error) {
      console.error(chalk.red('✗ Error generating report:'), error.message);
      process.exit(1);
    }
  });

program
  .command('config')
  .description('Manage configuration settings')
  .option('-s, --set <key=value>', 'Set a configuration value')
  .option('-g, --get <key>', 'Get a configuration value')
  .option('-l, --list', 'List all configuration values')
  .action((options) => {
    try {
      const data = readData();
      
      if (!data.config) {
        data.config = { dailyGoal: 8 };
      }

      if (options.list) {
        console.log(chalk.cyan('Configuration:'));
        Object.entries(data.config).forEach(([key, value]) => {
          console.log(chalk.gray(`  ${key}: ${value}`));
        });
        if (Object.keys(data.config).length === 0) {
          console.log(chalk.gray('No configuration set.'));
        }
      } else if (options.get) {
        const value = data.config[options.get];
        if (value !== undefined) {
          console.log(chalk.cyan(`${options.get}: ${value}`));
        } else {
          console.log(chalk.yellow(`Configuration key "${options.get}" not found.`));
        }
      } else if (options.set) {
        const [key, ...valueParts] = options.set.split('=');
        const value = valueParts.join('=');
        if (!key || !value) {
          console.error(chalk.red('Invalid format. Use: --set key=value'));
          return;
        }
        
        // Special handling for dailyGoal (should be a number)
        if (key === 'dailyGoal') {
          const numValue = parseFloat(value);
          if (isNaN(numValue) || numValue <= 0) {
            console.error(chalk.red('dailyGoal must be a positive number'));
            return;
          }
          data.config[key] = numValue;
        } else {
          data.config[key] = value;
        }
        
        writeData(data);
        console.log(chalk.green(`✓ Configuration updated: ${key} = ${data.config[key]}`));
      } else {
        program.help();
      }
    } catch (error) {
      console.error(chalk.red('✗ Error managing configuration:'), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
