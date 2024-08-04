const allowCors = (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', 'library-client-eight.vercel.app')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.header(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
      }
    next();
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }

  export default allowCors;
  
  