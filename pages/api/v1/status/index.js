function status(request, response) {
  response.status(200).json({
    status: "ON THE LINE",
    message: "Hello World!",
  });
}

export default status;
