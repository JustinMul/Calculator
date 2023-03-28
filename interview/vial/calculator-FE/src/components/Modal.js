import "./Modal.css";

const Modal = ({ open, onClose, historyArr}) => {
 
  if (!open) return null; 
  
  return (
    <div onClick={onClose} className='overlay'>
    <div>
      <div className='innerOverlay'>
        <p className='close' onClick={onClose}>
          X
        </p>
        <p className="title">History</p>
        <div >
          {historyArr.map((single)=>{
              return (<p className="content">{single}</p>)
          })}
        
        </div>
       
      </div>
    </div>
  </div>
  )
};

export default Modal;