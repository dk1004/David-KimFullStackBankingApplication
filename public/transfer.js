function Transfer(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');  
  
    return (
      <Card
        bgcolor="dark"
        header="Transfer"
        status={status}
        body={show ? 
          <TransferForm setShow={setShow} setStatus={setStatus}/> :
          <TransferMsg setShow={setShow} setStatus={setStatus}/>}
      />
    )
  }
  
  function TransferMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}>
          Transfer again
      </button>
    </>);
  }
  
  function TransferForm(props){

    const [recemail, setRecEmail]   = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [user, setUser] = React.useState('');
  
    function handle(){
        fetch(`/account/update/${recemail}/${amount}`);
      fetch(`/account/update/-${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus('Transfer Amount: $'+ amount + ' Balance: $' + JSON.stringify(data.value.balance));
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Transfer Failed')
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
      

      Receiver Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={recemail} 
        onChange={e => setRecEmail(e.currentTarget.value)}/><br/>
  
  
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Transfer
      </button>
  
    </>);
  }
  