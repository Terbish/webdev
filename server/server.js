import express, { json } from 'express';
import logger from 'morgan';
import authorRoutes from './src/api/routes/authorRoutes.js';
import bookRoutes from './src/api/routes/bookRoutes.js';
const port = 3000;

const app = express();

app.use(logger('dev'));
app.use(json());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/authors', authorRoutes);
app.use("/books", bookRoutes);

export default app;