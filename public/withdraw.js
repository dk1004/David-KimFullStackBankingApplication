function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="dark"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  
  const [amount, setAmount] = React.useState('');
  const [user, setUser] = React.useState('');

  function handle(){
    fetch(`/account/update/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('Withrawl Amount: $'+ amount + ' Balance: $' + JSON.stringify(data.value.balance));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Withdrawl Failed')
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


  return(<>

<h5>Account: {user}</h5>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
