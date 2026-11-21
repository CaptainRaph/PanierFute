// MessageErreur.jsx - affichage d'un message d'erreur, ou d'une liste de
// messages. N'affiche rien s'il n'y a pas d'erreur.
import './MessageErreur.css';

function MessageErreur({ message }) {
  if (!message || message.length === 0) {
    return null;
  }
  const messages = Array.isArray(message) ? message : [message];

  // role="alert" : le message est lu tout de suite par les lecteurs d'écran.
  return (
    <div className="message-erreur" role="alert">
      {messages.map((texte) => (
        <p key={texte}>{texte}</p>
      ))}
    </div>
  );
}

export default MessageErreur;
