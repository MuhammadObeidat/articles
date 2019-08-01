import React from 'react';
import { cutSentence } from "../../helpers/cutSentence";
import "./styles.scss";

export default (props) => {
	const { card, user, index } = props;

	 return (
     <div className="card custom-card mb-3" >
       <div onClick={() => props.showArticle(card)}>
         <img className="card-img-top" src={card.image} alt="" />
         <div className="card-body">
           <h5 className="card-title">{card.title}</h5>
           <p className="card-title text-muted">Published: {card.date}</p>
           <p>{cutSentence(card.decriptionText, true, 200, "...")}</p>
         </div>
       </div>

       <div className="card-footer d-flex mt-auto">
         <span onClick={() => props.showArticle(card)} className="text-muted">
           see more
         </span>
         {card.authorEmail === user.email && (
           <>
             <span
               onClick={() => props.editArticle(card)}
               className="ml-auto text-success"
             >
               <i className="far fa-edit" />
             </span>
             <span
               onClick={() => props.deleteArticle(index)}
               className="ml-auto text-danger"
             >
               <i className="fas fa-trash-alt" />
             </span>
           </>
         )}
       </div>
     </div>
   );
}