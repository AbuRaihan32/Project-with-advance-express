import express, { NextFunction, Request, Response } from "express";
const app = express();

//! parsers
app.use(express.json());
app.use(express.text());

//! Routers
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);

  res.json({
    success: true,
    message: "user successfully created",
    data: user,
  });
});

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);

  res.json({
    success: true,
    message: "course successfully created",
    data: course,
  });
});

//! middlewares
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);
      res.send("Hello developers!");
    } catch (error) {
      next(error);
    }
  }
);

app.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    res.json({
      Hello: "this Is Hello",
    });
  } catch (error) {
    next(error);
  }
});

//! wrong route error handler
app.all("*", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Not Found",
  });
});

//! global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong!",
    });
  }
});

export default app;
