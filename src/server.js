import app from './app.js';

const PORT = process.env.PORT || 5000; /* eslint-disable-line */

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
