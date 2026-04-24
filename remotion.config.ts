import { Config } from "@remotion/cli/config";

Config.overrideWebpackConfig((currentConfiguration) => {
  return currentConfiguration;
});

Config.setBrowserExecutable(null);
Config.setChromiumDisableWebSecurity(false);
Config.setConcurrency(4);
