import React from 'react'
import {Link} from 'react-router-dom'
import './notfound.css'
function NotFound() {
  return (
    <div>
      <section className="page_404">
	<div className="container">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className="col-sm-10 col-sm-offset-1  text-center">
		<div className="four_zero_four_bg">
			<h1 className="text-center ">404</h1>
		
		
		</div>
		
		<div className="contant_box_404">
		<h3 className="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for is not avaible!</p>
		
		<Link to='/'  style={{textDecoration:'none',color:'white',cursor:'pointer'}}>
        <button className="link_404" ><a href="">Go to Home</a></button></Link>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
    </div>
  )
}

export default NotFound
