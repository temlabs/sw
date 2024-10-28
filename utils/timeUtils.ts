export const secondsToMilliseconds = (seconds: number) => seconds * 1000;

export const minutesToMilliseconds = (minutes: number) =>
  secondsToMilliseconds(minutes * 60);
