import "./Modal.css";

const Modal = ({ open, onClose, historyArr}) => {
 
  if (!open) return null; 
  
  return (
    <div onClick={onClose} className='overlay'>
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className='modalContainer'
    >
      
      <div className='modalRight'>
        <p className='closeBtn' onClick={onClose}>
          X
        </p>
        <p className="title">History</p>
        <div className='content'>
          <p>{historyArr.map((single)=>{
              return (<p>{single}</p>)
          })}</p>
        
        </div>
       
      </div>
    </div>
  </div>
  )
};

export default Modal;