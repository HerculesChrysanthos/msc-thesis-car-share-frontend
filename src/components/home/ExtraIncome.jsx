import React from 'react';
import Audi from '../../assets/home/audi-home.png';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: 'Ανέβασε φωτογραφίες και λεπτομέρειες.',
    content:
      'Με φωτογραφίες και βασικές λεπτομέρειες όπως μάρκα, μοντέλο και έτος. Αυτό βοηθά τους ενοικιαστές να ξέρουν τι να περιμένουν.',
  },
  {
    title: 'Επίλεξε τη διαθεσιμότητα και την τιμή ενοικίασης.',
    content:
      'Ορίστε τις ημερομηνίες που το όχημα είναι διαθέσιμο προς ενοικίαση. Μπορείς να ενημερώσεις το ημερολόγιο ανά πάσα στιγμή!',
  },
  {
    title: 'Έγκρινε τα αιτήματα από ενοικιαστές.',
    content:
      'Θα λάβεις αιτήματα ενοικίασης από χρήστες που ενδιαφέρονται, θα έχεις την επιλογή να αποδεχτείς ή να απορρίψεις τα αιτήματα!',
  },
  {
    title: 'Κέρδισε χρήματα απο την ενοικίαση απευθείας!',
    content:
      'Είναι ένας απλός και ασφαλής τρόπος για να κερδίσετε χρήματα μοιράζοντας το αυτοκίνητό σας.',
  },
];

function ExtraIncome() {
  const navigate = useNavigate();
  return (
    <div className='extra-container'>
      <div className='audi-img'>
        <img src={Audi} alt='Audi' />
        <img src={Audi} alt='Audi' className='hidden-image' />
      </div>
      <div className='steps'>
        {steps.map((step, index) => (
          <div className='step' key={index}>
            <h3>
              {index + 1}
              {step.title}
            </h3>
            <p>{step.content}</p>
          </div>
        ))}
        <button
          onClick={() => navigate('/')}
          type='button'
          className='rent-btn'
        >
          Νοίκιασε το αμάξι σου
        </button>
      </div>
    </div>
  );
}

export default ExtraIncome;
