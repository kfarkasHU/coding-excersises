const DEFAULTS = Object.freeze({
  colors: {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m"
  },
  enabledLevels: ["DBG", "INF", "WRN", "ERR"],
  defaultFormatter: (date: Date): string => {
    const year = pad(date.getFullYear());
    const month = pad(date.getMonth());
    const day = pad(date.getDate());

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const millis = pad(date.getMilliseconds());

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z${millis}`;

    function pad(num: number): string {
      return num.toString().padStart(2, "0");
    }
  }
});

export type LogSeverity = "DBG" | "INF" | "WRN" | "ERR" ;

export class LoggerConfiguration {
  private constructor(
    public readonly enabledLevels: LogSeverity[],
    public readonly colors: {
      debug: string,
      info: string,
      warning: string,
      error: string,
      reset: string
    },
    public readonly timestamp: {
      enabled: boolean,
      formatter: (date: Date) => string
    }
  ) {}

  public static create(
    isDebugEnabled: boolean,
    isInfoEnabled: boolean,
    isWarningEnabled: boolean,
    isErrorEnabled: boolean,
    colorDebug: string,
    colorInfo: string,
    colorWarning: string,
    colorError: string,
    timestampVisible: boolean,
    timestampFormatter: (date: Date) => string
  ): LoggerConfiguration {
    const levels: LogSeverity[] = [];
    isDebugEnabled && levels.push("DBG");
    isInfoEnabled && levels.push("INF");
    isWarningEnabled && levels.push("WRN");
    isErrorEnabled && levels.push("ERR");
    return new LoggerConfiguration(
      levels,
      {
        debug: colorDebug,
        info: colorInfo,
        warning: colorWarning,
        error: colorError,
        reset: DEFAULTS.colors.reset
      },
      {
        enabled: timestampVisible,
        formatter: timestampFormatter
      }
    );
  }

  public static default(): LoggerConfiguration {
    return new LoggerConfiguration(
      DEFAULTS.enabledLevels as LogSeverity[],
      {
        debug: DEFAULTS.colors.blue,
        info: DEFAULTS.colors.blue,
        warning: DEFAULTS.colors.yellow,
        error: DEFAULTS.colors.red,
        reset: DEFAULTS.colors.reset
      },
      {
        enabled: true,
        formatter: DEFAULTS.defaultFormatter
      }
    );
  }

}

export class Logger {

  private static _configuration: LoggerConfiguration = LoggerConfiguration.default();

  public static configure(config: LoggerConfiguration) {
    this._configuration = {
      ...LoggerConfiguration.default(),
      ...config
    };
  }

  public static logDebug(message: string): void {
    this.logInternal("DBG", message);
  }

  public static logInfo(message: string): void {
    this.logInternal("INF", message);
  }

  public static logWarning(message: string): void {
    this.logInternal("WRN", message);
  }

  public static logError(message: string): void {
    this.logInternal("ERR", message);
  }

  public static log(severity: LogSeverity, message: string): void {
    this.logInternal(severity, message);
  }

  private static logInternal(severity: LogSeverity, message: string): void {
    if(!this._configuration.enabledLevels.includes(severity)) {
      return;
    }

    const color = this.getColor(severity);
    const date = this._configuration.timestamp.enabled
      ? `${this._configuration.timestamp.formatter(new Date())} `
      : ""
    ;
    
    const entry = `[${color}${severity}${this._configuration.colors.reset}] ${date}- ${message}`;
    console.log(entry);
  }

  private static getColor(severity: LogSeverity): string {
    switch(severity) {
      case "ERR": return this._configuration.colors.error;
      case "WRN": return this._configuration.colors.warning;
      case "INF": return this._configuration.colors.info;
      default: return this._configuration.colors.debug;
    }
  }

}
