const allowCors = (req, res, next) => {
    res.set('Access-Control-Allow-Credentials', true)
    res.set('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    next();
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }

  export default allowCors;
  
  