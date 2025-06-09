/**
 * Simple logger for MCP server that doesn't interfere with stdio protocol
 * Logs to a file instead of console when in MCP mode
 */
import fs from "fs/promises";
import path from "path";

const LOG_FILE = process.env.SETA_LOG_FILE || "seta-mcp.log";
const LOG_LEVEL = process.env.SETA_LOG_LEVEL || "info"; // debug, info, warn, error
const IS_MCP_MODE = process.env.NODE_ENV !== "development";

type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[LOG_LEVEL as LogLevel];
  }

  private async writeToFile(level: LogLevel, message: string, ...args: any[]) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${args.length > 0 ? JSON.stringify(args) : ""}\n`;

    try {
      await fs.appendFile(LOG_FILE, logMessage);
    } catch (error) {
      // Fallback to console if file write fails (only in dev mode)
      if (!IS_MCP_MODE) {
        console.error("Failed to write to log file:", error);
      }
    }
  }

  private logToConsole(level: LogLevel, message: string, ...args: any[]) {
    if (!this.shouldLog(level)) return;

    switch (level) {
      case "debug":
        console.debug(message, ...args);
        break;
      case "info":
        console.info(message, ...args);
        break;
      case "warn":
        console.warn(message, ...args);
        break;
      case "error":
        console.error(message, ...args);
        break;
    }
  }

  debug(message: string, ...args: any[]) {
    if (IS_MCP_MODE) {
      this.writeToFile("debug", message, ...args);
    } else {
      this.logToConsole("debug", message, ...args);
    }
  }

  info(message: string, ...args: any[]) {
    if (IS_MCP_MODE) {
      this.writeToFile("info", message, ...args);
    } else {
      this.logToConsole("info", message, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (IS_MCP_MODE) {
      this.writeToFile("warn", message, ...args);
    } else {
      this.logToConsole("warn", message, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    if (IS_MCP_MODE) {
      this.writeToFile("error", message, ...args);
    } else {
      this.logToConsole("error", message, ...args);
    }
  }
}

export const logger = new Logger();
