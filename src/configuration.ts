import { workspace } from 'vscode';

import { ConfigurationConstants } from './constants';

export default class Configuration {
  public static get<T>(key: string, defaultValue?: T): T {
    const value = workspace
      .getConfiguration(ConfigurationConstants.SectionName)
      .get<T>(key);
    if (typeof value === 'undefined') {
      if (typeof defaultValue !== 'undefined') {
        return defaultValue;
      }
      throw new Error(
        `configuration ${ConfigurationConstants.SectionName}.${key} did not return a value`
      );
    }
    return value;
  }
}
