
function NavBar(){
  $(document).ready(function() {
    $('.navbar-nav').on('click', 'a', function(){
      $('.navbar-nav a.active').removeClass('active');
      $(this).addClass('active');
    });
  });
  
  
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#" data-toggle="tooltip" data-placement="right" title="Home Page"  ><img src="Logo.png"/> DK Bank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link active" data-toggle="tooltip" data-placement="right" title="Home Page"  href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tooltip" data-placement="right" title="Create a new account to deposit and withdraw" href="#/CreateAccount/"  >Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tooltip" data-placement="right" title="Login to deposit and withdraw" href="#/login/"  >Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tooltip" data-placement="right" title="Deposit Money" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tooltip" data-placement="right" title="Withdraw Money" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tooltip" data-placement="right" title="Send Money" href="#/transfer/">Transfer</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tooltip" data-placement="right" title="Balance on the account" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tooltip" data-placement="right" title="All the data of users" href="#/alldata/">All Data</a>
          </li>   
          <li className="nav-item">
            <a className="nav-link"  data-toggle="tooltip" data-placement="right" title="All the data of users" href="/logout" >Logout</a>
          </li>   

        </ul>
      </div>
    </nav>
    
    </>
    
  );
}
