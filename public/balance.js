function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
 

  return (
    <Card
      bgcolor="dark"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [user, setUser] = React.useState(''); 
    

  function handle(){
    fetch(`/account/findOne/`)   
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('Balance: $' + data.balance);
            props.setShow(false);
            console.log('JSON:', data);
           
        } catch(err) {
            const data = JSON.parse(text);
            props.setStatus('Balance: $' + data.balance);
            console.log('err:', text);
           
        }
      
    });
  }
  function username(){
    fetch(`/account/findOne/`)   
    .then(response => response.text())
    .then(text => {
        const data = JSON.parse(text);
        setUser(data.name);
        
       
    } 
  
)};


  const account= username();

  return (<>
  <h5>Account: {user}</h5>


    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}