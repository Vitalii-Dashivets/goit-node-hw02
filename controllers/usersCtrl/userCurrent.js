const userCurrent = async (req, res, next) => {
  const { email, subscription } = req.body.user;
  res.status(200).json({ email, subscription });
};

export { userCurrent };
