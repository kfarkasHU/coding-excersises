import { exec } from "child_process";

export enum GitCommands {
  STATUS = "status"
}

export enum GitState {
  ADDED,
  DELETED,
  MODIFIED
}

export class GitStateResult {
  constructor(
    public readonly file: string,
    public readonly state: GitState
  ) {}
}

export class GitWrapper {
  public async getState() {
    const result = await this.runCommand(GitCommands.STATUS);
    console.log("result", result);
    return [new GitStateResult("", GitState.ADDED)];
  }

  private runCommand(command: GitCommands) {
    const entry = `git ${command}`;
    return new Promise<string>((resolve, reject) => {
      exec(entry, (exception, stdout, stdin) => {
        resolve(stdout);
      });
    });
  }
}
