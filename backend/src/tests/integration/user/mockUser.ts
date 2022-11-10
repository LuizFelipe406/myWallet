import User from "../../../database/models/User";

const MockUser: User = new User({
  id: 1,
  username: 'Test User',
  email: 'email@test.com',
  password: '$2a$10$B7t8dRI7iEV6HXqiZYuSuO7pYdUSN/mfMYNgT8.Pt6GFK4pnTmTMK', //senha: password
  pictureUrl: 'url'
});

export default MockUser;