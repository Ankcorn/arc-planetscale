@app
arc-planetscale

@http
/
  method get
  src dist/http/get-index
/comment
  method post
  src dist/http/post-comment

@aws
profile PERSONAL
region eu-west-1
  