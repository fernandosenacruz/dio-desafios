import app from "./app";

const PORT = process.env.PORT ?? 3333;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
