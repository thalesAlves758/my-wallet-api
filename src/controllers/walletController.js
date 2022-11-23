async function getWallet(req, res) {
  const { user } = res.locals;

  res.send(user.wallet);
}

export default getWallet;
