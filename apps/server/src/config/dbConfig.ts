const { ReadPreference } = require('mongodb');

export const options = {
  autoIndex: false,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  // ssl: true,
  // authSource: 'admin',
  // replicaSet: 'myReplicaSet',
  retryWrites: true,
  w: 'majority' as 'majority', // Ensures compatibility with W type
  readPreference: ReadPreference.PRIMARY_PREFERRED,
};
