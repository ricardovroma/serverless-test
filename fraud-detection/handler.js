module.exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  if (!body.hasOwnProperty('customer')) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({error: "Provide a customer"})
    });
    return;
  }
  if (!body.customer.hasOwnProperty('email')) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({error: "Provide a customer email"})
    });
    return;
  }
  const recommendation = body.customer.email.match(/@qa-force-allow.com$/) == null ? 'decline' : 'approve';
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({recommendation})
  });
}
