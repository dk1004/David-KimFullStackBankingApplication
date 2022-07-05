function CreateAccount(){
  
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [state, setState]       = React.useState(true);
  
  
  function isEmpty(){
    let inputAcc = document.getElementsByClassName('form-control').value;
    if(inputAcc!=""){
      setState(false);}
  };

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }
  
  
  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'Name is missing'))     return;
    if (!validate(email,    'Email is missing'))    return;
    if (!validate(password, 'Password is missing')) return;
    if (password.length<8) return setStatus('Error: Password Must Be More Than 8 Characters'), setTimeout(() => setStatus(''),3000);
    console.log(name,email,password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
    setShow(false);
  }    
  


  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
    setState(true);
  }

  return (
    <Card
      bgcolor="dark"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name"  onKeyUp={isEmpty} value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" onKeyUp={isEmpty} value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" onKeyUp={isEmpty} value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light"  id="create account" disabled={state} onClick={handleCreate} >Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light m-1" onClick={() => window.location.href='#'}>Access Account</button>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}