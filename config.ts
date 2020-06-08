type EnvironmentType = {
  httpPort: number;
  env: 'staging' | 'production';
  hashingSecret: string;
  maxChecks: number;
};

type EnvironmentsType = {
  [key: string]: EnvironmentType;
};

const staging: EnvironmentType = {
  httpPort: 3000,
  env: 'staging',
  hashingSecret: 'thisIsASecret',
  maxChecks: 5,
};

const production: EnvironmentType = {
  httpPort: 5000,
  env: 'production',
  hashingSecret: 'thisIsAlsoASecret',
  maxChecks: 5,
};

const environments: EnvironmentsType = {
  staging,
  development: staging,
  production,
};

export default environments[(process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()) || 'staging'];
